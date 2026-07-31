import type { SearchDocument, SearchDocumentType } from '../types'

export function createSearchDocument(input: {
  id?: string
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
}): SearchDocument {
  return {
    id: input.id ?? `${input.type}:${input.slug}`,
    tags: [],
    keywords: [],
    ...input,
  }
}

export function normalizeSearchDocument(document: SearchDocument): SearchDocument {
  return {
    ...document,
    title: document.title.trim(),
    description: document.description?.trim(),
    content: document.content?.trim(),
    tags: [...new Set(document.tags ?? [])],
    keywords: [...new Set(document.keywords ?? [])],
  }
}
