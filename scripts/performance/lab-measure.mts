import { spawn, type ChildProcess } from 'node:child_process'
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { markdownTable, printResult, writeJson, type AuditMessage } from '../shared/toolkit.mts'

/**
 * Lab measurement of the paint experience on a *serving* build.
 *
 * The other performance scripts check what a build ships (bytes, dependencies,
 * source strings). This one opens a real browser and records what a visitor
 * actually waits for: first paint, largest contentful paint, layout shift and
 * main-thread blocking, per route, over several cold runs.
 *
 *   pnpm build && pnpm start -- -p 3101
 *   LAB_BASE_URL=http://127.0.0.1:3101 LAB_ROUTES=/ pnpm performance:lab
 *   LAB_BASE_URL=https://hawebstudio.com LAB_ROUTES=/ pnpm performance:lab   # post-deploy
 *
 * It drives a locally installed Chrome/Edge over the DevTools protocol, so it
 * needs no extra dependency and no browser download. Point it at a production
 * build (`next start`), never at `next dev`: dev output is unminified and
 * unhydrated the same way, and the script says so instead of reporting numbers
 * that cannot be compared with anything.
 *
 * These are lab numbers from one machine, not field data. They are only
 * comparable between runs made with the same routes, viewport, run count and
 * machine — exactly what the before/after comparison in
 * `docs/website-improvement/step-7-verification.md` used.
 */

const BASE_URL = (process.env.LAB_BASE_URL ?? 'http://127.0.0.1:3001').replace(/\/+$/, '')
const ROUTES = (process.env.LAB_ROUTES ?? '/,/services').split(',').map((r) => r.trim()).filter(Boolean)
const RUNS = Number(process.env.LAB_RUNS ?? '3')
const MOBILE = process.env.LAB_MOBILE === 'true'
// Slow, hydration-heavy machines are where a hidden hero hurts most; a 4× CPU
// throttle (the same factor Lighthouse uses) makes that cost visible and, more
// usefully, keeps run-to-run variance down on a fast local machine.
const CPU_THROTTLE = Number(process.env.LAB_CPU_THROTTLE ?? '1')
// Headless browsers report `prefers-reduced-motion: reduce` unless told
// otherwise, and this site switches its whole reveal layer off in that case.
// Emulate the default visitor (motion allowed) unless a reduced-motion run is
// asked for, so the numbers describe the code path most people get.
const REDUCED_MOTION = process.env.LAB_REDUCED_MOTION === 'true'
const VIEWPORT = MOBILE ? { width: 412, height: 915 } : { width: 1440, height: 900 }
const REPORT_PATH = process.env.LAB_REPORT ?? 'reports/lab-measure.json'
const SETTLE_MS = 2500

interface Sample {
  path: string
  run: number
  fcp: number | null
  lcp: number | null
  lcpElement: string | null
  lcpMinusFcp: number | null
  cls: number
  longTaskTotalMs: number
  longTaskCount: number
  ttfb: number | null
  domContentLoaded: number | null
  load: number | null
  heroInlineOpacityAtLoad: string | null
  heroComputedOpacityAtLoad: string | null
  heroInlineOpacityAfterSettle: string | null
  heroFirstHiddenAtMs: number | null
  heroHiddenTotalMs: number | null
  heroFullyVisibleFromMs: number | null
  heroTimeline: string | null
  paintEntries: string | null
}

/**
 * Installed before any page script runs. Watches the primary hero from the first
 * frame and logs every change of its opacity, because the question that decides
 * whether LCP waits for JavaScript is "was the biggest element on screen hidden
 * while the page booted?" — and a hero can be painted, then be hidden again by
 * hydration, which nothing measured after load can recover.
 */
const HERO_RECORDER = `
window.__labHero = { firstSeenAt: null, styleWrites: [], observerCallbacks: 0, timerTicks: 0 };
(function attach() {
  const hero = document.querySelector('[data-gsap-reveal="hero-copy"]');
  if (!hero) {
    setTimeout(attach, 20);
    return;
  }
  const record = window.__labHero;
  record.firstSeenAt = Math.round(performance.now());
  // attributeOldValue is what makes this reliable: an animation library can
  // write "hidden" and "visible" inside one task, and only the previous value
  // kept in the record shows that the element was hidden at all.
  new MutationObserver(function (records) {
    record.observerCallbacks += 1;
    for (const entry of records) {
      if (record.styleWrites.length >= 40) break;
      record.styleWrites.push({ t: Math.round(performance.now()), before: String(entry.oldValue || '').slice(0, 90), after: String(hero.getAttribute('style') || '').slice(0, 90) });
    }
  }).observe(hero, { attributes: true, attributeFilter: ['style'], attributeOldValue: true });
  setInterval(function () { record.timerTicks += 1; }, 100);
})();`

