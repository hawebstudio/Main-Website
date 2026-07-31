import { defaultSearchLimit } from '../constants'
import { filterSearchDocuments } from '../filters'
import { createSnippet } from '../highlight'
import { rankSearchDocument, sortSearchResults } from '../ranking'
import type { SearchDocument, SearchProvider, SearchQueryOptions, SearchResult, SearchDocumentType } from '../types'

export function searchDocuments(
  documents: SearchDocument[],
  query: string,
  options: SearchQueryOptions = {},
): SearchResult[] {
  const filtered = filterSearchDocuments(documents, options.filters)
  const results: SearchResult[] = []

  for (const document of filtered) {
    const score = rankSearchDocument(document, query)
    if (score > 0) {
      results.push({
        document,
        score,
        highlights: [document.title, document.description ?? ''].filter(Boolean),
        snippet: createSnippet(document.description ?? document.content ?? document.title, query),
      })
    }
  }

  return sortSearchResults(results).slice(0, options.limit ?? defaultSearchLimit)
}

export function searchByType(provider: SearchProvider, query: string, type: SearchDocumentType, limit?: number) {
  return provider.search(query, { limit, filters: { type } })
}

export async function searchBySlug(provider: SearchProvider, slug: string, type?: SearchDocumentType) {
  return provider.getBySlug?.(slug, type) ?? null
}

export function searchEverything(provider: SearchProvider, query: string, options?: SearchQueryOptions) {
  return provider.search(query, options)
}
