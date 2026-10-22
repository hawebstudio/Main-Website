import type { ContentEntry } from './toolkit.mts'
import { readStructuredContentEntries } from './structured-content.mts'

/**
 * SEO metadata for the TypeScript-defined collections (services, service
 * families, work).
 *
 * This is a narrow view over `structured-content.mts`, which parses those
 * modules because node cannot import them. It exists so the SEO checks can read
 * the same source as the pages without depending on the full entry shape.
 *
 * Field precedence matches the pages: `seo.title ?? title` and
 * `seo.description ?? description`.
 */

export interface StructuredSeoEntry {
  collection: 'services' | 'service-families' | 'work'
  relativePath: string
  slug: string
  title: string
  description: string
  url: string
}

export function readStructuredSeoEntries(): StructuredSeoEntry[] {
  return readStructuredContentEntries().map((entry: ContentEntry) => ({
    collection: entry.collection as StructuredSeoEntry['collection'],
    relativePath: entry.relativePath,
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    url: entry.url,
  }))
}
