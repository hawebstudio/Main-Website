import './support/resolve-hooks.mts'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import type { SearchDocument, SearchDocumentType } from '../lib/search/types.ts'

// Dynamic: the resolver hooks above must be registered before these resolve.
const { sortSearchResults } = await import('../lib/search/ranking/index.ts')
const { searchTypePriority } = await import('../lib/search/constants.ts')

function doc(type: SearchDocumentType, title: string, url = `/x/${title}`): SearchDocument {
  return { id: `${type}:${title}`, slug: title, type, title, url }
}

test('a higher score wins regardless of type', () => {
  const sorted = sortSearchResults([
    { document: doc('insight', 'Insight'), score: 30 },
    { document: doc('service', 'Service'), score: 20 },
  ])

  assert.equal(sorted[0].document?.type, 'insight')
})

test('at equal relevance a service outranks an insight', () => {
  const sorted = sortSearchResults([
    { document: doc('insight', 'Business Website Costs'), score: 20 },
    { document: doc('service', 'Business Website Development'), score: 20 },
    { document: doc('service-family', 'Website Development'), score: 20 },
  ])

  assert.deepEqual(
    sorted.map((result) => result.document?.type),
    ['service', 'service-family', 'insight'],
  )
})

test('the order does not depend on how results were collected', () => {
  const results = [
    { document: doc('insight', 'Website Security Basics'), score: 20 },
    { document: doc('problem', 'Need a Website'), score: 20 },
    { document: doc('work', 'MS Signature Scents'), score: 20 },
    { document: doc('case-study', 'Website Performance'), score: 20 },
  ]

  const forward = sortSearchResults(results)
  const backward = sortSearchResults([...results].reverse())

  assert.deepEqual(
    forward.map((result) => result.document?.url),
    backward.map((result) => result.document?.url),
  )
})

test('equal score and type falls back to alphabetical titles', () => {
  const sorted = sortSearchResults([
    { document: doc('insight', 'Website Performance'), score: 20 },
    { document: doc('insight', 'Website Costs'), score: 20 },
    { document: doc('insight', 'Website Basics'), score: 20 },
  ])

  assert.deepEqual(
    sorted.map((result) => result.document?.title),
    ['Website Basics', 'Website Costs', 'Website Performance'],
  )
})

test('every document type in the generated index has a ranking priority', () => {
  const index = JSON.parse(fs.readFileSync('public/search/search-index.json', 'utf8')) as Array<{ type: string }>
  const types = [...new Set(index.map((entry) => entry.type))].sort()

  // A type without a priority sorts to the end and, before this existed, had no
  // label either — the result rendered with an empty badge.
  assert.deepEqual(types, Object.keys(searchTypePriority).sort())
})
