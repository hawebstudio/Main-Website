const scriptSources = [
  "'self'",
  'https://va.vercel-scripts.com',
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://www.clarity.ms',
  'https://*.clarity.ms',
]

const connectSources = [
  "'self'",
  'https://vitals.vercel-insights.com',
  'https://www.google-analytics.com',
  'https://region1.google-analytics.com',
  'https://www.googletagmanager.com',
  'https://www.clarity.ms',
  'https://*.clarity.ms',
]

const frameSources = ["'self'", 'https://www.googletagmanager.com']

const imgSources = [
  "'self'",
  'data:',
  'blob:',
  'https://www.google-analytics.com',
  'https://www.googletagmanager.com',
  'https://www.clarity.ms',
  'https://*.clarity.ms',
]

/**
 * Builds the Content-Security-Policy value for a single request.
 *
 * Uses a per-request nonce + 'strict-dynamic' instead of 'unsafe-inline' for
 * script-src, so inline bootstrap scripts (consent mode, GTM, GA4) execute
 * only when they carry the matching nonce, and any scripts they dynamically
 * inject are trusted transitively. 'strict-dynamic' also makes the explicit
 * host allowlist a fallback-only for browsers that don't support it, closing
 * the "host allowlists can be bypassed" and "unsafe-inline" findings Chrome's
 * CSP evaluator flags on the old policy.
 *
 * @param {string} nonce
 * @param {boolean} [isDev] Set true in development so the script-src allows
 *   `'unsafe-eval'`. Next.js/React need `eval()` in dev (for Fast Refresh /
 *   Turbopack HMR and reconstructing component stacks) even though they
 *   never use it in production. Without this, the browser blocks the eval
 *   call, React logs a console error, and the dev overlay can get stuck in a
 *   bad state (including spurious Turbopack crashes) — this must stay
 *   dev-only since 'unsafe-eval' would weaken the production CSP.
 */
export function buildCSPHeaderValue(nonce, isDev = false) {
  return [
    "default-src 'self'",
    `script-src ${scriptSources.join(' ')} 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src ${imgSources.join(' ')}`,
    "font-src 'self'",
    `connect-src ${connectSources.join(' ')}`,
    `frame-src ${frameSources.join(' ')}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ]
    .join('; ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/**
 * Static, request-independent security headers.
 *
 * Content-Security-Policy is intentionally NOT included here — it depends on
 * a per-request nonce and is set by `proxy.ts` via `buildCSPHeaderValue`.
 * `next.config.mjs`'s `headers()` only runs once at build time and can't see
 * a request, so it can never emit a valid nonce-based CSP.
 */
export function getProdSecurityHeaders() {
  return [
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()',
    },
    {
      // 2 years, all subdomains, eligible for the HSTS preload list.
      // https://hstspreload.org/
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
      key: 'Cross-Origin-Opener-Policy',
      value: 'same-origin',
    },
    {
      key: 'Cross-Origin-Resource-Policy',
      value: 'same-origin',
    },
  ]
}
