import { spawn, type ChildProcess } from 'node:child_process'
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { printResult, writeJson, markdownTable, type AuditMessage } from '../shared/toolkit.mts'

/**
 * Measured accessibility audit against a *running* site.
 *
 * It drives a locally installed Chrome/Edge over the DevTools protocol, which
 * matters because the checks that actually catch accessibility defects are the
 * ones that need a focused document: `:focus` and `:focus-visible` do not match
 * at all unless the page has focus, so anything that reads focus state from an
 * unfocused tab reports fiction. `Page.bringToFront` is what makes the focus
 * checks below trustworthy.
 *
 *   A11Y_BASE_URL=http://127.0.0.1:3001 pnpm a11y:audit             # dev server
 *   A11Y_BASE_URL=http://127.0.0.1:3101 pnpm a11y:audit             # isolated production build
 *   A11Y_BASE_URL=https://hawebstudio.com pnpm a11y:audit           # after a deploy
 *
 * Automated checks cover only part of WCAG. A passing run is not conformance:
 * screen-reader behaviour, zoom, and content-meaning judgements still need a
 * human. This script is deliberately honest about what it did not test.
 */

const BASE_URL = (process.env.A11Y_BASE_URL ?? 'http://127.0.0.1:3001').replace(/\/+$/, '')
const ROUTES = (process.env.A11Y_ROUTES ?? '/,/services,/services/families/websites,/insights/ai-search-optimization,/about,/search,/contact').split(',').map((r) => r.trim()).filter(Boolean)
const DESKTOP = { width: 1440, height: 900 }
const MOBILE = { width: 390, height: 844 }
const REFLOW = { width: 320, height: 800 }
const REPORT_PATH = process.env.A11Y_REPORT ?? 'reports/a11y-audit.json'
/** The mobile nav panel claims `aria-modal`, so its own label identifies it. */
const MOBILE_NAV_DIALOG = '[role="dialog"][aria-label="Navigation menu"]'

type Severity = 'critical' | 'serious' | 'moderate' | 'minor'

interface Finding {
  route: string
  viewport: string
  check: string
  severity: Severity
  ok: boolean
  detail: string
}

interface HeadingInfo { level: number; text: string }
interface LandmarkInfo { tag: string; role: string | null; name: string | null }
interface ImageInfo { hasAlt: boolean; alt: string | null; src: string; decorative: boolean }
interface InputInfo { tag: string; type: string | null; id: string; placeholder: string | null }

/** Shapes of the page-side collectors below. */
interface StructureReport {
  lang: string | null
  title: string
  hasFocus: boolean
  viewportContent: string | null
  zoomBlocked: boolean
  headings: HeadingInfo[]
  h1Count: number
  skippedLevels: string[]
  landmarks: LandmarkInfo[]
  mainCount: number
  unnamedButtons: string[]
  images: ImageInfo[]
  inputsWithoutName: InputInfo[]
  duplicateIds: string[]
  horizontalOverflow: number
  viewportSize: string
}
interface ContrastEntry { color: string; bg: string; px: number; bold: boolean; ratio: number; need: number; passes: boolean; sample: string; tag: string; revealed: boolean }
interface ContrastReport { tested: number; skipped: number; funnel: { all: number; withText: number; candidate: number; visible: number; sized: number; revealed: number }; failures: ContrastEntry[] }
interface TargetEntry { tag: string; w: number; h: number; inlineInText: boolean; spacingExceptionApplies: boolean; label: string }
interface TargetReport { total: number; undersized: TargetEntry[]; realFailures: TargetEntry[] }
interface FocusState {
  tag: string
  name: string | null
  id: string | null
  href: string | null
  role: string | null
  focusVisible: boolean
  outlineWidth: string
  outlineStyle: string
  boxShadow: string | null
  clipPath: string
  rect: { x: number; y: number; w: number; h: number }
  fullyObscured: boolean
  visibleFraction: number
  obscuredBy: string | null
  obscuredByText: string | null
  obscuredByPosition: string | null
  isOffscreen: boolean
  rendered: boolean
  scrollY: number
}
interface HiddenReveal { target: string | null; opacity: string; style: string }
interface ReducedMotionReport { targets: number; hidden: HiddenReveal[] }
interface ReflowReport { overflow: number; clientWidth: number; scrollWidth: number }
interface FormReport {
  found: boolean
  ariaInvalid?: string[]
  errorNodeCount?: number
  describedBy?: string[]
  liveRegions?: string[]
  requiredNative?: number
  requiredAria?: number
  focusedAfterSubmit?: string | null
  autocomplete?: string[]
  errorTexts?: string[]
}
interface DialogReport { open: boolean; label?: string | null; ariaModal?: string | null; focusableCount?: number; focusInside?: boolean; activeName?: string | null }
interface ToggleReport { found: boolean; expanded?: string | null; focused?: boolean; hasFocus?: boolean }
interface TabProbe { inside: boolean; name: string | null; tag: string | null }
interface CloseReport { dialogOpen: boolean; expanded: string | null; focusReturned: boolean; activeTag: string | null; activeName: string }
interface SubmitReport { ok: boolean }
interface ConsentReport { found?: boolean; visible?: boolean; role?: string | null; focusInside?: boolean; activeName?: string | null; checkboxCount?: number; checkboxNames?: (string | null)[]; buttons?: string[] }

const findings: Finding[] = []
const messages: AuditMessage[] = []

function record(route: string, viewport: string, check: string, severity: Severity, ok: boolean, detail: string): void {
  findings.push({ route, viewport, check, severity, ok, detail })
  if (ok) return
  const label = `[${severity}] ${route} (${viewport}) ${check}: ${detail}`
  if (severity === 'critical' || severity === 'serious') messages.push({ level: 'issue', message: label })
  else messages.push({ level: 'warning', message: label })
}

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
  ].filter((entry): entry is string => Boolean(entry))
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) return candidate
    } catch {
      // Unreadable path is simply not a candidate.
    }
  }
  return null
}

interface PendingCall {
  resolve: (value: unknown) => void
  reject: (error: Error) => void
}

/** Minimal DevTools client (one socket, flat sessions, request/event plumbing). */
class Devtools {
  private socket: WebSocket
  private nextId = 1
  private pending = new Map<number, PendingCall>()
  private listeners = new Map<string, Array<(params: Record<string, unknown>) => void>>()
  private streams = new Map<string, Array<(params: Record<string, unknown>) => void>>()

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
      for (const listener of this.streams.get(key) ?? []) listener(message.params ?? {})
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
      }, 60_000)
    })
  }

  once(method: string, sessionId?: string, timeoutMs = 60_000): Promise<Record<string, unknown>> {
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

  /** Long-lived listener (unlike `once`, it keeps receiving events). */
  on(method: string, sessionId: string, handler: (params: Record<string, unknown>) => void): void {
    const key = `${sessionId}:${method}`
    const list = this.streams.get(key) ?? []
    list.push(handler)
    this.streams.set(key, list)
  }

  close(): void {
    try {
      this.socket.close()
    } catch {
      // Already closed.
    }
  }
}

const KEY_CODES: Record<string, { key: string; code: string; vk: number }> = {
  Tab: { key: 'Tab', code: 'Tab', vk: 9 },
  Enter: { key: 'Enter', code: 'Enter', vk: 13 },
  Escape: { key: 'Escape', code: 'Escape', vk: 27 },
  Space: { key: ' ', code: 'Space', vk: 32 },
  ArrowDown: { key: 'ArrowDown', code: 'ArrowDown', vk: 40 },
}

/** Real key events, not synthetic DOM events — this is what a keyboard user produces. */
/**
 * Waits until the page's scroll offset stops changing.
 *
 * Chromium animates the scroll it performs to reveal a focused element when
 * `scroll-behavior: smooth` is in effect — and the marketing pages set that on
 * `<html>`. Reading geometry immediately after `Input.dispatchKeyEvent` for Tab
 * therefore samples a frame in the middle of a 100-400 ms scroll, not where the
 * element comes to rest, and a resting element that is perfectly visible can be
 * reported as still covered. 2.4.11 is about the state the user is left in, so
 * the measurement waits for the scroll to settle. Bounded twice over: it returns
 * after two stable frames, and a `setTimeout` backstop resolves it even if
 * requestAnimationFrame is throttled.
 */
