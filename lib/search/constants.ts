import type { SearchDocumentType } from './types'

export const searchFieldWeights = {
  title: 10,
  description: 6,
  content: 4,
  tags: 3,
  keywords: 3,
  featured: 2,
} as const

/**
 * Tie-breaker for results with identical textual relevance.
 *
 * Most pages match a head term in all three text fields and land on the same
 * score, so without this the order falls back to however the index happened to
 * be built. For equal relevance a service page answers a commercial query better
 * than an insight, so the order runs from offering to evidence to explanation.
 */
export const searchTypePriority: Record<SearchDocumentType, number> = {
  service: 0,
  'service-family': 1,
  work: 2,
  'case-study': 3,
  technology: 4,
  problem: 5,
  insight: 6,
}

export const defaultSearchLimit = 10
