import assert from 'node:assert/strict'
import test from 'node:test'
import fs from 'node:fs'
import nextConfig from '../next.config.mjs'
import { isUnknownContentPath } from '../lib/routing/content-path-guard.ts'

// ---------------------------------------------------------------------------
// Helpers — parse source files via text patterns to avoid @/ alias issues
// in the bare `node --test` runner.
// ---------------------------------------------------------------------------

function readSource(rel: string): string {
  return fs.readFileSync(rel, 'utf8')
}

// The authoritative 6-pillar slug set. Any change to the service catalogue
// requires updating this constant *and* the corresponding data files.
const CONSOLIDATED_PILLARS = new Set([
  'website-development',
  'ecommerce',
  'search-discoverability',
  'automation-integrations',
  'custom-web-applications',
  'website-optimization-care',
])

// ---------------------------------------------------------------------------

test('dynamic ghost paths are rejected across all affected route families', () => {
  const ghostRoutes = [
    '/case-studies/c3p-ghost',
    '/insights/c3p-ghost',
    '/locations/c3p-ghost',
    '/problems/c3p-ghost',
    '/services/c3p-ghost',
    '/services/families/c3p-ghost',
    '/technologies/c3p-ghost',
    '/technologies/c3p-ghost/c3p-ghost',
    '/work/c3p-ghost',
  ]

  for (const ghost of ghostRoutes) {
    assert.equal(
      isUnknownContentPath(ghost),
      true,
      `Expected ${ghost} to be recognized as an unknown dynamic content path by the guard`,
    )
  }
})

test('root layout does not leak default canonical URL to not-found pages', () => {
  const layoutSource = readSource('app/layout.tsx')

  assert.doesNotMatch(
    layoutSource,
    /alternates:\s*\{[^}]*canonical:\s*siteConfig\.url/,
    'app/layout.tsx must not define canonical in alternates, which leaks to 404 pages',
  )
})

