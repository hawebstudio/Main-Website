import { searchFieldWeights, searchTypePriority } from '../constants'
import type { SearchDocument } from '../types'

export function tokenizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

export function rankSearchDocument(document: SearchDocument, query: string): number {
  const terms = tokenizeQuery(query)
  if (!terms.length) return 0

  const title = document.title.toLowerCase()
  const description = document.description?.toLowerCase() ?? ''
  const content = document.content?.toLowerCase() ?? ''
  const tags = (document.tags ?? []).join(' ').toLowerCase()
  const keywords = (document.keywords ?? []).join(' ').toLowerCase()

  const score = terms.reduce((total, term) => {
    let termScore = 0
    if (title.includes(term)) termScore += searchFieldWeights.title
    if (description.includes(term)) termScore += searchFieldWeights.description
    if (content.includes(term)) termScore += searchFieldWeights.content
    if (tags.includes(term)) termScore += searchFieldWeights.tags
    if (keywords.includes(term)) termScore += searchFieldWeights.keywords
    return total + termScore
  }, 0)

  return document.featured && score > 0 ? score + searchFieldWeights.featured : score
}

export function sortSearchResults<T extends { score: number; document?: SearchDocument }>(results: T[]): T[] {
  return [...results].sort((left, right) => {
    if (right.score !== left.score) return right.score - left.score

    const byType = priorityOf(left) - priorityOf(right)
    if (byType !== 0) return byType

    const byTitle = (left.document?.title ?? '').localeCompare(right.document?.title ?? '')
    if (byTitle !== 0) return byTitle

    return (left.document?.url ?? '').localeCompare(right.document?.url ?? '')
  })
}

function priorityOf(result: { document?: SearchDocument }): number {
  if (!result.document) return Number.MAX_SAFE_INTEGER
  return searchTypePriority[result.document.type] ?? Number.MAX_SAFE_INTEGER
}
