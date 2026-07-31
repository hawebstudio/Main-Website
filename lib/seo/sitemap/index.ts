export interface SeoSitemapEntry {
  url: string
  lastModified?: string | Date
  priority?: number
}

export function createSeoSitemapEntry(entry: SeoSitemapEntry): SeoSitemapEntry {
  return entry
}