test('app/not-found.tsx exports metadata with Page Not Found title and noindex', () => {
  const notFoundSource = readSource('app/not-found.tsx')

  assert.match(notFoundSource, /export\s+const\s+metadata/, 'app/not-found.tsx must export metadata')
  assert.match(notFoundSource, /title:\s*['"]Page Not Found['"]/, 'not-found metadata must specify Page Not Found title')
  assert.match(notFoundSource, /index:\s*false/, 'not-found metadata must specify index: false')
  assert.doesNotMatch(notFoundSource, /canonical/, 'not-found metadata must not define a canonical URL')
})

test('metadata builder always sets a canonical URL in alternates', () => {
  const builderSource = readSource('lib/seo/metadata-builder.ts')
  assert.match(builderSource, /alternates/, 'metadata-builder.ts must define alternates')
  assert.match(builderSource, /canonical/, 'metadata-builder.ts must set canonical in alternates')
})

test('/services has exactly one primary H1 and complete family icon mappings', () => {
  const pageSource = readSource('app/(marketing)/services/page.tsx')
  const heroSource = readSource('components/sections/services/services-hero.tsx')
  const dataSource = readSource('components/sections/services/services-data.ts')

  // No duplicate H1 in page file — hero owns the H1
  assert.doesNotMatch(pageSource, /<h1|level=\{1\}/, 'services/page.tsx should not define a duplicate H1')
  assert.match(heroSource, /<Heading\s+level=\{1\}/, 'ServicesHero must contain a primary <Heading level={1}>')

  // familyIcons block must contain every consolidated pillar
  const familyIconsBlock = dataSource.match(/export const familyIcons\s*=\s*\{([\s\S]*?)\}\s*as const/)
  assert.ok(familyIconsBlock, 'services-data.ts must export familyIcons as const object')
  const iconsBlock = familyIconsBlock![1]
  for (const slug of CONSOLIDATED_PILLARS) {
    // Match either quoted 'slug': or unquoted slug:
    const slugPattern = new RegExp(`(?:['"]${slug}['"]|${slug.replace(/-/g, '[-]')}|${slug})\\s*:`)
    assert.match(
      iconsBlock,
      slugPattern,
      `familyIcons must include an entry for consolidated pillar "${slug}"`,
    )
  }

  // offeringGroups familySlugs must only reference consolidated pillars
  const offeringGroupsBlock = dataSource.match(/export const offeringGroups\s*=\s*\[([\s\S]*?)\]\s*(?:as const|;)/)
  if (offeringGroupsBlock) {
    const groupsContent = offeringGroupsBlock[1]
    const familySlugArrays = [...groupsContent.matchAll(/familySlugs\s*:\s*\[([^\]]+)\]/g)]
    for (const match of familySlugArrays) {
      const slugsInGroup = [...match[1].matchAll(/['"]([a-z][a-z0-9-]+)['"]/g)].map((m) => m[1])
      for (const slug of slugsInGroup) {
        assert.ok(
          CONSOLIDATED_PILLARS.has(slug),
          `offeringGroups references unknown consolidated pillar slug "${slug}"`,
        )
      }
    }
  }

  // discoveryPaths hrefs must point to consolidated pillars
  const discoveryBlock = dataSource.match(/export const discoveryPaths\s*=\s*\[([\s\S]*?)\]\s*(?:as const|;)/)
  if (discoveryBlock) {
    const hrefs = [...discoveryBlock[1].matchAll(/href\s*:\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
    for (const href of hrefs) {
      if (href.startsWith('/services/families/')) {
        const slug = href.replace('/services/families/', '')
        assert.ok(
          CONSOLIDATED_PILLARS.has(slug),
          `discoveryPaths href "${href}" points to unknown consolidated pillar "${slug}"`,
        )
      }
    }
  }

  // services/page.tsx must import Globe2 as the defensive icon fallback
  assert.match(pageSource, /Globe2/, 'services/page.tsx must import Globe2 as defensive fallback icon')
})

test('permanent redirects for legacy service families point to valid destinations', async () => {
  const redirects = (await nextConfig.redirects?.()) ?? []
  assert.ok(redirects.length > 0, 'next.config.mjs must define redirects')

  for (const redirect of redirects) {
    assert.equal(redirect.permanent, true, `Redirect ${redirect.source} must be permanent (308)`)
    if (redirect.destination.startsWith('/services/families/')) {
      const destSlug = redirect.destination.replace('/services/families/', '')
      assert.ok(
        CONSOLIDATED_PILLARS.has(destSlug),
        `Redirect ${redirect.source} -> ${redirect.destination} points to unknown pillar "${destSlug}"`,
      )
    }
  }
})
test('package.json build script is decoupled from IndexNow', () => {
  const pkg = JSON.parse(readSource('package.json'))
  assert.ok(pkg.scripts, 'package.json must contain scripts')
  assert.doesNotMatch(
    pkg.scripts.build,
    /indexnow/i,
    'pnpm build must not invoke IndexNow automatically',
  )
  assert.equal(
    pkg.scripts.build,
    'pnpm build:prepare && next build && pnpm build:verify',
    'pnpm build must execute prepare, next build, and verify without external side effects',
  )
})

test('explicit manual release:indexnow script is registered and points to submit-indexnow', () => {
  const pkg = JSON.parse(readSource('package.json'))
  assert.equal(
    pkg.scripts['release:indexnow'],
    'pnpm seo:indexnow',
    'release:indexnow must be explicitly available and call pnpm seo:indexnow',
  )
  assert.match(
    pkg.scripts['seo:indexnow'],
    /scripts\/seo\/submit-indexnow\.mts/,
    'seo:indexnow must point to scripts/seo/submit-indexnow.mts',
  )
})

test('submit-indexnow.mts retains strict guards for INDEXNOW_ENABLED and INDEXNOW_KEY', () => {
  const scriptSource = readSource('scripts/seo/submit-indexnow.mts')
  assert.match(
    scriptSource,
    /process\.env\.INDEXNOW_ENABLED\s*!==\s*["']true["']/,
    'submit-indexnow.mts must guard on strict INDEXNOW_ENABLED === "true"',
  )
  assert.match(
    scriptSource,
    /if\s*\(!key\)/,
    'submit-indexnow.mts must guard on non-empty INDEXNOW_KEY',
  )
})

test('package.json validate and audit scripts are decoupled from IndexNow', () => {
  const pkg = JSON.parse(readSource('package.json'))
  assert.doesNotMatch(
    pkg.scripts.validate,
    /indexnow/i,
    'pnpm validate must not invoke IndexNow',
  )
  assert.equal(
    pkg.scripts.audit,
    'pnpm validate',
    'pnpm audit must delegate to pnpm validate',
  )
  assert.equal(
    pkg.scripts['release:indexnow'],
    'pnpm seo:indexnow',
    'release:indexnow must remain explicitly registered',
  )
})


test('retired /socials route permanently redirects to /about and is removed from footer', async () => {
  const redirects = (await nextConfig.redirects?.()) ?? []
  const socialsRedirect = redirects.find((r) => r.source === '/socials')
  assert.ok(socialsRedirect, 'next.config.mjs must define redirect for /socials')
  assert.equal(socialsRedirect.destination, '/about', '/socials must redirect to /about')
  assert.equal(socialsRedirect.permanent, true, '/socials redirect must be permanent (308)')

  // Verify route file is removed
  assert.equal(
    fs.existsSync('app/(marketing)/socials/page.tsx'),
    false,
    'app/(marketing)/socials/page.tsx must not exist',
  )

  // Verify site-footer does not contain link to /socials
  const footerSource = readSource('components/navigation/site-footer.tsx')
  assert.doesNotMatch(footerSource, /href={routes\.socials\(\)}/, 'site-footer.tsx must not link to retired socials route')
  assert.doesNotMatch(footerSource, />All socials</, 'site-footer.tsx must not display "All socials"')
})
