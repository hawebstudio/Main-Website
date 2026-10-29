import http from 'node:http'
import https from 'node:https'
import zlib from 'node:zlib'
import { printResult, readJson, writeJson, type AuditMessage } from '../shared/toolkit.mts'

/**
 * Measured first-load budget check.
 *
 * This does not read the source looking for strings: it requests each route,
 * extracts every script, stylesheet and font file the served HTML actually
 * references, downloads each one with compression, and adds up the bytes a
 * browser has to transfer. The measured numbers are then compared with a
 * baseline recorded from a real production build, so a change that quietly adds
 * a dependency (or a whole animation library) to the shared bundle fails here.
 *
 *   PERF_AUDIT_BASE_URL=http://127.0.0.1:3101 pnpm performance:budgets       # check
 *   PERF_AUDIT_BASE_URL=http://127.0.0.1:3101 pnpm performance:budgets --write-baseline
 *   PERF_AUDIT_BASE_URL=https://hawebstudio.com pnpm performance:budgets      # post-deploy
 *
 * Point it at a production build (`next build` + `next start`), never at
 * `next dev`: unminified dev output cannot be compared against these budgets,
 * and the script says so instead of reporting a false failure.
 */

const BASE_URL = (process.env.PERF_AUDIT_BASE_URL ?? 'http://127.0.0.1:3001').replace(/\/+$/, '')
const BASELINE_PATH = 'docs/website-improvement/performance-baseline.json'
const TOLERANCE = Number(process.env.PERF_TOLERANCE ?? '1.10')

/** Routes chosen to cover every shared layout, the interactive route and the content templates. */
const ROUTES = [
  '/',
  '/services',
  '/services/families/websites',
  '/insights/ai-search-optimization',
  '/case-studies/ha-web-studio-architecture',
  '/about',
  '/search',
]

/**
 * Absolute ceilings, from the published budgets rather than from this site:
 * total JavaScript under 300KB compressed per route and no single chunk above
 * 200KB compressed are the targets the speed audit uses.
 */
const ABSOLUTE_LIMITS = { jsKB: 300, singleChunkKB: 200 }

interface RouteMeasurement {
  path: string
  htmlKB: number
  jsKB: number
  cssKB: number
  fontKB: number
  requests: number
  largestChunkKB: number
}

interface Baseline {
  recordedAt: string
  origin: string
  routes: RouteMeasurement[]
}

const messages: AuditMessage[] = []
const issue = (message: string) => messages.push({ level: 'issue', message })
const warn = (message: string) => messages.push({ level: 'warning', message })

const kb = (bytes: number) => Math.round((bytes / 1024) * 10) / 10

/**
 * Transferred size of a URL, in the bytes a browser actually receives.
 *
 * `fetch()` decompresses transparently and hides the wire size (and these
 * responses are chunked, so there is no `Content-Length` to fall back on),
 * which would silently report uncompressed bytes — a 3× overstatement next to
 * a CDN. The core `http`/`https` modules hand over the raw compressed stream,
 * so the byte count here matches what a browser transfers.
 */
function decodeBody(raw: Buffer, encoding?: string): string {
  if (!encoding) return raw.toString('utf8')
  try {
    if (encoding.includes('br')) return zlib.brotliDecompressSync(raw).toString('utf8')
    if (encoding.includes('gzip')) return zlib.gunzipSync(raw).toString('utf8')
    if (encoding.includes('deflate')) return zlib.inflateSync(raw).toString('utf8')
  } catch {
    // Undecodable body: the byte count is still valid, the markup is not needed.
  }
  return ''
}

function fetchBytes(url: string, decode = false): Promise<{ bytes: number; body: string; status: number }> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http
    const request = client.get(
      url,
      { headers: { 'accept-encoding': 'gzip, deflate, br', 'user-agent': 'ha-perf-budget-check' }, timeout: 60_000 },
      (response) => {
        const chunks: Buffer[] = []
        response.on('data', (chunk: Buffer) => chunks.push(chunk))
        response.on('end', () => {
          const raw = Buffer.concat(chunks)
          resolve({
            bytes: raw.byteLength,
            body: decode ? decodeBody(raw, response.headers['content-encoding']) : '',
            status: response.statusCode ?? 0,
          })
        })
      },
    )
    request.on('timeout', () => request.destroy(new Error(`timeout for ${url}`)))
    request.on('error', reject)
  })
}

function referencedAssets(html: string, kind: 'script' | 'style' | 'font'): string[] {
  const found = new Set<string>()
  const patterns: Record<typeof kind, RegExp[]> = {
    script: [/<script[^>]+src="([^"]+)"/g, /<link[^>]+rel="(?:preload|modulepreload)"[^>]+as="script"[^>]+href="([^"]+)"/g],
    style: [/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g],
    font: [/<link[^>]+rel="preload"[^>]+as="font"[^>]+href="([^"]+)"/g],
  }
  for (const pattern of patterns[kind]) {
    for (const match of html.matchAll(pattern)) found.add(match[1])
  }
  return [...found]
}

