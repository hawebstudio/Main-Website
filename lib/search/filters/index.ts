import type { SearchDocument, SearchFilters, SearchDocumentType } from '../types'

function matchesType(documentType: SearchDocumentType, filter?: SearchDocumentType | SearchDocumentType[]) {
  if (!filter) return true
  return Array.isArray(filter) ? filter.includes(documentType) : documentType === filter
}

export function matchesSearchFilters(document: SearchDocument, filters: SearchFilters = {}): boolean {
  if (!matchesType(document.type, filters.type)) return false
  if (filters.category && document.category !== filters.category) return false
  if (filters.service && !(document.tags ?? []).includes(filters.service)) return false
  if (filters.technology && !(document.tags ?? []).includes(filters.technology)) return false
  if (filters.tag && !(document.tags ?? []).includes(filters.tag)) return false
  return true
}

export function filterSearchDocuments(documents: SearchDocument[], filters?: SearchFilters): SearchDocument[] {
  return filters ? documents.filter((document) => matchesSearchFilters(document, filters)) : documents
}