const SETTLE_SCROLL = `new Promise(function (resolve) {
  var last = null;
  var stable = 0;
  var done = false;
  var start = performance.now();
  function finish() {
    if (done) return;
    done = true;
    resolve(Math.round(window.scrollY));
  }
  function step() {
    var y = Math.round(window.scrollY);
    if (y === last) { stable += 1 } else { stable = 0; last = y }
    if (stable >= 2) { finish(); return }
    if (performance.now() - start > 900) { finish(); return }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
  setTimeout(finish, 1200);
})`

async function settleScroll(cdp: Devtools, session: string): Promise<void> {
  await evaluate<number>(cdp, session, SETTLE_SCROLL)
}

async function pressKey(cdp: Devtools, session: string, name: string, modifiers = 0): Promise<void> {
  const spec = KEY_CODES[name]
  if (!spec) throw new Error(`unknown key ${name}`)
  const base = { windowsVirtualKeyCode: spec.vk, nativeVirtualKeyCode: spec.vk, key: spec.key, code: spec.code, modifiers }
  await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', ...base }, session)
  if (name === 'Enter' || name === 'Space') {
    await cdp.send('Input.dispatchKeyEvent', { type: 'char', text: name === 'Enter' ? '\r' : ' ', ...base }, session)
  }
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', ...base }, session)
  await new Promise((resolve) => setTimeout(resolve, 120))
}

async function evaluate<T>(cdp: Devtools, session: string, expression: string): Promise<T> {
  const result = (await cdp.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, session)) as {
    result?: { value?: T }
    exceptionDetails?: { text?: string; exception?: { description?: string } }
  }
  // A page-side throw used to arrive as `undefined`, which surfaced far away as
  // "cannot read properties of undefined" and hid the real cause. Report it here
  // with the browser's own message instead.
  if (result.exceptionDetails) {
    const description = result.exceptionDetails.exception?.description ?? result.exceptionDetails.text ?? 'no description'
    throw new Error(`page expression threw: ${description.split('\n')[0]}`)
  }
  return result.result?.value as T
}

/* ------------------------------------------------------------------ *
 * Hydration gate                                                      *
 * ------------------------------------------------------------------ */

/**
 * React claims the server-rendered tree while hydrating, which is the moment a
 * page's event handlers start doing anything. Interaction flows are only
 * meaningful after that point, so every flow polls for it (bounded) instead of
 * guessing with a fixed sleep — a slow dev compile otherwise produces confident
 * "the dialog never opened" results that are really "React had not started".
 */
const HYDRATION_PROBE = `(function () {
  function has(el) {
    if (!el) return false;
    return Object.getOwnPropertyNames(el).some(function (k) {
      return k.indexOf('__reactFiber$') === 0 || k.indexOf('__reactProps$') === 0 || k.indexOf('__reactContainer$') === 0;
    });
  }
  const nodes = [document.body, document.getElementById('main-content'), document.querySelector('main'), document.querySelector('nav'), document.querySelector('form')];
  for (let i = 0; i < nodes.length; i += 1) { if (has(nodes[i])) return true; }
  return false;
})()`

const interactions: string[] = []