function isDevOutput(html: string, urls: string[]): boolean {
  return urls.some((url) => /development|hmr/.test(url)) || html.includes('__nextDevClientId') || html.includes('next-dev')
}

async function measureRoute(path: string): Promise<RouteMeasurement | null> {
  const page = await fetchBytes(`${BASE_URL}${path}`, true).catch(() => null)
  if (!page) {
    issue(`${path} could not be fetched from ${BASE_URL}.`)
    return null
  }
  if (page.status !== 200) {
    issue(`${path} returned ${page.status}; budget measurement is not possible.`)
    return null
  }

  const scripts = referencedAssets(page.body, 'script')
  const styles = referencedAssets(page.body, 'style')
  const fonts = referencedAssets(page.body, 'font')

  if (isDevOutput(page.body, [...scripts, ...styles])) {
    warn(`${path} looks like a development build; comparing dev output against production budgets would be meaningless.`)
    return null
  }

  const absolute = (href: string) => (href.startsWith('http') ? href : `${BASE_URL}${href}`)
  let jsBytes = 0
  let largestChunk = 0
  for (const href of scripts) {
    const asset = await fetchBytes(absolute(href))
    jsBytes += asset.bytes
    largestChunk = Math.max(largestChunk, asset.bytes)
  }
  let cssBytes = 0
  for (const href of styles) cssBytes += (await fetchBytes(absolute(href))).bytes
  let fontBytes = 0
  for (const href of fonts) fontBytes += (await fetchBytes(absolute(href))).bytes

  return {
    path,
    htmlKB: kb(page.bytes),
    jsKB: kb(jsBytes),
    cssKB: kb(cssBytes),
    fontKB: kb(fontBytes),
    requests: scripts.length + styles.length + fonts.length + 1,
    largestChunkKB: kb(largestChunk),
  }
}

async function main() {
  const writeBaseline = process.argv.includes('--write-baseline')
  const measured: RouteMeasurement[] = []

  for (const route of ROUTES) {
    const result = await measureRoute(route)
    if (result) measured.push(result)
  }

  if (measured.length === 0) {
    warn('No route could be measured against a production build; nothing was compared.')
    printResult('Performance budget check', messages)
    return
  }

  console.log(`Performance budget check measured ${measured.length} route(s) at ${BASE_URL}.`)
  for (const route of measured) {
    console.log(
      `  ${route.path.padEnd(46)} html ${String(route.htmlKB).padStart(7)}KB  js ${String(route.jsKB).padStart(7)}KB  css ${String(route.cssKB).padStart(6)}KB  fonts ${String(route.fontKB).padStart(6)}KB  reqs ${String(route.requests).padStart(3)}  biggest chunk ${route.largestChunkKB}KB`,
    )
  }

  if (writeBaseline) {
    const baseline: Baseline = { recordedAt: new Date().toISOString(), origin: BASE_URL, routes: measured }
    writeJson(BASELINE_PATH, baseline)
    console.log(`Recorded the measured baseline in ${BASELINE_PATH}.`)
    printResult('Performance budget check', messages)
    return
  }

  let baseline: Baseline | null = null
  try {
    baseline = readJson<Baseline>(BASELINE_PATH)
  } catch {
    warn(`No baseline at ${BASELINE_PATH}; only the absolute budgets were applied. Record one with --write-baseline.`)
  }

  for (const route of measured) {
    if (route.jsKB > ABSOLUTE_LIMITS.jsKB) {
      issue(`${route.path} ships ${route.jsKB}KB of JavaScript, above the ${ABSOLUTE_LIMITS.jsKB}KB budget.`)
    }
    if (route.largestChunkKB > ABSOLUTE_LIMITS.singleChunkKB) {
      issue(`${route.path} loads a single ${route.largestChunkKB}KB chunk, above the ${ABSOLUTE_LIMITS.singleChunkKB}KB budget.`)
    }
    const reference = baseline?.routes.find((entry) => entry.path === route.path)
    if (!reference) continue
    for (const metric of ['htmlKB', 'jsKB', 'cssKB', 'fontKB', 'requests', 'largestChunkKB'] as const) {
      const limit = reference[metric] * TOLERANCE
      if (route[metric] > limit) {
        issue(
          `${route.path} ${metric} is ${route[metric]} against a recorded baseline of ${reference[metric]} (allowed up to ${Math.round(limit * 10) / 10}).`,
        )
      }
    }
  }

  if (baseline) {
    console.log(`Compared against the baseline recorded ${baseline.recordedAt} at ${baseline.origin} (tolerance ${TOLERANCE}×).`)
  }
  printResult('Performance budget check', messages)
}

main()
