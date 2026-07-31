import type { SearchDocument } from '../types'

export function createSearchSuggestions(documents: SearchDocument[], query: string, limit = 5): string[] {
  const normalized = query.toLowerCase().trim()
  if (!normalized) return []

  const candidates = documents.flatMap((document) => [
    document.title,
    ...(document.tags ?? []),
    ...(document.keywords ?? []),
  ])

  return [...new Set(candidates)]
    .filter((candidate) => candidate.toLowerCase().includes(normalized))
    .slice(0, limit)
}