async function waitForInteractive(cdp: Devtools, session: string, flow: string, timeoutMs = 25_000): Promise<boolean> {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    const live = await evaluate<boolean>(cdp, session, HYDRATION_PROBE).catch(() => false)
    if (live) {
      const elapsed = Date.now() - started
      // One more tick so the commit that attached the handlers has settled.
      await new Promise((resolve) => setTimeout(resolve, 300))
      interactions.push(`${flow}: interactive after ${elapsed} ms`)
      return true
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  messages.push({ level: 'warning', message: `${flow}: no hydrated React tree appeared within ${timeoutMs / 1000}s, so interaction results for this flow are unreliable and are reported as such.` })
  return false
}

/* ------------------------------------------------------------------ *
 * Page-side collectors (strings, because they run in the browser)     *
 * ------------------------------------------------------------------ */

const CONTRAST_HELPERS = `
  function __lum(c) {
    const v = c.map(function (x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  function __parse(s) {
    const m = String(s).match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(/[,\\s/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  // Computed colours on this site are authored in oklch() (the Tailwind v4
  // theme), and Chromium returns the modern function form verbatim. An
  // rgb()-only parser therefore matches nothing: the first version of this
  // check reported "0 pairs checked, all pass" on every route, which is an
  // automatated pass for a measurement that never happened. __toRgb normalises
  // rgb()/rgba(), #hex, oklch() (converted directly) and anything else the
  // canvas parser understands into sRGB.
  function __hex(s) {
    const t = String(s).trim();
    if (t.charAt(0) !== '#') return null;
    let h = t.slice(1);
    if (!/^[0-9a-f]+$/i.test(h)) return null;
    if (h.length === 3 || h.length === 4) {
      h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2) + (h.length === 4 ? h.charAt(3) + h.charAt(3) : '');
    }
    if (h.length !== 6 && h.length !== 8) return null;
    const n = parseInt(h.slice(0, 6), 16);
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: a };
  }
  function __oklch(s) {
    const t = String(s).trim();
    if (t.toLowerCase().indexOf('oklch(') !== 0) return null;
    const body = t.slice(t.indexOf('(') + 1, t.lastIndexOf(')'));
    const halves = body.split('/');
    let alpha = 1;
    if (halves.length > 1) {
      const av = halves[1].trim();
      alpha = parseFloat(av) / (av.charAt(av.length - 1) === '%' ? 100 : 1);
    }
    const comps = halves[0].trim().split(' ').filter(function (x) { return x.length > 0; });
    if (comps.length < 3) return null;
    function scaled(raw, scale) {
      const isPct = raw.charAt(raw.length - 1) === '%';
      const v = parseFloat(raw);
      return isPct ? (v / 100) * scale : v;
    }
    const L = scaled(comps[0], 1);
    const C = scaled(comps[1], 0.4);
    const H = parseFloat(comps[2]) * Math.PI / 180;
    if (!isFinite(L) || !isFinite(C) || !isFinite(H)) return null;
    // oklch -> oklab -> linear sRGB -> sRGB (Bjorn Ottosson's matrices)
    const A = C * Math.cos(H);
    const B = C * Math.sin(H);
    const l_ = L + 0.3963377774 * A + 0.2158037573 * B;
    const m_ = L - 0.1055613458 * A - 0.0638541728 * B;
    const s_ = L - 0.0894841775 * A - 1.2914855480 * B;
    const l = l_ * l_ * l_, mm = m_ * m_ * m_, ss = s_ * s_ * s_;
    const rl = 4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * ss;
    const gl = -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * ss;
    const bl = -0.0041960863 * l - 0.7034186147 * mm + 1.7076147010 * ss;
    function enc(x) {
      const v = x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(Math.max(x, 0), 1 / 2.4) - 0.055;
      return Math.max(0, Math.min(255, Math.round(v * 255)));
    }
    return { r: enc(rl), g: enc(gl), b: enc(bl), a: isFinite(alpha) ? alpha : 1 };
  }
  let __normCtx = null;
  function __toRgb(s) {
    const str = String(s);
    const direct = __parse(str) || __hex(str) || __oklch(str);
    if (direct) return direct;
    // Anything else (lab/lch/color()/hsl): let the browser's own parser
    // normalise it, then read the serialised sRGB value back.
    if (!__normCtx) __normCtx = document.createElement('canvas').getContext('2d');
    if (!__normCtx) return null;
    __normCtx.fillStyle = '#010203';
    __normCtx.fillStyle = str;
    const normalized = String(__normCtx.fillStyle);
    if (normalized === '#010203') return null;
    return __parse(normalized) || __hex(normalized);
  }
  function __bgOf(el) {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = __toRgb(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0.95) return c;
      n = n.parentElement;
    }
    const body = __toRgb(getComputedStyle(document.body).backgroundColor);
    return body && body.a > 0.95 ? body : { r: 255, g: 255, b: 255, a: 1 };
  }
  function __ratio(f, b) {
    const a = __lum([f.r, f.g, f.b]), c = __lum([b.r, b.g, b.b]);
    const hi = Math.max(a, c), lo = Math.min(a, c);
    return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
  }
`

const STRUCTURE_CHECK = `(function () {
  // A control can only fail "has an accessible name" if assistive tech can
  // reach it at all. Widgets that mirror a value through a clipped 1x1 input
  // (aria-hidden, clip-path, tabindex=-1) and fields inside a display:none
  // honeypot wrapper are not in the accessibility tree, so they are excluded
  // rather than reported as unlabelled fields.
  function __exposed(el) {
    let n = el;
    while (n && n.nodeType === 1) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
      if (n.getAttribute('aria-hidden') === 'true') return false;
      n = n.parentElement;
    }
    const own = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (own.clipPath && own.clipPath.indexOf('inset(50%') === 0 && r.width <= 1.5 && r.height <= 1.5) return false;
    return true;
  }
  const out = { lang: document.documentElement.lang, title: document.title, hasFocus: document.hasFocus() };
  const vp = document.querySelector('meta[name="viewport"]');
  out.viewportContent = vp ? vp.getAttribute('content') : null;
  out.zoomBlocked = /user-scalable\\s*=\\s*no|maximum-scale\\s*=\\s*1(?![0-9])/.test(out.viewportContent || '');
  out.headings = [].slice.call(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(function (h) { return { level: Number(h.tagName[1]), text: (h.textContent || '').trim().slice(0, 60) }; });
  out.h1Count = out.headings.filter(function (h) { return h.level === 1; }).length;
  const skipped = [];
  for (let i = 1; i < out.headings.length; i += 1) {
    const prev = out.headings[i - 1].level, cur = out.headings[i].level;
    if (cur - prev > 1) skipped.push(out.headings[i - 1].text.slice(0, 30) + ' (h' + prev + ') -> ' + out.headings[i].text.slice(0, 30) + ' (h' + cur + ')');
  }
  out.skippedLevels = skipped;
  out.landmarks = [].slice.call(document.querySelectorAll('header,nav,main,footer,aside,form[role="search"],[role="main"],[role="navigation"],[role="banner"],[role="contentinfo"],[role="search"],[role="complementary"]')).map(function (el) {
    return { tag: el.tagName.toLowerCase(), role: el.getAttribute('role'), name: el.getAttribute('aria-label') || (el.getAttribute('aria-labelledby') ? '(labelledby)' : null) };
  });
  out.mainCount = document.querySelectorAll('main,[role="main"]').length;
  out.unnamedButtons = [].slice.call(document.querySelectorAll('button')).filter(function (b) {
    const name = (b.getAttribute('aria-label') || b.textContent || '').trim();
    const imgAlt = b.querySelector('img[alt]:not([alt=""])');
    return !name && !imgAlt && !b.getAttribute('aria-labelledby');
  }).map(function (b) { return (b.className || '').toString().slice(0, 60); });
  out.images = [].slice.call(document.querySelectorAll('img')).map(function (i) {
    return { hasAlt: i.hasAttribute('alt'), alt: i.getAttribute('alt'), src: (i.getAttribute('src') || '').split('/').pop(), decorative: i.getAttribute('alt') === '' };
  });
  out.inputsWithoutName = [].slice.call(document.querySelectorAll('input:not([type=hidden]),select,textarea')).filter(function (el) {
    if (!__exposed(el)) return false;
    if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')) return false;
    if (el.id) {
      const lab = document.querySelector('label[for="' + CSS.escape(el.id) + '"]');
      if (lab && (lab.textContent || '').trim()) return false;
    }
    if (el.closest('label') && (el.closest('label').textContent || '').trim()) return false;
    return true;
  }).map(function (el) { return { tag: el.tagName.toLowerCase(), type: el.getAttribute('type'), id: el.id, placeholder: el.getAttribute('placeholder') }; });
  out.duplicateIds = (function () {
    const seen = {}, dupes = [];
    [].slice.call(document.querySelectorAll('[id]')).forEach(function (el) { seen[el.id] = (seen[el.id] || 0) + 1; });
    Object.keys(seen).forEach(function (k) { if (seen[k] > 1) dupes.push(k + ' x' + seen[k]); });
    return dupes.slice(0, 10);
  })();
  out.horizontalOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  out.viewportSize = innerWidth + 'x' + innerHeight;
  return out;
})()`

const CONTRAST_CHECK = `(function () {
  ${CONTRAST_HELPERS}
  const seen = new Map();
  let skipped = 0;
  const funnel = { all: 0, withText: 0, candidate: 0, visible: 0, sized: 0, revealed: 0 };
  const all = [].slice.call(document.querySelectorAll('p,a,span,li,button,label,h1,h2,h3,h4,h5,h6,small,strong,dt,dd,td,th,summary,figcaption'));
  funnel.all = all.length;
  // Does this element paint characters itself (a direct text node), or does all
  // of its text come from child elements? Only the painting element owns the
  // pair: an <a> whose label lives in a styled <span> does not paint that span's
  // colour, and attributing the <a>'s own colour to it is exactly how the
  // WhatsApp launcher's 1.98:1 label went unmeasured.
  function __paintsText(el) {
    for (let i = 0; i < el.childNodes.length; i += 1) {
      const node = el.childNodes[i];
      if (node.nodeType === 3 && (node.textContent || '').trim()) return true;
    }
    return false;
  }
  // Not rendered at all (or hidden from assistive tech): out of scope.
  function __inert(el) {
    let n = el;
    while (n && n.nodeType === 1) {
      if (n.getAttribute && n.getAttribute('aria-hidden') === 'true') return true;
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden') return true;
      n = n.parentElement;
    }
    return false;
  }
  // Faded by a *wrapper*: the text is not part of the current presentation (an
  // exit animation, a closed overlay), so measuring it would invent failures.
  // The element's own opacity is different — that is the hover/focus reveal case
  // below, where the text really is shown to a user.
  function __fadedAncestor(el) {
    let n = el.parentElement;
    while (n && n.nodeType === 1) {
      const cs = getComputedStyle(n);
      if (Number(cs.opacity) === 0) return true;
      n = n.parentElement;
    }
    return false;
  }
  all.forEach(function (el) {
    const text = (el.textContent || '').trim();
    if (!text) return;
    funnel.withText++;
    if (!__paintsText(el)) return;
    funnel.candidate++;
    if (__inert(el) || __fadedAncestor(el)) return;
    const cs = getComputedStyle(el);
    // Text that is hidden only until hover/focus (opacity 0, clipped width) still
    // has to be readable once it appears, so it is measured too — a check that
    // only looks at the default state cannot see a hover-revealed label.
    const faded = Number(cs.opacity) === 0;
    if (faded) funnel.revealed++;
    funnel.visible++;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    funnel.sized++;
    const f = __toRgb(cs.color);
    if (!f || f.a < 0.5) { skipped++; return; }
    const b = __bgOf(el);
    const size = parseFloat(cs.fontSize);
    const bold = Number(cs.fontWeight) >= 700;
    const large = size >= 24 || (bold && size >= 18.66);
    const need = large ? 3 : 4.5;
    const got = __ratio(f, b);
    const key = cs.color + '|' + b.r + ',' + b.g + ',' + b.b + '|' + Math.round(size) + '|' + bold + '|' + (got >= need) + '|' + (faded ? 'revealed' : 'shown');
    if (!seen.has(key)) seen.set(key, { color: cs.color, bg: 'rgb(' + b.r + ',' + b.g + ',' + b.b + ')', px: Math.round(size), bold: bold, ratio: got, need: need, passes: got >= need, sample: text.slice(0, 44), tag: el.tagName.toLowerCase(), revealed: faded });
  });
  // A Map iterator is iterable but NOT array-like, so [].slice.call(...) on it
  // returns an empty array: this is what made the whole check vacuous (it
  // reported "0 pairs checked, all pass" on every route). Array.from is the
  // correct conversion for an iterable.
  const list = Array.from(seen.values());
  return { tested: list.length, skipped: skipped, funnel: funnel, failures: list.filter(function (x) { return !x.passes; }) };
})()`

const TARGET_CHECK = `(function () {
  // 2.5.8 exempts targets that are not displayed, and a clipped 1x1 input that
  // only mirrors a widget's value is not an operable pointer target.
  function __operable(el) {
    let n = el;
    while (n && n.nodeType === 1) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
      n = n.parentElement;
    }
    const own = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (own.clipPath && own.clipPath.indexOf('inset(50%') === 0 && r.width <= 1.5 && r.height <= 1.5) return false;
    if (el.getAttribute('tabindex') === '-1' && r.width <= 1.5 && r.height <= 1.5) return false;
    return r.width > 0;
  }
  const targets = [].slice.call(document.querySelectorAll('a[href],button,[role="button"],input:not([type=hidden]),select,textarea,summary')).filter(__operable);
  const under = [];
  targets.forEach(function (el) {
    const r = el.getBoundingClientRect();
    if (r.width >= 24 && r.height >= 24) return;
    const cs = getComputedStyle(el);
    const inlineInText = cs.display === 'inline' && !!el.closest('p,li,label,dd,figcaption,td');
    // WCAG 2.5.8 exception: an undersized target passes when a 24px-diameter
    // circle centred on it does not intersect another target.
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const radius = 12;
    let intersects = false;
    for (const other of targets) {
      if (other === el) continue;
      const o = other.getBoundingClientRect();
      const ox = Math.max(o.left, Math.min(cx, o.right)), oy = Math.max(o.top, Math.min(cy, o.bottom));
      const dx = cx - ox, dy = cy - oy;
      if (Math.sqrt(dx * dx + dy * dy) < radius) { intersects = true; break; }
    }
    under.push({ tag: el.tagName.toLowerCase(), w: Math.round(r.width), h: Math.round(r.height), inlineInText: inlineInText, spacingExceptionApplies: !intersects, label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40) });
  });
  return { total: targets.length, undersized: under, realFailures: under.filter(function (x) { return !x.inlineInText && !x.spacingExceptionApplies; }) };
})()`

const FOCUS_READ = `(function () {
  const el = document.activeElement;
  if (!el || el === document.body) return { tag: 'body', name: null, id: null, href: null, role: null, focusVisible: false, outlineWidth: '0px', outlineStyle: 'none', boxShadow: null, clipPath: 'none', rect: { x: 0, y: 0, w: 0, h: 0 }, fullyObscured: false, visibleFraction: 1, obscuredBy: null, isOffscreen: false };
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  // elementFromPoint() clamps to the viewport, so an element whose box sits
  // outside it (or that is not rendered at all) would be hit-tested at a corner
  // and reported as "obscured" by whatever happens to be there. Only a rendered
  // element with its centre on screen can be obscured in the sense 2.4.11 means.
  const rendered = r.width > 1 && r.height > 1;
  // 2.4.11 (Minimum) asks that a focused component is not *entirely* hidden, so
  // obscuration is measured as coverage: sample a 5x5 grid inside the focused
  // box and count the samples where the element (or a child of it) is on top. A
  // centre-only test also fails elements that a bottom banner merely overlaps,
  // which is stricter than AA — those are reported as an advisory instead.
  const cols = 5, rows = 5, inset = 1;
  let totalSamples = 0, visibleSamples = 0, hit = null;
  if (rendered) {
    for (let ix = 0; ix < cols; ix += 1) {
      for (let iy = 0; iy < rows; iy += 1) {
        const px = Math.round(r.left + inset + ((r.width - inset * 2) * (ix + 0.5)) / cols);
        const py = Math.round(r.top + inset + ((r.height - inset * 2) * (iy + 0.5)) / rows);
        if (px <= 0 || py <= 0 || px >= innerWidth || py >= innerHeight) continue;
        totalSamples += 1;
        const at = document.elementFromPoint(px, py);
        if (at && (at === el || el.contains(at) || at.contains(el))) visibleSamples += 1;
        else if (at && !hit) hit = at;
      }
    }
  }
  const visibleFraction = totalSamples > 0 ? visibleSamples / totalSamples : 1;
  let obscuredBy = null;
  let obscuredByText = null;
  let obscuredByPosition = null;
  if (hit) {
    obscuredBy = hit.tagName.toLowerCase() + (typeof hit.className === 'string' && hit.className ? '.' + hit.className.split(' ').slice(0, 2).join('.') : '');
    // Runs of whitespace collapse through a character class: this expression is
    // built inside a template literal, where an escaped whitespace shorthand would
    // be emitted as a literal letter and silently mangle the text.
    // Collapse whitespace and control characters with an escape-free class:
    // the printable-ASCII complement. Whitespace escapes written here would be
    // expanded by this template literal into their literal characters, and a raw
    // newline is not legal inside a regex literal.
    obscuredByText = (hit.textContent || '').replace(/[^ -~]+/g, ' ').trim().slice(0, 40) || null;
    // "fixed" identifies the overlay that must be reasoned about: the sticky
    // header, the consent banner, or the floating WhatsApp launcher.
    obscuredByPosition = getComputedStyle(hit).position;
  }
  return {
    tag: el.tagName.toLowerCase(),
    name: (el.getAttribute('aria-label') || el.textContent || el.getAttribute('placeholder') || '').trim().slice(0, 48),
    id: el.id || null,
    href: el.getAttribute('href'),
    role: el.getAttribute('role'),
    focusVisible: el.matches(':focus-visible'),
    outlineWidth: cs.outlineWidth,
    outlineStyle: cs.outlineStyle,
    boxShadow: cs.boxShadow === 'none' ? null : 'set',
    clipPath: cs.clipPath,
    rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    fullyObscured: rendered && totalSamples > 0 && visibleSamples === 0,
    visibleFraction: Math.round(visibleFraction * 100) / 100,
    obscuredBy: obscuredBy,
    obscuredByText: obscuredByText,
    obscuredByPosition: obscuredByPosition,
    isOffscreen: r.bottom < 0 || r.top > innerHeight,
    rendered,
    scrollY: Math.round(window.scrollY),
  };
})()`

const REDUCED_MOTION_HIDDEN = `(function () {
  const hidden = [];
  [].slice.call(document.querySelectorAll('[data-gsap-reveal]')).forEach(function (el) {
    const cs = getComputedStyle(el);
    if (Number(cs.opacity) < 0.99 || cs.visibility === 'hidden') {
      hidden.push({ target: el.getAttribute('data-gsap-reveal'), opacity: cs.opacity, style: (el.getAttribute('style') || '').slice(0, 60) });
    }
  });
  return { targets: document.querySelectorAll('[data-gsap-reveal]').length, hidden: hidden };
})()`

const FORM_STATE = `(function () {
  const form = document.querySelector('form');
  if (!form) return { found: false };
  const invalid = [].slice.call(form.querySelectorAll('[aria-invalid="true"]')).map(function (el) { return el.id || el.getAttribute('name') || el.tagName.toLowerCase(); });
  const errorNodes = [].slice.call(form.querySelectorAll('[role="alert"],[aria-live],.text-destructive,[data-error]'));
  const describedBy = [].slice.call(form.querySelectorAll('[aria-describedby]')).map(function (el) { return el.id + '->' + el.getAttribute('aria-describedby'); });
  const liveRegions = [].slice.call(document.querySelectorAll('[role="alert"],[aria-live]')).map(function (el) { return el.tagName.toLowerCase() + '[' + (el.getAttribute('role') || el.getAttribute('aria-live')) + ']:' + (el.textContent || '').trim().slice(0, 40); });
  return {
    found: true,
    ariaInvalid: invalid,
    errorNodeCount: errorNodes.length,
    describedBy: describedBy,
    liveRegions: liveRegions,
    requiredNative: [].slice.call(form.querySelectorAll('[required]')).length,
    requiredAria: [].slice.call(form.querySelectorAll('[aria-required="true"]')).length,
    focusedAfterSubmit: document.activeElement ? (document.activeElement.id || document.activeElement.tagName.toLowerCase()) : null,
    autocomplete: [].slice.call(form.querySelectorAll('input')).map(function (i) { return (i.id || i.name || '?') + ':' + (i.getAttribute('autocomplete') || 'none'); }),
    errorTexts: [].slice.call(form.querySelectorAll('span')).map(function (s) { return (s.textContent || '').trim(); }).filter(function (t) { return t.length > 3 && t.length < 90; }).slice(0, 8),
  };
})()`

/**
 * The mobile nav and the cookie-consent surface are both `role="dialog"`, and on
 * a first visit both exist at once. A bare `[role="dialog"]` therefore reported
 * the consent surface's state while the nav flow was driving the nav panel,
 * which turned "did focus move into the panel I opened?" into a meaningless
 * question. Every dialog check names the dialog it means.
 */
const dialogState = (selector: string) => `(function () {
  const dialog = document.querySelector(${JSON.stringify(selector)});
  if (!dialog) return { open: false };
  const focusables = [].slice.call(dialog.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'));
  const active = document.activeElement;
  return {
    open: true,
    label: dialog.getAttribute('aria-label') || (dialog.getAttribute('aria-labelledby') ? '(labelledby)' : null),
    ariaModal: dialog.getAttribute('aria-modal'),
    focusableCount: focusables.length,
    focusInside: !!active && dialog.contains(active),
    activeName: active ? (active.getAttribute('aria-label') || active.textContent || '').trim().slice(0, 40) : null,
  };
})()`

/* ------------------------------------------------------------------ *
 * Flows                                                              *
 * ------------------------------------------------------------------ */

async function auditRoute(cdp: Devtools, session: string, route: string, viewport: { width: number; height: number }, label: string): Promise<void> {
  const url = `${BASE_URL}${route}`
  const loaded = cdp.once('Page.loadEventFired', session)
  await cdp.send('Page.navigate', { url }, session)
  await loaded.catch(() => null)
  await cdp.send('Page.bringToFront', {}, session)
  await waitForInteractive(cdp, session, `route ${route} (${label})`)

  const structure = await evaluate<StructureReport>(cdp, session, STRUCTURE_CHECK)
  record(route, label, 'document.hasFocus (focus checks are only valid with a focused page)', 'critical', structure.hasFocus === true, structure.hasFocus ? 'page has focus' : 'page does NOT have focus — focus findings would be unreliable')
  record(route, label, 'html lang attribute', 'serious', Boolean(structure.lang), `lang="${structure.lang}"`)
  record(route, label, 'viewport does not block zoom (1.4.4)', 'serious', !structure.zoomBlocked, `content="${structure.viewportContent}"`)
  record(route, label, 'exactly one h1', 'moderate', structure.h1Count === 1, `${structure.h1Count} h1 element(s): ${structure.headings.filter((h) => h.level === 1).map((h) => h.text).join(' | ') || 'none'}`)
  record(route, label, 'no skipped heading levels', 'moderate', structure.skippedLevels.length === 0, structure.skippedLevels.length ? structure.skippedLevels.join('; ') : 'heading outline is sequential')
  record(route, label, 'single main landmark', 'serious', structure.mainCount === 1, `${structure.mainCount} main landmark(s)`)
  const unnamed = structure.landmarks.filter((l) => l.tag === 'nav' && !l.name)
  record(route, label, 'every nav landmark is named', 'moderate', unnamed.length === 0, unnamed.length ? `${unnamed.length} unnamed nav landmark(s)` : 'all nav landmarks named')
  record(route, label, 'no buttons without an accessible name', 'critical', structure.unnamedButtons.length === 0, structure.unnamedButtons.length ? `${structure.unnamedButtons.length}: ${structure.unnamedButtons.join(' | ')}` : 'all buttons named')
  const badAlt = structure.images.filter((i) => !i.hasAlt)
  record(route, label, 'all images have an alt attribute', 'serious', badAlt.length === 0, badAlt.length ? `${badAlt.length} image(s) without alt: ${badAlt.map((i) => i.src).join(', ')}` : `${structure.images.length} image(s) checked`)
  record(route, label, 'no duplicate element ids', 'moderate', structure.duplicateIds.length === 0, structure.duplicateIds.length ? structure.duplicateIds.join(', ') : 'ids are unique')
  const unnamedInputs = structure.inputsWithoutName.filter((i) => i.type !== 'hidden')
  record(route, label, 'every form control has an accessible name (3.3.2)', 'critical', unnamedInputs.length === 0, unnamedInputs.length ? `${unnamedInputs.length} unlabelled: ${unnamedInputs.map((i) => `${i.tag}${i.type ? '[' + i.type + ']' : ''}${i.placeholder ? ' placeholder="' + i.placeholder + '"' : ''}`).join('; ')}` : 'all controls labelled')

  const contrast = await evaluate<ContrastReport>(cdp, session, CONTRAST_CHECK)
  // A check that measured nothing must not report a pass: that is how this
  // check quietly reported "all pass" while comparing zero pairs.
  record(
    route,
    label,
    'text contrast (1.4.3)',
    'serious',
    contrast.tested > 0 && contrast.failures.length === 0,
    contrast.failures.length
      ? `${contrast.tested} distinct pair(s) checked; failed: ${contrast.failures.map((f) => `${f.ratio}:1 (needs ${f.need}:1) ${f.color} on ${f.bg} @${f.px}px "${f.sample}"${f.revealed ? ' (revealed on hover/focus)' : ''}`).join(' | ')}`
      : contrast.tested === 0
        ? `no measurable colour pair: ${contrast.skipped} unparseable, ${contrast.funnel.sized} sized candidate(s) of ${contrast.funnel.withText} text element(s) (${contrast.funnel.all} scanned) — contrast was NOT verified on this route`
        : `${contrast.tested} distinct text/background pairs checked, all pass`,
  )

  const targets = await evaluate<TargetReport>(cdp, session, TARGET_CHECK)
  record(route, label, 'target size (2.5.8)', 'moderate', targets.realFailures.length === 0, targets.realFailures.length ? targets.realFailures.map((t) => `${t.tag} ${t.w}x${t.h} "${t.label}"`).join(' | ') : `${targets.total} targets; ${targets.undersized.length} undersized but covered by the inline or spacing exception`)

  // Focus order, visibility and obscuring — the checks the panel could not do.
  const order: FocusState[] = []
  await evaluate(cdp, session, `document.body.setAttribute('tabindex','-1'); document.body.focus(); document.body.removeAttribute('tabindex'); true`)
  for (let i = 0; i < 14; i += 1) {
    await pressKey(cdp, session, 'Tab')
    // The reveal scroll is animated (see SETTLE_SCROLL): measure where focus
    // comes to rest, not the frame the key press produced.
    await settleScroll(cdp, session)
    const state = await evaluate<FocusState>(cdp, session, FOCUS_READ)
    order.push(state)
    if (state.tag === 'body') break
  }
  const invisible = order.filter((s) => s.tag !== 'body' && !s.focusVisible && s.outlineStyle === 'none' && !s.boxShadow)
  record(route, label, 'keyboard focus is always visible (2.4.7)', 'critical', invisible.length === 0, invisible.length ? invisible.map((s) => `<${s.tag}> "${s.name}" outline=${s.outlineWidth}/${s.outlineStyle}`).join(' | ') : `${order.length} stops, each with a visible indicator`)
  const obscured = order.filter((s) => s.fullyObscured)
  record(route, label, 'focused element is not fully obscured by fixed chrome (2.4.11)', 'serious', obscured.length === 0, obscured.length ? obscured.map((s) => `<${s.tag}> "${s.name}" ${s.rect.w}x${s.rect.h} at y=${s.rect.y} (scrollY=${s.scrollY}) covered by ${s.obscuredBy} [position:${s.obscuredByPosition}] "${s.obscuredByText}"`).join(' | ') : 'no focused stop was entirely covered by the header, banner or floating controls')
  // Advisory, not a failure: 2.4.11 Minimum is satisfied while any part of the
  // focused component is visible, but a stop that is mostly behind the banner is
  // worth seeing in the report. Always recorded so the check count stays stable.
  const partly = order.filter((s) => !s.fullyObscured && s.tag !== 'body' && s.visibleFraction < 0.5)
  record(route, label, 'partly covered while focused (advisory — stricter than 2.4.11 AA)', 'minor', true, partly.length ? partly.map((s) => `<${s.tag}> "${s.name}" ${Math.round(s.visibleFraction * 100)}% visible, covered by ${s.obscuredBy}`).join(' | ') : 'no focused stop was more than half covered')

  const skip = order[0]
  if (skip && skip.href === '#main-content') {
    record(route, label, 'skip link is the first stop and becomes visible on focus', 'serious', skip.clipPath === 'none' && skip.fullyObscured === false, `clip-path=${skip.clipPath}, rect=${skip.rect.w}x${skip.rect.h}, obscured=${skip.fullyObscured}`)
  } else {
    record(route, label, 'skip link is the first focus stop', 'moderate', false, `first stop was <${skip ? skip.tag : 'none'}> ${skip ? skip.name : ''}`)
  }

  findings.push({ route, viewport: label, check: 'focus order sample', severity: 'minor', ok: true, detail: order.slice(0, 12).map((s) => `<${s.tag}>${s.name ? ' "' + s.name + '"' : ''}${s.focusVisible ? '' : ' (no :focus-visible)'}`).join(' -> ') })
}

async function auditMobileNav(cdp: Devtools, session: string, route: string): Promise<void> {
  const label = 'mobile 390x844'
  const url = `${BASE_URL}${route}`
  const loaded = cdp.once('Page.loadEventFired', session)
  await cdp.send('Page.navigate', { url }, session)
  await loaded.catch(() => null)
  await cdp.send('Page.bringToFront', {}, session)
  await waitForInteractive(cdp, session, 'mobile nav flow')

  const toggle = await evaluate<ToggleReport>(cdp, session, `(function(){ const b = document.querySelector('button[aria-label="Open menu"],button[aria-label="Close menu"]'); if (!b) return { found: false }; b.focus(); return { found: true, expanded: b.getAttribute('aria-expanded'), focused: document.activeElement === b, hasFocus: document.hasFocus() }; })()`)
  if (!toggle.found) {
    record(route, label, 'mobile navigation toggle exists', 'serious', false, 'no button with aria-label "Open menu" was found')
    return
  }
  record(route, label, 'mobile nav toggle is reachable and reports state', 'serious', toggle.focused === true, `focused=${toggle.focused}, aria-expanded=${toggle.expanded}`)

  await pressKey(cdp, session, 'Enter')
  // React commits the open state first and moves focus in a follow-up effect, so
  // a single read can catch the moment where the dialog exists but focus has not
  // moved yet (that produced both "open=false" and "focus stayed outside" across
  // runs). Poll until the state that is being asserted is true, bounded — if
  // focus never arrives, the assertion below still fails for real.
  let opened = await evaluate<DialogReport>(cdp, session, dialogState(MOBILE_NAV_DIALOG))
  for (let attempt = 0; attempt < 12 && !(opened.open === true && opened.focusInside === true); attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    opened = await evaluate<DialogReport>(cdp, session, dialogState(MOBILE_NAV_DIALOG))
  }
  record(route, label, 'mobile nav opens as a labelled modal dialog', 'serious', opened.open === true && opened.ariaModal === 'true' && Boolean(opened.label), `open=${opened.open}, aria-modal=${opened.ariaModal}, label=${opened.label}`)
  record(route, label, 'focus moves into the mobile nav dialog on open', 'critical', opened.focusInside === true, opened.focusInside ? `focus is on "${opened.activeName}" inside the dialog` : `focus stayed outside the dialog (active: ${opened.activeName})`)

  // Tab through more stops than the dialog holds; focus must not escape it.
  let escaped = false
  let escapeStop = ''
  for (let i = 0; i < (opened.focusableCount ?? 0) + 4; i += 1) {
    await pressKey(cdp, session, 'Tab')
    const inside = await evaluate<TabProbe>(cdp, session, `(function(){ const d = document.querySelector(${JSON.stringify(MOBILE_NAV_DIALOG)}); const a = document.activeElement; return { inside: !!d && !!a && d.contains(a), name: a ? (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 30) : null, tag: a ? a.tagName.toLowerCase() : null }; })()`)
    if (!inside.inside) {
      escaped = true
      escapeStop = `<${inside.tag}> ${inside.name}`
      break
    }
  }
  record(route, label, 'keyboard focus stays inside the open mobile nav', 'critical', !escaped, escaped ? `focus escaped to ${escapeStop}` : `focus remained inside for ${(opened.focusableCount ?? 0) + 4} tab presses`)

  await pressKey(cdp, session, 'Escape')
  const closed = await evaluate<CloseReport>(cdp, session, `(function(){ const d = document.querySelector(${JSON.stringify(MOBILE_NAV_DIALOG)}); const b = document.querySelector('button[aria-label="Open menu"],button[aria-label="Close menu"]'); return { dialogOpen: !!d, expanded: b ? b.getAttribute('aria-expanded') : null, focusReturned: b ? document.activeElement === b : false, activeTag: document.activeElement ? document.activeElement.tagName.toLowerCase() : null, activeName: document.activeElement ? (document.activeElement.getAttribute('aria-label') || '').trim() : '' }; })()`)
  record(route, label, 'Escape closes the mobile nav', 'serious', closed.dialogOpen === false, `dialog still open: ${closed.dialogOpen}`)
  record(route, label, 'focus returns to the toggle after closing', 'serious', closed.focusReturned === true, `focus is on <${closed.activeTag}> "${closed.activeName}"`)

  findings.push({ route, viewport: label, check: 'mobile nav flow evidence', severity: 'minor', ok: true, detail: `focusable elements in dialog: ${opened.focusableCount}` })
}

async function auditRevealReducedMotion(cdp: Devtools, session: string, route: string): Promise<void> {
  const label = 'desktop 1440x900 reduced-motion'
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }, session)
  const loaded = cdp.once('Page.loadEventFired', session)
  await cdp.send('Page.navigate', { url: `${BASE_URL}${route}` }, session)
  await loaded.catch(() => null)
  await cdp.send('Page.bringToFront', {}, session)
  await waitForInteractive(cdp, session, 'reduced-motion reveal')
  // The motion layer's mount effect plus the first ScrollTrigger pass.
  await new Promise((resolve) => setTimeout(resolve, 1500))
  const state = await evaluate<ReducedMotionReport>(cdp, session, REDUCED_MOTION_HIDDEN)
  record(route, label, 'reduced motion leaves no reveal content hidden', 'critical', state.hidden.length === 0, state.hidden.length ? state.hidden.map((h) => `${h.target} opacity=${h.opacity}`).join(' | ') : `${state.targets} reveal target(s), none hidden`)
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] }, session)
}

