import nextConfig from '../../next.config.mjs'
import { printResult, readJson, script, type AuditMessage } from '../shared/toolkit.mts'
import { INVENTORY_PATH, UNMATCHED_CONTENT_PATH, type RouteInventory } from '../shared/route-inventory.mts'

/**
 * HTTP status regression check for unknown dynamic-content URLs.
 *
 * This is the executable version of the step-17n evidence: run it against a
 * production build (`pnpm build && pnpm start`) to prove that a nonexistent
 * content URL answers 404 rather than the cacheable `200, index, follow` soft
 * 404 that streaming produces, while every valid URL still answers 200 with its
 * own canonical.
 *
 * It needs a running server, so it is not part of `pnpm validate`:
 *
 *   BASE_URL=http://localhost:3005 node scripts/validation/check-dynamic-http.mts
 *
 * Redirect sources and destinations are read from next.config.mjs rather than
 * copied here, so the two cannot drift.
 */

const baseUrl = (process.env.BASE_URL ?? 'http://localhost:3005').replace(/\/$/, '')

/** Requests in flight during the sitemap sweep: fast locally, still polite. */
const CONCURRENCY = 8

interface Probe {
  path: string
  status: number
  location: string | null
  robots: string
  canonical: string | null
  title: string
  h1: string
  nonceMatches: boolean
}

async function probe(path: string, headers: Record<string, string> = {}): Promise<Probe> {
  const response = await fetch(`${baseUrl}${path}`, {
    redirect: 'manual',
    headers,
    signal: AbortSignal.timeout(30_000),
  })
  const html = await response.text()
  const headerNonce = /nonce-([^;'"]+)/.exec(response.headers.get('content-security-policy') ?? '')?.[1]
  const htmlNonce = /nonce="([^"]+)"/.exec(html)?.[1]
  return {
    path,
    status: response.status,
    location: response.headers.get('location'),
    robots: /name="robots" content="([^"]*)"/.exec(html)?.[1] ?? '',
    canonical: /rel="canonical" href="([^"]*)"/.exec(html)?.[1] ?? null,
    title: /<title>([^<]*)<\/title>/.exec(html)?.[1]?.trim() ?? '',
    h1: /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html)?.[1]?.replace(/<[^>]+>/g, '').trim() ?? '',
    nonceMatches: Boolean(headerNonce) && headerNonce === htmlNonce,
  }
}

/** Runs `work` over `items` with a bounded number of requests in flight. */
async function mapLimit<T, R>(items: T[], limit: number, work: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let cursor = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor++
        results[index] = await work(items[index])
      }
    }),
  )
  return results
}

/** Next sends a relative `Location` for config redirects; resolve it before comparing. */
function pathOf(location: string): string {
  return new URL(location, baseUrl).pathname
}

function ghostPath(pattern: string): string {
  return pattern.replace(/\[[^\]]+]/g, 'c3p-ghost')
}

/**
 * Percent-encodes only the segments that stand in for a `[param]`. Encoding a
 * literal segment (`/case%2Dstudies/…`) is not a URL for that page at all —
 * Next 404s it before any route runs — so it would test nothing.
 */
function encodeParams(pattern: string, path: string): string {
  const shape = pattern.split('/').filter(Boolean)
  return `/${path
    .split('/')
    .filter(Boolean)
    .map((segment, index) => (shape[index]?.startsWith('[') ? segment.replace(/-/g, '%2D') : segment))
    .join('/')}`
}

function decoded(path: string): string {
  try {
    return decodeURIComponent(path)
  } catch {
    return path
  }
}

function expectValid(result: Probe, messages: AuditMessage[]): void {
  if (result.status !== 200) {
    messages.push({ level: 'issue', message: `${result.path}: expected 200, got ${result.status}.` })
    return
  }
  if (!result.canonical) {
    messages.push({ level: 'issue', message: `${result.path}: valid page is missing its canonical URL.` })
  } else if (new URL(result.canonical).pathname !== decoded(result.path)) {
    messages.push({
      level: 'issue',
      message: `${result.path}: canonical points elsewhere (${result.canonical}).`,
    })
  }
  if (!result.title || /page not found/i.test(result.title)) {
    messages.push({ level: 'issue', message: `${result.path}: title is missing or is the not-found title ("${result.title}").` })
  }
  if (!result.h1) {
    messages.push({ level: 'issue', message: `${result.path}: no <h1> in the rendered page.` })
  }
  if (!result.nonceMatches) {
    messages.push({ level: 'issue', message: `${result.path}: CSP nonce does not match the nonce in the rendered HTML.` })
  }
}

function expectGhost(result: Probe, messages: AuditMessage[]): void {
  if (result.status !== 404) {
    messages.push({
      level: 'issue',
      message: `${result.path}: expected 404, got ${result.status}${result.robots ? ` (${result.robots})` : ''} — soft 404.`,
    })
  }
  if (!/\bnoindex\b/.test(result.robots)) {
    messages.push({ level: 'issue', message: `${result.path}: 404 response is missing a noindex directive.` })
  }
  if (result.canonical) {
    messages.push({ level: 'issue', message: `${result.path}: 404 response leaked a canonical URL (${result.canonical}).` })
  }
  if (!/page not found/i.test(result.title)) {
    messages.push({ level: 'issue', message: `${result.path}: expected the not-found title, got "${result.title}".` })
  }
  if (!result.nonceMatches) {
    messages.push({ level: 'issue', message: `${result.path}: CSP nonce does not match the nonce in the rendered HTML.` })
  }
}