const messages: AuditMessage[] = []
const warn = (message: string) => messages.push({ level: 'warning', message })
const issue = (message: string) => messages.push({ level: 'issue', message })

function getJson(url: string): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    http
      .get(url, { timeout: 5000 }, (response) => {
        const chunks: Buffer[] = []
        response.on('data', (chunk: Buffer) => chunks.push(chunk))
        response.on('end', () => {
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
          } catch (error) {
            reject(error as Error)
          }
        })
      })
      .on('timeout', function (this: http.ClientRequest) {
        this.destroy(new Error(`timeout for ${url}`))
      })
      .on('error', reject)
  })
}

/** A locally installed Chromium browser, or nothing. No download, no dependency. */
function findBrowser(): string | null {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    path.join(process.env.LOCALAPPDATA ?? '', 'Google/Chrome/Application/chrome.exe'),
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter((entry): entry is string => Boolean(entry))

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) return candidate
    } catch {
      // An unreadable path is simply not a candidate.
    }
  }
  return null
}

interface PendingCall {
  resolve: (value: unknown) => void
  reject: (error: Error) => void
}

/** Minimal DevTools-protocol client: one socket, flat sessions, request/event plumbing. */
class Devtools {
  private socket: WebSocket
  private nextId = 1
  private pending = new Map<number, PendingCall>()
  private listeners = new Map<string, Array<(params: Record<string, unknown>) => void>>()

  private constructor(socket: WebSocket) {
    this.socket = socket
    socket.addEventListener('message', (event: MessageEvent) => this.handle(String(event.data)))
  }

  static async connect(url: string): Promise<Devtools> {
    const socket = new WebSocket(url)
    await new Promise<void>((resolve, reject) => {
      socket.addEventListener('open', () => resolve(), { once: true })
      socket.addEventListener('error', () => reject(new Error(`could not open ${url}`)), { once: true })
    })
    return new Devtools(socket)
  }

  private handle(raw: string): void {
    let message: { id?: number; method?: string; sessionId?: string; result?: unknown; error?: { message?: string }; params?: Record<string, unknown> }
    try {
      message = JSON.parse(raw)
    } catch {
      return
    }

    if (typeof message.id === 'number') {
      const entry = this.pending.get(message.id)
      if (!entry) return
      this.pending.delete(message.id)
      if (message.error) entry.reject(new Error(message.error.message ?? 'devtools error'))
      else entry.resolve(message.result)
      return
    }

    if (message.method) {
      const key = `${message.sessionId ?? ''}:${message.method}`
      for (const listener of this.listeners.get(key) ?? []) listener(message.params ?? {})
      this.listeners.delete(key)
    }
  }

  send(method: string, params: Record<string, unknown> = {}, sessionId?: string): Promise<unknown> {
    const id = this.nextId++
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }))
      setTimeout(() => {
        if (this.pending.delete(id)) reject(new Error(`${method} timed out`))
      }, 90_000)
    })
  }

  /** Register for an event *before* the command that triggers it is sent. */
  once(method: string, sessionId?: string, timeoutMs = 90_000): Promise<Record<string, unknown>> {
    return new Promise((resolve, reject) => {
      const key = `${sessionId ?? ''}:${method}`
      const timer = setTimeout(() => reject(new Error(`${method} never fired`)), timeoutMs)
      const list = this.listeners.get(key) ?? []
      list.push((params) => {
        clearTimeout(timer)
        resolve(params)
      })
      this.listeners.set(key, list)
    })
  }

  close(): void {
    try {
      this.socket.close()
    } catch {
      // Already closed.
    }
  }
}

/**
 * Runs in the page. Reads the buffered paint entries plus a fresh observer for
 * LCP/layout-shift/long tasks, then waits for LCP to settle before answering —
 * LCP keeps growing while new, larger elements paint.
 */