async function auditReflow(cdp: Devtools, session: string, route: string): Promise<void> {
  const label = 'reflow 320x800'
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: REFLOW.width, height: REFLOW.height, deviceScaleFactor: 1, mobile: true }, session)
  const loaded = cdp.once('Page.loadEventFired', session)
  await cdp.send('Page.navigate', { url: `${BASE_URL}${route}` }, session)
  await loaded.catch(() => null)
  await new Promise((resolve) => setTimeout(resolve, 900))
  const state = await evaluate<ReflowReport>(cdp, session, `({ overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth })`)
  record(route, label, 'no horizontal scrolling at 320px (1.4.10)', 'serious', state.overflow <= 1, `scrollWidth ${state.scrollWidth} vs clientWidth ${state.clientWidth} (overflow ${state.overflow}px)`)
}

async function auditLeadForm(cdp: Devtools, session: string, route: string): Promise<void> {
  const label = 'desktop 1440x900 form flow'
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: DESKTOP.width, height: DESKTOP.height, deviceScaleFactor: 1, mobile: false }, session)
  const loaded = cdp.once('Page.loadEventFired', session)
  await cdp.send('Page.navigate', { url: `${BASE_URL}${route}` }, session)
  await loaded.catch(() => null)
  await cdp.send('Page.bringToFront', {}, session)
  await waitForInteractive(cdp, session, 'lead form flow')

  const before = await evaluate<FormReport>(cdp, session, FORM_STATE)
  if (!before.found) {
    record(route, label, 'lead form present', 'serious', false, 'no <form> on the page')
    return
  }
  const requiredTotal = (before.requiredNative ?? 0) + (before.requiredAria ?? 0)
  record(route, label, 'required fields are exposed programmatically', 'moderate', requiredTotal > 0, `required attributes: ${before.requiredNative ?? 0} native, ${before.requiredAria ?? 0} aria-required`)
  const missingAutocomplete = (before.autocomplete ?? []).filter((a) => /^(name|email):none$/.test(a))
  record(route, label, 'identify input purpose on name/email (1.3.5)', 'moderate', missingAutocomplete.length === 0, missingAutocomplete.length ? `no autocomplete on: ${missingAutocomplete.join(', ')}` : (before.autocomplete ?? []).join(', '))

  // Submit with empty fields: client-side validation only, no request is sent.
  const submitted = await evaluate<SubmitReport>(cdp, session, `(function(){ const form = document.querySelector('form'); const btn = form.querySelector('button[type="submit"]'); if (!btn) return { ok: false }; btn.focus(); btn.click(); return { ok: true }; })()`)
  if (!submitted.ok) {
    record(route, label, 'lead form has a submit button', 'serious', false, 'no submit button found')
    return
  }
  await new Promise((resolve) => setTimeout(resolve, 900))
  const after = await evaluate<FormReport>(cdp, session, FORM_STATE)
  record(route, label, 'invalid fields are marked with aria-invalid (3.3.1)', 'serious', (after.ariaInvalid || []).length > 0, (after.ariaInvalid || []).length ? `aria-invalid on: ${(after.ariaInvalid ?? []).join(', ')}` : 'no field set aria-invalid="true" after an invalid submit')
  record(route, label, 'field errors are associated with their input (3.3.1)', 'serious', (after.describedBy || []).length > 0, (after.describedBy || []).length ? (after.describedBy || []).join(', ') : 'no aria-describedby links an error message to a field')
  record(route, label, 'errors are announced to assistive tech (4.1.3)', 'serious', (after.liveRegions || []).length > 0, (after.liveRegions || []).length ? (after.liveRegions || []).join(' | ') : 'no role="alert" or aria-live region exists after an invalid submit')
  record(route, label, 'focus moves to the first error on invalid submit (3.3.1)', 'moderate', after.focusedAfterSubmit !== null && after.focusedAfterSubmit !== 'body', `focus after submit: ${after.focusedAfterSubmit}`)
}