script('Dynamic route HTTP check', async () => {
  const messages: AuditMessage[] = []
  let inventory: RouteInventory

  try {
    inventory = readJson<RouteInventory>(INVENTORY_PATH)
  } catch {
    console.error(`${INVENTORY_PATH} is missing — run "pnpm build:prepare" first.`)
    process.exit(1)
  }

  let reachable = false
  try {
    reachable = (await probe('/')).status === 200
  } catch (error) {
    console.error(
      `No server answered at ${baseUrl} (${error instanceof Error ? error.message : String(error)}). ` +
        'Start a production build with "pnpm build && pnpm start" and set BASE_URL.',
    )
    process.exit(1)
  }
  if (!reachable) messages.push({ level: 'issue', message: `${baseUrl}/ did not answer 200.` })

  // One ghost per dynamic pattern, plus up to two valid paths per pattern —
  // a second path catches an enumerator that produces a wrong shape only in
  // some entries (categories, nested [category]/[slug], etc.).
  for (const route of inventory.dynamicRoutes) {
    for (const valid of route.paths.slice(0, 2)) expectValid(await probe(valid), messages)
    expectGhost(await probe(ghostPath(route.pattern)), messages)
  }

  // Static routes win over dynamic shapes; several share a prefix with one
  // (`/work/client` under `/work/[slug]`, `/services/families` under
  // `/services/[slug]`), so this also proves the guard does not shadow them.
  for (const staticPath of inventory.staticPaths) expectValid(await probe(staticPath), messages)

  // Permanent redirects: source answers 308 to the configured destination, and
  // the destination itself is a live page.
  const redirects = await nextConfig.redirects?.() ?? []
  for (const redirect of redirects) {
    const from = await probe(redirect.source)
    if (from.status !== 308) {
      messages.push({
        level: 'issue',
        message: `${redirect.source}: expected a permanent 308 redirect, got ${from.status}.`,
      })
      continue
    }
    const target = from.location ? pathOf(from.location) : null
    if (target !== redirect.destination) {
      messages.push({
        level: 'issue',
        message: `${redirect.source}: redirects to ${target ?? 'nothing'}, expected ${redirect.destination}.`,
      })
      continue
    }
    expectValid(await probe(redirect.destination), messages)
  }

  // Every sitemap URL must be live — a sitemap entry that 404s is the other
  // half of the soft-404 problem.
  const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`, { signal: AbortSignal.timeout(30_000) })
  if (sitemapResponse.status !== 200) {
    messages.push({ level: 'issue', message: `Sitemap did not answer 200 (got ${sitemapResponse.status}).` })
  } else {
    const sitemapXml = await sitemapResponse.text()
    const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1].trim()).pathname)
    if (!urls.length) messages.push({ level: 'issue', message: 'Sitemap contained no <loc> entries.' })

    const results = await mapLimit(urls, CONCURRENCY, (url) => probe(url))
    for (const result of results) {
      if (result.status !== 200) {
        messages.push({ level: 'issue', message: `Sitemap URL ${result.path}: expected 200, got ${result.status}.` })
      }
    }
  }

  // Trailing slash, percent-encoding, malformed escaping and the reserved
  // rewrite target. These are the paths a CDN or crawler actually sends.
  const samplePattern = inventory.dynamicRoutes[0].pattern
  const [sampleValid] = inventory.dynamicRoutes[0].paths
  const trailing = await probe(`${sampleValid}/`)
  if (trailing.status !== 308 || (trailing.location && pathOf(trailing.location) !== sampleValid)) {
    messages.push({
      level: 'issue',
      message: `${sampleValid}/: expected 308 to ${sampleValid}, got ${trailing.status} → ${trailing.location}.`,
    })
  }

  const ghost = ghostPath(inventory.dynamicRoutes[0].pattern)
  const ghostTrailing = await probe(`${ghost}/`)
  if (ghostTrailing.status !== 308) {
    messages.push({ level: 'issue', message: `${ghost}/: expected a 308 normalization, got ${ghostTrailing.status}.` })
  } else {
    expectGhost(await probe(ghost), messages)
  }

  // Percent-encoded valid URL: decoding must happen before the guard's lookup,
  // or every URL a client encodes would 404.
  expectValid(await probe(encodeParams(samplePattern, sampleValid)), messages)
  expectGhost(await probe(encodeParams(samplePattern, ghost)), messages)

  const malformed = await probe('/services/%E0%A4%A')
  if (malformed.status !== 404) {
    messages.push({ level: 'issue', message: `/services/%E0%A4%A: malformed encoding returned ${malformed.status}, expected 404.` })
  }

  expectGhost(await probe(UNMATCHED_CONTENT_PATH), messages)

  // RSC requests are answered by the same guard. Router prefetches bypass the
  // matcher by design (see proxy.ts `config.matcher`) and are not asserted.
  const rsc = await probe(ghost, { RSC: '1' })
  if (rsc.status !== 404) {
    messages.push({ level: 'issue', message: `${ghost}: RSC request returned ${rsc.status}, expected 404.` })
  }

  printResult('Dynamic route HTTP check', messages)
})
