import type { SearchDocument } from '../types'

const cache = new Map<string, SearchDocument[]>()

export function getCachedSearchDocuments(key: string): SearchDocument[] | undefined {
  return cache.get(key)
}

export function setCachedSearchDocuments(key: string, documents: SearchDocument[]): void {
  cache.set(key, documents)
}

export function clearSearchCache(key?: string): void {
  if (key) cache.delete(key)
  else cache.clear()
}