async function auditConsent(cdp: Devtools, session: string, route: string): Promise<void> {
  const label = 'desktop 1440x900 consent flow'
  const loaded = cdp.once('Page.loadEventFired', session)
  await cdp.send('Page.navigate', { url: `${BASE_URL}${route}` }, session)
  await loaded.catch(() => null)
  await cdp.send('Page.bringToFront', {}, session)
  await waitForInteractive(cdp, session, 'consent flow')

  const opened = await evaluate<{ found: boolean }>(cdp, session, `(function(){
    const btn = [].slice.call(document.querySelectorAll('button')).filter(function (b) { return /cookie settings/i.test(b.textContent || ''); })[0];
    if (!btn) return { found: false };
    btn.focus(); btn.click();
    return { found: true };
  })()`)
  if (!opened.found) {
    record(route, label, 'cookie settings control exists', 'serious', false, 'no "Cookie settings" control found')
    return
  }
  await new Promise((resolve) => setTimeout(resolve, 500))
  const state = await evaluate<ConsentReport>(cdp, session, `(function(){
    const dialog = document.querySelector('[aria-label="Cookie consent"]');
    if (!dialog) return { visible: false };
    const boxes = [].slice.call(dialog.querySelectorAll('input[type="checkbox"]'));
    const active = document.activeElement;
    return {
      visible: true,
      role: dialog.getAttribute('role'),
      focusInside: !!active && dialog.contains(active),
      activeName: active ? (active.getAttribute('aria-label') || active.textContent || '').trim().slice(0, 40) : null,
      checkboxCount: boxes.length,
      checkboxNames: boxes.map(function (b) { return (b.closest('label') && (b.closest('label').textContent || '').trim().slice(0, 30)) || b.getAttribute('aria-label') || null; }),
      buttons: [].slice.call(dialog.querySelectorAll('button')).map(function (b) { return (b.textContent || '').trim(); }),
    };
  })()`)
  record(route, label, 'cookie settings reopen from the footer', 'serious', state.visible === true, state.visible ? 'preference dialog is present' : 'dialog did not open')
  if (!state.visible) return
  record(route, label, 'focus moves into the reopened consent dialog', 'moderate', state.focusInside === true, state.focusInside ? `focus on "${state.activeName}"` : `focus stayed outside (active: ${state.activeName})`)
  record(route, label, 'consent choices are real labelled checkboxes', 'serious', state.checkboxCount === 2 && (state.checkboxNames ?? []).every((n) => Boolean(n)), `${state.checkboxCount} checkbox(es): ${(state.checkboxNames ?? []).join(' | ')}`)
  findings.push({ route, viewport: label, check: 'consent dialog controls', severity: 'minor', ok: true, detail: `buttons: ${(state.buttons ?? []).join(' | ')}` })
}

