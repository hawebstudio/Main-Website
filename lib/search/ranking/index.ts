import { searchFieldWeights } from '../constants'
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

export function sortSearchResults<T extends { score: number }>(results: T[]): T[] {
  return [...results].sort((left, right) => right.score - left.score)
}
