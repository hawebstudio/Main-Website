export type SearchProviderType = 'flexsearch' | 'local' | 'algolia' | 'meilisearch' | 'typesense' | 'payload'
export type SearchDocumentType = 'service' | 'work' | 'case-study' | 'problem' | 'insight' | 'technology'

export interface SearchDocument {
  id: string
  slug: string
  type: SearchDocumentType
  title: string
  description?: string
  url: string
  content?: string
  section?: string
  category?: string
  tags?: string[]
  keywords?: string[]
  featured?: boolean
}

export interface SearchFilters {
  type?: SearchDocumentType | SearchDocumentType[]
  category?: string
  service?: string
  technology?: string
  tag?: string
}

export interface SearchResult {
  document: SearchDocument
  score: number
  highlights: string[]
  snippet?: string
}

export interface SearchQueryOptions {
  limit?: number
  filters?: SearchFilters
  suggest?: boolean
}

export interface SearchProvider {
  type: SearchProviderType
  search(query: string, options?: SearchQueryOptions): Promise<SearchResult[]>
  getBySlug?: (slug: string, type?: SearchDocumentType) => Promise<SearchDocument | null>
}

export interface SearchProviderConfig {
  type?: SearchProviderType
  documents?: SearchDocument[]
}
