import { getProdSecurityHeaders } from './lib/security/next-config.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // `lib/content/providers/git.ts` reads content/**/*.mdx via a dynamic
  // `import('node:fs')` at request time (now that app/layout.tsx forces
  // dynamic rendering, this runs on every request, not just at build).
  // Vercel's file tracer only follows static imports, so it can't see
  // these fs reads and would otherwise exclude content/ from the deployed
  // function — leaving getAll() reading an empty/missing directory in
  // production. This makes the inclusion explicit.
  outputFileTracingIncludes: {
    '/**': ['./content/**/*.mdx'],
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
  async redirects() {
    return [
      // --- Pre-existing entries (kept as-is) ---
      { source: '/services/families/website-development', destination: '/services/families/websites', permanent: true },
      { source: '/services/families/ecommerce-development', destination: '/services/families/ecommerce', permanent: true },
      { source: '/services/families/seo-search-visibility', destination: '/services/families/seo-search', permanent: true },
      { source: '/services/families/local-business-visibility', destination: '/services/families/growth', permanent: true },
      { source: '/services/families/analytics-growth', destination: '/services/families/analytics', permanent: true },
      { source: '/services/families/website-performance', destination: '/services/families/performance-security', permanent: true },
      { source: '/services/families/website-maintenance', destination: '/services/families/maintenance', permanent: true },
      { source: '/services/families/business-websites', destination: '/services/families/websites', permanent: true },
      { source: '/services/families/google-business', destination: '/services/families/growth', permanent: true },
      { source: '/services/families/custom-web-applications', destination: '/services/families/development', permanent: true },
      { source: '/services/families/website-management', destination: '/services/families/maintenance', permanent: true },
    ]
  },
}

export default nextConfig
