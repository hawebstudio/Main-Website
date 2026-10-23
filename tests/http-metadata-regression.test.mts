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