const COLLECTOR = `new Promise((resolve) => {
  const result = {
    fcp: null, lcp: null, lcpElement: null, cls: 0,
    longTaskTotalMs: 0, longTaskCount: 0, paintEntries: null,
    heroInlineOpacityAtLoad: null, heroComputedOpacityAtLoad: null,
    heroInlineOpacityAfterSettle: null,
    heroFirstHiddenAtMs: null, heroHiddenTotalMs: null, heroFullyVisibleFromMs: null,
    heroTimeline: null, heroStartAtMs: null,
    devOutput: false, dpr: window.devicePixelRatio,
  };
  // Hydration happens after the load event, so the style timeline is read in
  // the settle window below rather than at this point.
  const heroSnapshot = function () {
    const recorder = window.__labHero || {};
    const writes = recorder.styleWrites || [];
    result.heroStartAtMs = recorder.firstSeenAt;
    // The escapes are doubled because this whole collector is a template literal:
    // a single backslash is consumed by the source, and the page would then test
    // against /opacity:s*0/ — which matches nothing and reports "never hidden".
    const hiddenWrite = writes.find((entry) => /opacity:\\s*0(?![.\\d])/.test(entry.after));
    const visibleAgain = hiddenWrite ? writes.find((entry) => entry.t > hiddenWrite.t && /opacity:\\s*(1|0\\.[5-9])/.test(entry.after)) : undefined;
    result.heroFirstHiddenAtMs = hiddenWrite ? hiddenWrite.t : null;
    result.heroHiddenTotalMs = hiddenWrite && visibleAgain ? visibleAgain.t - hiddenWrite.t : hiddenWrite ? null : 0;
    result.heroFullyVisibleFromMs = visibleAgain ? visibleAgain.t : null;
    result.heroTimeline = writes.length === 0
      ? 'no style written during the load'
      : (hiddenWrite ? 'HIDDEN at ' + hiddenWrite.t + 'ms: ' + hiddenWrite.after + ' | ' : '') + writes.slice(0, 6).map((entry) => entry.t + 'ms ' + entry.after).join(' | ');
  };
  // Chrome re-emits "first-contentful-paint" as more content arrives, so the
  // first entry is the real first contentful paint; the later ones are updates.
  const paints = performance.getEntriesByType('paint');
  result.paintEntries = paints.map((entry) => entry.name + '@' + Math.round(entry.startTime)).join(', ');
  for (const entry of paints) {
    if (entry.name === 'first-contentful-paint') { result.fcp = Math.round(entry.startTime); break; }
  }
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        result.lcp = Math.round(entry.startTime);
        const element = entry.element;
        result.lcpElement = element ? element.tagName + (element.className ? '.' + String(element.className).split(' ')[0] : '') : null;
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) { result.lcp = null; }
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) { if (!entry.hadRecentInput) result.cls += entry.value; }
    }).observe({ type: 'layout-shift', buffered: true });
  } catch (error) {}
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) { result.longTaskCount += 1; result.longTaskTotalMs += entry.duration; }
    }).observe({ type: 'longtask', buffered: true });
  } catch (error) {}
  result.cls = Math.round(result.cls * 100000) / 100000;
  result.longTaskTotalMs = Math.round(result.longTaskTotalMs);

  const hero = document.querySelector('[data-gsap-reveal="hero-copy"]');
  if (hero) {
    result.heroInlineOpacityAtLoad = hero.style.opacity === '' ? null : hero.style.opacity;
    result.heroComputedOpacityAtLoad = getComputedStyle(hero).opacity;
  }
  result.devOutput = performance.getEntriesByType('resource').some((entry) => /hmr|webpack-internal|\\/development/i.test(entry.name));

  setTimeout(() => {
    const settled = document.querySelector('[data-gsap-reveal="hero-copy"]');
    if (settled) result.heroInlineOpacityAfterSettle = settled.style.opacity === '' ? null : settled.style.opacity;
    heroSnapshot();
    resolve(result);
  }, ${SETTLE_MS});
})`

