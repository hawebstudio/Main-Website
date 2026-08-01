import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { buildCSPHeaderValue } from '@/lib/security/next-config.mjs'
// import { authMiddleware } from '@/lib/auth'

/**
 * Generates a fresh CSP nonce per request and forwards it two ways:
 *
 * 1. As the `x-nonce` request header, so server components (e.g. layout.tsx,
 *    components/seo/json-ld.tsx) can read it via `headers()` and stamp it on
 *    the inline `<script>` tags they render.
 * 2. As the `Content-Security-Policy` response header, so the browser only
 *    executes inline scripts carrying that same nonce.
 *
 * See https://nextjs.org/docs/app/guides/content-security-policy
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = buildCSPHeaderValue(nonce, process.env.NODE_ENV !== 'production')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', cspHeader)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  response.headers.set('Content-Security-Policy', cspHeader)

  // return authMiddleware(request)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (own CORS/response handling)
     * - _next/static, _next/image (framework internals, no scripts to nonce)
     * - static files with a file extension (images, fonts, txt, xml, etc.)
     * - prefetch requests (next/link hover-prefetch, router prefetch): these
     *   run in the background against a route the user isn't looking at
     *   yet, so minting a nonce for them serves no purpose. Worse, if they
     *   DO run through here, the prefetched payload gets baked with its own
     *   nonce, and since JsonLd renders fresh inline <script> tags on almost
     *   every page, a later client-side (soft) navigation into that
     *   prefetched content swaps in scripts nonced for a *different*
     *   request than the one governing the currently active document's CSP
     *   header — every inline script on the destination page then violates
     *   CSP even though the code correctly threads the nonce through.
     */
    {
      source: '/((?!api/|_next/static|_next/image|.*\\..*).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