/* ------------------------------------------------------------------ *
 * Hydration diagnostic                                               *
 * ------------------------------------------------------------------ */

interface ConsoleParams {
  type?: string
  args?: Array<{ value?: unknown; description?: string }>
}
interface ExceptionParams {
  exceptionDetails?: { text?: string; exception?: { description?: string } }
}
interface LogEntryParams {
  entry?: { level?: string; source?: string; text?: string }
}
interface HydrationDiagnostics {
  readyState: string
  scripts: number
  externalScripts: string[]
  bodyMarkers: string[]
  mainMarkers: string[]
  toggleMarkers: string[]
  gsapStyled: number
  consentBanner: boolean
  globalKeys: string[]
  documentScriptSrcs: number
}

/**
 * Answers one question the other checks cannot: is the client layer actually
 * running? Every interaction result is meaningless if it is not, so this flow
 * reports the observable evidence (React markers on hydrated nodes, the
 * client-only consent banner, GSAP's inline styles) together with any console
 * error or uncaught exception the page produced while loading.
 */
async function diagnoseHydration(cdp: Devtools, session: string, route: string): Promise<void> {
  const events: string[] = []
  cdp.on('Runtime.exceptionThrown', session, (params) => {
    const details = (params as ExceptionParams).exceptionDetails
    const text = (details?.exception?.description ?? details?.text ?? 'unknown').split('\n')[0]
    events.push(`exception: ${text.slice(0, 240)}`)
  })
  cdp.on('Runtime.consoleAPICalled', session, (params) => {
    const { type, args } = params as ConsoleParams
    if (type !== 'error' && type !== 'warning') return
    const text = (args ?? []).map((arg) => String(arg.value ?? arg.description ?? '')).join(' ')
    events.push(`${type}: ${text.slice(0, 240)}`)
  })
  cdp.on('Log.entryAdded', session, (params) => {
    const entry = (params as LogEntryParams).entry
    if (!entry || (entry.level !== 'error' && entry.level !== 'warning')) return
    events.push(`log ${entry.source ?? '?'} ${entry.level}: ${(entry.text ?? '').slice(0, 240)}`)
  })
  const netIssues: string[] = []
  cdp.on('Network.responseReceived', session, (params) => {
    const event = params as { type?: string; response?: { url?: string; status?: number } }
    if (event.type !== 'Script' && event.type !== 'Document') return
    const status = event.response?.status ?? 0
    if (status >= 400) netIssues.push(`${status} ${(event.response?.url ?? '').split('/').pop()?.slice(0, 80)}`)
  })
  cdp.on('Network.loadingFailed', session, (params) => {
    const event = params as { type?: string; errorText?: string; blockedReason?: string }
    if (event.type !== 'Script' && event.type !== 'Document') return
    netIssues.push(`failed ${event.errorText ?? ''} ${event.blockedReason ?? ''}`.trim())
  })
  await cdp.send('Log.enable', {}, session).catch(() => null)
  await cdp.send('Network.enable', {}, session).catch(() => null)

  const loaded = cdp.once('Page.loadEventFired', session)
  await cdp.send('Page.navigate', { url: `${BASE_URL}${route}` }, session)
  await loaded.catch(() => null)
  await new Promise((resolve) => setTimeout(resolve, 8000))

  // Does the page actually get a chance to run browser work? A page Chrome treats
  // as occluded serves frames but never runs rAF or idle callbacks, and React's
  // hydration work is scheduled on exactly those.
  const scheduling = await evaluate<{ visibilityState: string; hidden: boolean; rafFired: boolean; idleFired: boolean }>(cdp, session, `(async function () {
    const out = { visibilityState: document.visibilityState, hidden: document.hidden, rafFired: false, idleFired: false };
    await new Promise(function (resolve) {
      let settled = 0;
      const done = function () { settled += 1; if (settled === 2) resolve(null); };
      requestAnimationFrame(function () { out.rafFired = true; done(); });
      setTimeout(function () { if (!out.rafFired) done(); }, 900);
      if (typeof requestIdleCallback === 'function') requestIdleCallback(function () { out.idleFired = true; done(); }, { timeout: 800 });
      else done();
      setTimeout(function () { if (!out.idleFired) done(); }, 1200);
    });
    return out;
  })()`)

  const probe = await evaluate<HydrationDiagnostics>(cdp, session, `(function () {
    function markers(el) {
      if (!el) return [];
      return Object.getOwnPropertyNames(el).filter(function (k) { return k.indexOf('__react') === 0; }).slice(0, 3);
    }
    const scripts = [].slice.call(document.scripts);
    return {
      readyState: document.readyState,
      scripts: scripts.length,
      documentScriptSrcs: scripts.filter(function (s) { return s.src; }).length,
      externalScripts: scripts.filter(function (s) { return s.src; }).map(function (s) { return s.src.split('/').pop(); }).slice(0, 12),
      bodyMarkers: markers(document.body),
      mainMarkers: markers(document.querySelector('main')),
      toggleMarkers: markers(document.querySelector('button[aria-label="Open menu"]')),
      gsapStyled: document.querySelectorAll('[data-gsap-reveal][style]').length,
      consentBanner: Boolean(document.querySelector('[aria-label="Cookie consent"]')),
      globalKeys: Object.keys(window).filter(function (k) { return /^(_next|next|__NEXT|webpackChunk|__react)/.test(k); }).slice(0, 10),
    };
  })()`)

  const uniqueEvents = [...new Set(events)]
  console.log('\nHydration diagnostic:')
  console.log(JSON.stringify({ probe, scheduling, netIssues: netIssues.slice(0, 12), pageEvents: uniqueEvents.slice(0, 12) }, null, 2))
  const live = probe.bodyMarkers.length > 0 || probe.mainMarkers.length > 0 || probe.toggleMarkers.length > 0
  if (!live && (!scheduling.rafFired || !scheduling.idleFired)) {
    messages.push({ level: 'warning', message: `the browser does not run rAF (${scheduling.rafFired}) or idle callbacks (${scheduling.idleFired}) on ${BASE_URL}; visibilityState=${scheduling.visibilityState}. React hydration is scheduled on those, so no interaction flow on this target is meaningful.` })
  }
  record(route, 'hydration diagnostic', 'client layer is running (interaction checks are valid)', 'critical', live, live ? `React markers present: ${[...probe.bodyMarkers, ...probe.mainMarkers, ...probe.toggleMarkers].join(', ')}` : `no React marker on body, main or the mobile nav toggle after 8s; consent banner present=${probe.consentBanner}, GSAP inline styles=${probe.gsapStyled}, ${probe.documentScriptSrcs} external script(s), rAF=${scheduling.rafFired}, idle=${scheduling.idleFired}, visibility=${scheduling.visibilityState}; network: ${netIssues.slice(0, 4).join(' || ') || 'all script/document responses were OK'}; page events: ${uniqueEvents.slice(0, 3).join(' || ') || 'none'}`)
}

