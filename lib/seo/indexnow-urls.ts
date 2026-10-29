/**
 * URL selection for IndexNow submissions.
 *
 * Deliberately pure and free of `@/` path aliases: the API route imports it,
 * and the repeatable validator (`scripts/seo/validate-search-infrastructure.mts`)
 * imports it too — a plain Node process cannot resolve Next.js path aliases,
 * so anything shared with a script has to live in a dependency-free module.
 *
 * Two IndexNow rules are enforced here because both are easy to violate from an
 * event-driven publisher:
 *
 * 1. Every URL in a submission must belong to the submitted host, so URLs for
 *    another origin are dropped rather than sent.
 * 2. A URL must not appear twice in one payload. `/page` and `/page/` are the
 *    same resource, so they collapse to a single notification — which is also
 *    what makes repeated publish events for one page idempotent in effect.
 */

/** IndexNow rejects batches larger than this. */
export const INDEXNOW_MAX_URLS = 10_000

function parseAbsoluteUrl(value: unknown): URL | null {
  if (typeof value !== 'string' || value.length === 0) return null
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed : null
  } catch {
    return null
  }
}

export function indexNowOrigin(value: string): string | null {
  return parseAbsoluteUrl(value)?.origin ?? null
}

/**
 * Identity of the resource a URL points at: scheme+host, path without a
 * trailing slash, and any query string. Two URLs with the same identity are
 * one resource and must be notified once.
 */
export function indexNowUrlKey(value: string): string | null {
  const parsed = parseAbsoluteUrl(value)
  if (!parsed) return null
  return `${parsed.origin}${parsed.pathname.replace(/\/+$/, '')}${parsed.search}`
}

/**
 * Returns the submittable URLs, preserving input order and the caller's own
 * URL form, with duplicates and off-host or malformed URLs removed. An empty
 * result means "nothing eligible" — never "submit everything".
 */
export function normalizeIndexNowUrls(urls: Iterable<unknown>, allowedOrigin: string): string[] {
  const origin = indexNowOrigin(allowedOrigin)
  if (!origin) return []

  const seen = new Set<string>()
  const list: string[] = []

  for (const candidate of urls) {
    const parsed = parseAbsoluteUrl(candidate)
    if (!parsed || parsed.origin !== origin) continue
    const key = `${parsed.origin}${parsed.pathname.replace(/\/+$/, '')}${parsed.search}`
    if (seen.has(key)) continue
    seen.add(key)
    list.push(candidate as string)
  }

  return list
}
