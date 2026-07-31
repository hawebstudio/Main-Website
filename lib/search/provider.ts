import { buildSearchDocuments } from './builder'
import { searchDocuments } from './query'
import type { SearchDocument, SearchProvider, SearchProviderConfig, SearchQueryOptions, SearchResult } from './types'

type FlexSearchDocumentConstructor = new (options: Record<string, unknown>) => {
  add: (document: SearchDocument) => void
  search: (options: Record<string, unknown>) => unknown
}

async function loadFlexSearchDocument(): Promise<FlexSearchDocumentConstructor | null> {
  try {
    const importer = new Function('specifier', 'return import(specifier)') as (
      specifier: string,
    ) => Promise<{ Document?: FlexSearchDocumentConstructor }>
    const module = await importer('flexsearch')
    return module.Document ?? null
  } catch {
    return null
  }
}

function localProvider(documents: SearchDocument[]): SearchProvider {
  return {
    type: 'local',
    async search(query: string, options: SearchQueryOptions = {}) {
      return searchDocuments(documents, query, options)
    },
    async getBySlug(slug, type) {
      return documents.find((document) => document.slug === slug && (!type || document.type === type)) ?? null
    },
  }
}

async function flexSearchResults(
  documents: SearchDocument[],
  query: string,
  options: SearchQueryOptions = {},
): Promise<SearchResult[]> {
  const Document = await loadFlexSearchDocument()
  if (!Document) return searchDocuments(documents, query, options)

  const index = new Document({
    document: {
      id: 'id',
      store: true,
      index: [
        { field: 'title', tokenize: 'forward' },
        { field: 'description', tokenize: 'forward' },
        { field: 'content', tokenize: 'forward' },
        { field: 'tags', tokenize: 'forward' },
        { field: 'keywords', tokenize: 'forward' },
      ],
      tag: [{ field: 'type' }, { field: 'category' }, { field: 'tags' }],
    },
  })

  for (const document of documents) index.add(document)

  const raw = index.search({
    query,
    suggest: options.suggest ?? true,
    enrich: true,
    merge: true,
    limit: options.limit,
  }) as Array<{ doc?: SearchDocument }>

  const matchedDocuments = raw.map((entry) => entry.doc).filter((document): document is SearchDocument => Boolean(document))
  return searchDocuments(matchedDocuments.length ? matchedDocuments : documents, query, options)
}

export function createSearchProvider(config: SearchProviderConfig = {}): SearchProvider {
  const documents = buildSearchDocuments(config.documents ?? [])

  if (config.type && config.type !== 'flexsearch' && config.type !== 'local') {
    return localProvider(documents)
  }

  return {
    type: config.type ?? 'flexsearch',
    async search(query: string, options: SearchQueryOptions = {}) {
      return flexSearchResults(documents, query, options)
    },
    async getBySlug(slug, type) {
      return documents.find((document) => document.slug === slug && (!type || document.type === type)) ?? null
    },
  }
}