/* ------------------------------------------------------------------ *
 * Runner                                                             *
 * ------------------------------------------------------------------ */

/**
 * One section of the audit. A section that cannot be measured (a renderer that
 * stops responding, a page that never loads) is reported as an incomplete
 * section and the audit carries on, so a single bad measurement cannot discard
 * the evidence every other section gathered.
 */
async function step(name: string, run: () => Promise<void>): Promise<boolean> {
  try {
    await run()
    return true
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    // The message alone rarely says where a section stopped, so the stack is
    // printed for the operator while the report stays clean.
    console.error(`[${name}] ${detail}\n${error instanceof Error ? (error.stack ?? '') : ''}`)
    messages.push({ level: 'warning', message: `${name} could not be measured (${detail}); the remaining sections still ran, so the report is partial for ${name}.` })
    record('—', name, 'section measured', 'serious', false, `incomplete: ${detail}`)
    return false
  }
}

async function main(): Promise<void> {
  // A11Y_ONLY=form,mobile-nav runs just those interaction flows, so iterating on
  // one flow does not mean re-running every structural check on every route.
  const only = (process.env.A11Y_ONLY ?? '').split(',').map((value) => value.trim()).filter(Boolean)
  const wants = (flow: string) => only.length === 0 || only.includes(flow)
  const browser = findBrowser()
  if (!browser) {
    messages.push({ level: 'warning', message: 'No local Chrome, Edge or Chromium found; set CHROME_PATH to run the accessibility audit.' })
    printResult('Accessibility audit', messages)
    return
  }

  const port = Number(process.env.A11Y_DEVTOOLS_PORT ?? '9344')
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'ha-a11y-'))
  const child: ChildProcess = spawn(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      '--hide-scrollbars',
      '--mute-audio',
      // On Windows, headless renderers can be treated as occluded and throttled
      // down mid-run; the renderer then stops answering Runtime.evaluate and the
      // run dies with "Runtime.evaluate timed out". These three flags keep the
      // audited page running at full speed for the whole audit.
      '--disable-features=CalculateNativeWinOcclusion',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      `--user-data-dir=${profile}`,
      `--remote-debugging-port=${port}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  )

  let cdp: Devtools | null = null
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

    cdp = await Devtools.connect(version.webSocketDebuggerUrl)
    const target = (await cdp.send('Target.createTarget', { url: 'about:blank' })) as { targetId: string }
    const attached = (await cdp.send('Target.attachToTarget', { targetId: target.targetId, flatten: true })) as { sessionId: string }
    const session = attached.sessionId

    await cdp.send('Page.enable', {}, session)
    await cdp.send('Runtime.enable', {}, session)
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] }, session)

    console.log(`Accessibility audit of ${BASE_URL} — ${ROUTES.length} route(s), desktop ${DESKTOP.width}x${DESKTOP.height}, mobile ${MOBILE.width}x${MOBILE.height}, reflow ${REFLOW.width}x${REFLOW.height}.`)

    if (wants('hydrate')) await step('hydration diagnostic', () => diagnoseHydration(cdp as Devtools, session, ROUTES[0]))

    await cdp.send('Emulation.setDeviceMetricsOverride', { width: DESKTOP.width, height: DESKTOP.height, deviceScaleFactor: 1, mobile: false }, session)
    if (wants('routes')) {
      await step('desktop route checks', async () => {
        for (const route of ROUTES) await auditRoute(cdp as Devtools, session, route, DESKTOP, 'desktop 1440x900')
      })

      await cdp.send('Emulation.setDeviceMetricsOverride', { width: MOBILE.width, height: MOBILE.height, deviceScaleFactor: 2.6, mobile: true }, session)
      await step('mobile route checks', async () => {
        for (const route of ROUTES) await auditRoute(cdp as Devtools, session, route, MOBILE, 'mobile 390x844')
      })
    }

    if (wants('mobile-nav')) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width: MOBILE.width, height: MOBILE.height, deviceScaleFactor: 2.6, mobile: true }, session)
      await step('mobile nav flow', () => auditMobileNav(cdp as Devtools, session, ROUTES[0]))
    }

    if (wants('reduced-motion')) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width: DESKTOP.width, height: DESKTOP.height, deviceScaleFactor: 1, mobile: false }, session)
      await step('reduced-motion flow', () => auditRevealReducedMotion(cdp as Devtools, session, ROUTES[0]))
    }

    if (wants('form')) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width: DESKTOP.width, height: DESKTOP.height, deviceScaleFactor: 1, mobile: false }, session)
      await step('lead form flow', () => auditLeadForm(cdp as Devtools, session, '/contact'))
    }

    if (wants('consent')) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width: DESKTOP.width, height: DESKTOP.height, deviceScaleFactor: 1, mobile: false }, session)
      await step('consent flow', () => auditConsent(cdp as Devtools, session, ROUTES[0]))
    }

    if (wants('reflow')) await step('reflow flow', () => auditReflow(cdp as Devtools, session, ROUTES[0]))
  } finally {
    cdp?.close()
    child.kill()
    try {
      fs.rmSync(profile, { recursive: true, force: true })
    } catch {
      // The OS cleans the temp profile up.
    }
  }

  const failures = findings.filter((f) => !f.ok)
  const bySeverity: Record<Severity, number> = { critical: 0, serious: 0, moderate: 0, minor: 0 }
  for (const failure of failures) bySeverity[failure.severity] += 1

  const rows: string[][] = [['Severity', 'Route', 'Viewport', 'Check', 'Detail']]
  for (const failure of failures.sort((a, b) => ['critical', 'serious', 'moderate', 'minor'].indexOf(a.severity) - ['critical', 'serious', 'moderate', 'minor'].indexOf(b.severity))) {
    rows.push([failure.severity, failure.route, failure.viewport, failure.check, failure.detail.slice(0, 220)])
  }
  if (failures.length > 0) console.log(markdownTable(rows))

  writeJson(REPORT_PATH, { auditedAt: new Date().toISOString(), baseUrl: BASE_URL, routes: ROUTES, hydration: interactions, totals: { checks: findings.length, failures: failures.length, bySeverity }, findings })
  if (interactions.length > 0) console.log(`Hydration gate: ${interactions.join(' | ')}`)
  console.log(`Ran ${findings.length} check(s); ${failures.length} did not pass (${bySeverity.critical} critical, ${bySeverity.serious} serious, ${bySeverity.moderate} moderate, ${bySeverity.minor} minor). Recorded in ${REPORT_PATH}.`)
  printResult('Accessibility audit', messages)
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
