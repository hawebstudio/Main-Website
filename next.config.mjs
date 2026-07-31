import { getProdSecurityHeaders } from './lib/security/next-config.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    // HSTS and friends must never be sent over the dev server's plain-HTTP
    // localhost: the browser would pin "always use HTTPS" for that host for
    // up to 2 years, so every future `http://localhost:3000` request gets
    // silently upgraded to `https://` by the browser itself and fails to
    // connect (dev server has no TLS) — this is what causes Chrome's
    // CHROME_INTERSTITIAL_ERROR / "can't reach this page" in dev and in
    // tools like Lighthouse that drive real Chrome against localhost.
    if (process.env.NODE_ENV !== 'production') return []

    return [
      {
        source: '/(.*)',
        headers: getProdSecurityHeaders(),
      },
    ]
  },
  async rewrites() {
    const key = process.env.INDEXNOW_KEY
    if (!key) return []

    return [
      {
        source: `/${key}.txt`,
        destination: '/api/indexnow-key',
      },
    ]
  },
}

export default nextConfig
