import assert from 'node:assert/strict'
import test from 'node:test'
import { readAllContentEntries, readContentEntries, staticRoutes, type ContentEntry } from '../scripts/shared/toolkit.mts'
import { auditInternalLinks } from '../scripts/validation/link-audit.mts'

function entry(url: string, content: string, data: Record<string, unknown> = {}): ContentEntry {
  return {
    source: 'mdx',
    collection: 'case-studies',
    filePath: url,
    relativePath: url,
    slug: url.split('/').pop() ?? url,
    title: url,
    description: '',
    url,
    data,
    content,
  }
}

test('reports a link to a route the site does not serve', () => {
  const messages = auditInternalLinks([entry('/case-studies/a', 'See [it](/services/not-a-service).')], ['/services/known'])

  assert.equal(messages.filter((message) => message.level === 'issue').length, 1)
  assert.match(messages[0].message, /\/services\/not-a-service/)
})

test('accepts known routes with a fragment, a query string or a trailing slash', () => {
  const entries = [
    entry('/case-studies/a', 'Links: [x](/services/known#section) [y](/services/known?ref=1) [z](/services/known/)'),
  ]

  assert.deepEqual(auditInternalLinks(entries, ['/services/known']), [])
})

test('warns about http:// links but does not fail them', () => {
  const messages = auditInternalLinks([entry('/case-studies/a', '[x](http://example.com)')], [])

  assert.deepEqual(
    messages.map((message) => message.level),
    ['warning'],
  )
})

test('ignores mailto:, tel: and bare fragments', () => {
  const messages = auditInternalLinks([entry('/case-studies/a', '[a](mailto:x@y.z) [b](tel:+123) [c](#anchor)')], [])

  assert.deepEqual(messages, [])
})

test('validates links that live in structured data, not only in prose', () => {
  const withHref = entry('/case-studies/a', '', { cta: { label: 'Go', href: '/services/not-a-service' } })

  const messages = auditInternalLinks([withHref], ['/services/known'])

  assert.equal(messages.length, 1)
  assert.match(messages[0].message, /\/services\/not-a-service/)
})

test('the real content set is clean once every collection is a known route', async () => {
  const entries = await readAllContentEntries()
  const messages = auditInternalLinks(entries, [...staticRoutes, ...entries.map((item) => item.url)])

  // This is the regression: before the TypeScript-defined collections were read,
  // every link from a case study into a service or project was reported broken.
  assert.deepEqual(messages, [])
})

test('reading only MDX entries would hide the TypeScript collections from the audit', async () => {
  const mdx = await readContentEntries()
  const messages = auditInternalLinks(mdx, [...staticRoutes, ...mdx.map((item) => item.url)])

  // Proves the assertions above are not vacuous: with the old reader, links into
  // services and work fail. If this ever stops finding issues, the fixture has
  // drifted away from the real content and the test stopped guarding anything.
  assert.ok(messages.length > 0, 'expected the MDX-only route set to break links into services/work')
  assert.ok(messages.every((message) => message.level === 'issue'))
})
