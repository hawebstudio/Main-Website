import type { SearchDocument } from '../types'

export function serializeSearchDocuments(documents: SearchDocument[]): string {
  return JSON.stringify(documents)
}

export function deserializeSearchDocuments(value: string): SearchDocument[] {
  const parsed = JSON.parse(value)
  return Array.isArray(parsed) ? (parsed as SearchDocument[]) : []
}
