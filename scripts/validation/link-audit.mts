import { extractLinks, type AuditMessage, type ContentEntry } from '../shared/toolkit.mts'

/**
 * Internal-link audit over content entries.
 *
 * Split out of `check-links.mts` so the rule can be exercised directly: a
 * validator that silently stops seeing a whole collection looks exactly like a
 * clean run, which is the failure this file now has tests for.
 *
 * `knownRoutes` must include every route the site serves, including the
 * TypeScript-defined collections — see `readAllContentEntries()`.
 */
/** A path whose last segment has an extension is a file under `public/`, not a page. */
const LOOKS_LIKE_FILE = /\.[a-z0-9]{2,5}$/i

export function auditInternalLinks(entries: ContentEntry[], knownRoutes: Iterable<string>): AuditMessage[] {
  const messages: AuditMessage[] = []
  const known = new Set(knownRoutes)

  for (const entry of entries) {
    for (const link of linksOf(entry)) {
      if (link.startsWith('http://')) {
        messages.push({ level: 'warning', message: `${entry.url}: non-HTTPS external link ${link}` })
      }
      if (!link.startsWith('/')) continue

      const clean = link.split('#')[0].split('?')[0].replace(/\/$/, '') || '/'
      // Cover images, downloads and generated JSON are served by the build, not
      // by a route, so they are not this audit's subject.
      if (LOOKS_LIKE_FILE.test(clean)) continue
      if (known.has(clean) || known.has(clean.replace(/\/$/, ''))) continue
      messages.push({ level: 'issue', message: `${entry.url}: internal link does not match a known route: ${link}` })
    }
  }

  return messages
}

/**
 * Markdown links plus every internal path stored in the entry's data.
 *
 * Data is JSON-serialized for the markdown scan, and serialized `"href": "/x"`
 * is not a markdown link — TypeScript-defined content keeps most of its links
 * in properties like `cta.href` and `relatedSolutionLinks[].href`, so those
 * paths have to be collected explicitly or the audit only ever sees prose.
 */
function linksOf(entry: ContentEntry): Set<string> {
  const links = new Set(extractLinks(`${entry.content}\n${JSON.stringify(entry.data)}`))
  for (const path of internalPaths(entry.data)) links.add(path)
  return links
}

function internalPaths(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    if (value.startsWith('/') && !value.startsWith('//')) out.push(value)
    return out
  }
  if (Array.isArray(value)) {
    for (const item of value) internalPaths(item, out)
    return out
  }
  if (typeof value === 'object' && value !== null) {
    for (const item of Object.values(value)) internalPaths(item, out)
  }
  return out
}
