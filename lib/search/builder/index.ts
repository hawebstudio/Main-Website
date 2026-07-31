import { normalizeSearchDocument } from '../documents'
import type { SearchDocument } from '../types'

export function buildSearchDocuments(documents: SearchDocument[]): SearchDocument[] {
  return documents.map(normalizeSearchDocument)
}

export function searchableText(document: SearchDocument): string {
  return [
    document.title,
    document.description,
    document.content,
    document.section,
    document.category,
    ...(document.tags ?? []),
    ...(document.keywords ?? []),
  ]
    .filter(Boolean)
    .join(' ')
}