async function measure(): Promise<Sample[]> {
  const browser = findBrowser()
  if (!browser) {
    warn('No local Chrome, Edge or Chromium found; set CHROME_PATH to run the lab measurement.')
    return []
  }

  const port = Number(process.env.LAB_DEVTOOLS_PORT ?? '9333')
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'ha-lab-'))
  const process_: ChildProcess = spawn(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      '--hide-scrollbars',
      '--mute-audio',
      `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
      `--user-data-dir=${profile}`,
      `--remote-debugging-port=${port}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  )

  const samples: Sample[] = []
  let devtools: Devtools | null = null
  try {
    const version = await (async () => {
      const deadline = Date.now() + 30_000
      while (Date.now() < deadline) {
        const info = await getJson(`http://127.0.0.1:${port}/json/version`).catch(() => null)
        if (info?.webSocketDebuggerUrl) return info
        await new Promise((resolve) => setTimeout(resolve, 400))
      }
      throw new Error('the browser never opened its devtools endpoint')
    })()

    devtools = await Devtools.connect(version.webSocketDebuggerUrl)
    const target = (await devtools.send('Target.createTarget', { url: 'about:blank' })) as { targetId: string }
    const attached = (await devtools.send('Target.attachToTarget', { targetId: target.targetId, flatten: true })) as { sessionId: string }
    const session = attached.sessionId

    await devtools.send('Page.enable', {}, session)
    await devtools.send('Page.addScriptToEvaluateOnNewDocument', { source: HERO_RECORDER }, session)
    await devtools.send('Runtime.enable', {}, session)
    await devtools.send('Network.enable', {}, session)
    await devtools.send('Network.setCacheDisabled', { cacheDisabled: true }, session)
    if (CPU_THROTTLE > 1) {
      await devtools.send('Emulation.setCPUThrottlingRate', { rate: CPU_THROTTLE }, session)
    }
    await devtools.send(
      'Emulation.setEmulatedMedia',
      { features: [{ name: 'prefers-reduced-motion', value: REDUCED_MOTION ? 'reduce' : 'no-preference' }] },
      session,
    )
    if (MOBILE) {
      await devtools.send(
        'Emulation.setDeviceMetricsOverride',
        { width: VIEWPORT.width, height: VIEWPORT.height, deviceScaleFactor: 2.6, mobile: true },
        session,
      )
    }

    for (const route of ROUTES) {
      const probe = process.env.LAB_EVAL
      if (probe) {
        const loaded = devtools.once('Page.loadEventFired', session)
        await devtools.send('Page.navigate', { url: `${BASE_URL}${ROUTES[0]}?lab-probe=${Date.now()}` }, session)
        await loaded
        await new Promise((resolve) => setTimeout(resolve, 3000))
        const probed = (await devtools.send('Runtime.evaluate', { expression: probe, returnByValue: true, awaitPromise: true }, session)) as { result: { value: unknown } }
        console.log('LAB_EVAL:', JSON.stringify(probed.result.value, null, 1))
        return samples
      }

      for (let run = 1; run <= RUNS; run += 1) {
        const url = `${BASE_URL}${route}${route.includes('?') ? '&' : '?'}lab=${Date.now()}-${run}`
        const loaded = devtools.once('Page.loadEventFired', session)
        await devtools.send('Page.navigate', { url }, session)
        await loaded

        const evaluated = (await devtools.send(
          'Runtime.evaluate',
          { expression: COLLECTOR, awaitPromise: true, returnByValue: true },
          session,
        )) as { result: { value: Record<string, unknown> } }
        const value = evaluated.result.value

        if (value.devOutput) {
          warn(`${route} looks like a development build; lab numbers against dev output are not comparable with a production build.`)
        }

        const fcp = typeof value.fcp === 'number' ? value.fcp : null
        const lcp = typeof value.lcp === 'number' ? value.lcp : null
        samples.push({
          path: route,
          run,
          fcp,
          lcp,
          lcpElement: (value.lcpElement as string) ?? null,
          lcpMinusFcp: fcp !== null && lcp !== null ? lcp - fcp : null,
          cls: Number(value.cls ?? 0),
          longTaskTotalMs: Number(value.longTaskTotalMs ?? 0),
          longTaskCount: Number(value.longTaskCount ?? 0),
          ttfb: null,
          domContentLoaded: null,
          load: null,
          heroInlineOpacityAtLoad: (value.heroInlineOpacityAtLoad as string) ?? null,
          heroComputedOpacityAtLoad: (value.heroComputedOpacityAtLoad as string) ?? null,
          heroInlineOpacityAfterSettle: (value.heroInlineOpacityAfterSettle as string) ?? null,
          heroFirstHiddenAtMs: typeof value.heroFirstHiddenAtMs === 'number' ? value.heroFirstHiddenAtMs : null,
          heroHiddenTotalMs: typeof value.heroHiddenTotalMs === 'number' ? value.heroHiddenTotalMs : null,
          heroFullyVisibleFromMs: typeof value.heroFullyVisibleFromMs === 'number' ? value.heroFullyVisibleFromMs : null,
          heroTimeline: (value.heroTimeline as string) ?? null,
          paintEntries: (value.paintEntries as string) ?? null,
        })

        const navigation = (await devtools.send(
          'Runtime.evaluate',
          {
            expression:
              "(function(){const n=performance.getEntriesByType('navigation')[0];return n?{ttfb:Math.round(n.responseStart),dcl:Math.round(n.domContentLoadedEventEnd),load:Math.round(n.loadEventEnd)}:{};})()",
            returnByValue: true,
          },
          session,
        )) as { result: { value: { ttfb?: number; dcl?: number; load?: number } } }
        const timing = navigation.result.value ?? {}
        const current = samples[samples.length - 1]
        current.ttfb = timing.ttfb ?? null
        current.domContentLoaded = timing.dcl ?? null
        current.load = timing.load ?? null
      }
    }
  } finally {
    devtools?.close()
    process_.kill()
    try {
      fs.rmSync(profile, { recursive: true, force: true })
    } catch {
      // The browser may still hold a file; the OS cleans the temp directory up.
    }
  }

  return samples
}

