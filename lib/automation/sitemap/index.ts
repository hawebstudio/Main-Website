import type { SitemapEntry } from '../types'

export function createSitemapEntry(entry: SitemapEntry): SitemapEntry {
  return entry
}

export function sortSitemapEntries(entries: SitemapEntry[]): SitemapEntry[] {
  return [...entries].sort((a, b) => a.url.localeCompare(b.url))
}
