import { tokenizeQuery } from '../ranking'

export function highlightText(value: string, query: string): string {
  return tokenizeQuery(query).reduce((result, term) => {
    const pattern = new RegExp(`(${escapeRegExp(term)})`, 'gi')
    return result.replace(pattern, '<mark>$1</mark>')
  }, value)
}

export function createSnippet(value: string, query: string, length = 160): string {
  const text = value.trim()
  if (text.length <= length) return highlightText(text, query)
  return `${highlightText(text.slice(0, length).trim(), query)}...`
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
