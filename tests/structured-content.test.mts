import assert from 'node:assert/strict'
import test from 'node:test'
import ts from 'typescript'
import {
  collectObjectLiterals,
  evaluate,
  readStructuredContentEntries,
} from '../scripts/shared/structured-content.mts'

function parseExpression(source: string): ts.Expression {
  const file = ts.createSourceFile('probe.ts', `const value = ${source}`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const statement = file.statements[0]
  assert.ok(ts.isVariableStatement(statement))
  const declaration = statement.declarationList.declarations[0]
  assert.ok(declaration.initializer)
  return declaration.initializer
}

test('evaluates literal values, including nested objects and arrays', () => {
  assert.deepEqual(evaluate(parseExpression(`{ a: 'x', b: 2, c: true, d: null, e: ['y', { f: false }] }`)), {
    a: 'x',
    b: 2,
    c: true,
    d: null,
    e: ['y', { f: false }],
  })
})

test('skips computed values instead of guessing at them', () => {
  assert.deepEqual(evaluate(parseExpression(`{ keep: 'yes', drop: someIdentifier }`)), { keep: 'yes' })
})

test('reads only the requested export', () => {
  const source = [
    "const unrelated = [{ slug: 'a' }]",
    "export const wanted: Item[] = [{ slug: 'b' }, { slug: 'c' }]",
  ].join('\n')

  const objects = collectObjectLiterals(source, 'probe.ts', 'wanted')
  assert.equal(objects.length, 2)
  assert.deepEqual(objects.map((object) => evaluate(object)), [{ slug: 'b' }, { slug: 'c' }])
})

test('every TypeScript collection entry is addressable and titled', () => {
  const entries = readStructuredContentEntries()
  const byCollection: Record<string, number> = {}
  for (const entry of entries) byCollection[entry.collection] = (byCollection[entry.collection] ?? 0) + 1

  assert.deepEqual(byCollection, { services: 31, 'service-families': 6, work: 5 })

  for (const entry of entries) {
    assert.equal(entry.source, 'typescript')
    assert.match(entry.url, /\/(services|services\/families|work)\//)
    assert.ok(entry.slug, `missing slug in ${entry.relativePath}`)
    assert.ok(entry.title && entry.title !== entry.slug, `missing title for ${entry.url}`)
    assert.ok(entry.description, `missing description for ${entry.url}`)
    assert.ok(entry.content.length > 0, `missing prose for ${entry.url}`)
  }
})

test('prose excludes structural identifiers and links', () => {
  const service = readStructuredContentEntries().find((entry) => entry.url === '/services/technical-seo-setup')
  assert.ok(service)

  assert.ok(!service.content.split('\n\n').includes(service.slug), 'slug should not be part of the prose')
  assert.ok(!service.content.includes('/services/'), 'links should stay out of the prose')
})