const median = (values: number[]): number | null => {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? Math.round(((sorted[middle - 1] + sorted[middle]) / 2) * 10) / 10 : sorted[middle]
}

async function main(): Promise<void> {
  console.log(
    `Lab measurement of ${ROUTES.join(', ')} at ${BASE_URL} — ${RUNS} cold run(s), ${MOBILE ? 'mobile' : 'desktop'} viewport ${VIEWPORT.width}×${VIEWPORT.height}, CPU throttle ${CPU_THROTTLE}×, prefers-reduced-motion: ${REDUCED_MOTION ? 'reduce' : 'no-preference'}.`,
  )
  const samples = await measure()

  if (samples.length === 0) {
    printResult('Lab performance measurement', messages)
    return
  }

  const rows: string[][] = [['Route', 'FCP (ms)', 'LCP (ms)', 'LCP−FCP (ms)', 'LCP element', 'CLS', 'Long tasks (ms)', 'Hero first hidden at (ms)', 'Hero invisible for (ms)']]
  const summary: Record<string, { fcp: number | null; lcp: number | null; lcpMinusFcp: number | null; cls: number | null; longTaskTotalMs: number | null; heroFirstHiddenAtMs: number | null; heroHiddenTotalMs: number | null }> = {}

  for (const route of ROUTES) {
    const forRoute = samples.filter((sample) => sample.path === route)
    if (forRoute.length === 0) continue
    const fcp = median(forRoute.map((sample) => sample.fcp).filter((value): value is number => value !== null))
    const lcp = median(forRoute.map((sample) => sample.lcp).filter((value): value is number => value !== null))
    const cls = median(forRoute.map((sample) => sample.cls))
    const blocking = median(forRoute.map((sample) => sample.longTaskTotalMs))
    const firstHidden = median(forRoute.map((sample) => sample.heroFirstHiddenAtMs).filter((value): value is number => value !== null))
    const hiddenTotal = median(forRoute.map((sample) => sample.heroHiddenTotalMs).filter((value): value is number => value !== null))
    summary[route] = { fcp, lcp, lcpMinusFcp: fcp !== null && lcp !== null ? lcp - fcp : null, cls, longTaskTotalMs: blocking, heroFirstHiddenAtMs: firstHidden, heroHiddenTotalMs: hiddenTotal }
    rows.push([
      route,
      fcp === null ? '—' : String(fcp),
      lcp === null ? '—' : String(lcp),
      fcp !== null && lcp !== null ? String(lcp - fcp) : '—',
      forRoute.find((sample) => sample.lcpElement)?.lcpElement ?? '—',
      cls === null ? '—' : String(cls),
      blocking === null ? '—' : String(blocking),
      forRoute.map((sample) => String(sample.heroFirstHiddenAtMs ?? 'never')).join(' / '),
      forRoute.map((sample) => String(sample.heroHiddenTotalMs ?? 'n/a')).join(' / '),
    ])

    if (lcp !== null && lcp > 2500) issue(`${route} largest contentful paint is ${Math.round(lcp)}ms in the median lab run, above the 2500ms good threshold.`)
    if (cls !== null && cls > 0.1) issue(`${route} cumulative layout shift is ${cls} in the median lab run, above the 0.1 good threshold.`)
  }

  console.log(markdownTable(rows))
  writeJson(REPORT_PATH, {
    measuredAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    viewport: VIEWPORT,
    mobile: MOBILE,
    cpuThrottle: CPU_THROTTLE,
    reducedMotion: REDUCED_MOTION,
    runs: RUNS,
    settlement: SETTLE_MS,
    summary,
    samples,
  })
  console.log(`Recorded ${samples.length} sample(s) in ${REPORT_PATH}.`)
  printResult('Lab performance measurement', messages)
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
