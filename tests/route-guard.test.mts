import assert from 'node:assert/strict'
import test from 'node:test'
import inventory from '../lib/routing/route-inventory.generated.json' with { type: 'json' }
import { isUnknownContentPath } from '../lib/routing/content-path-guard.ts'

function ghostPath(pattern: string): string {
  return pattern.replace(/\[[^\]]+]/g, 'c3p-ghost')
}

test('every content URL the inventory lists is served', () => {
  for (const route of inventory.dynamicRoutes) {
    for (const path of route.paths) {
      assert.equal(isUnknownContentPath(path), false, `${path} is in the inventory but the guard rejects it`)
    }
  }
})

test('an unknown slug is rejected on every dynamic pattern', () => {
  for (const route of inventory.dynamicRoutes) {
    const ghost = ghostPath(route.pattern)
    assert.equal(isUnknownContentPath(ghost), true, `${ghost} matches ${route.pattern} and is unknown, so it must be rejected`)
  }
})

test('static siblings win over a dynamic shape', () => {
  // `/work/client` sits under `/work/[slug]` and `/services/families` under
  // `/services/[slug]`; rejecting them would 404 live pages.
  for (const path of inventory.staticPaths) {
    assert.equal(isUnknownContentPath(path), false, `${path} is a static route but the guard rejects it`)
  }
})

test('paths that match no dynamic shape are left to Next', () => {
  assert.equal(isUnknownContentPath('/this-route-does-not-exist'), false)
  assert.equal(isUnknownContentPath('/about'), false)
})

test('percent-encoded content URLs are decoded before lookup', () => {
  const sample = inventory.dynamicRoutes.find((route) => route.paths.length > 0)
  assert.ok(sample)

  const encoded = `/${sample.paths[0]
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.replace(/-/g, '%2D'))
    .join('/')}`

  assert.equal(isUnknownContentPath(encoded), false)
})

test('a trailing slash does not turn a live page into a ghost', () => {
  const sample = inventory.dynamicRoutes.find((route) => route.paths.length > 0)
  assert.ok(sample)

  assert.equal(isUnknownContentPath(`${sample.paths[0]}/`), false)
})
