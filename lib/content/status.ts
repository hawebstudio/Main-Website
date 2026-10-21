import type { ContentStatus } from './types'

/**
 * Single source of truth for content visibility.
 *
 * `lib/content/source.ts` (runtime) and `scripts/shared/route-inventory.mts`
 * (build-time route inventory) both import this. The inventory decides which
 * URLs the production proxy 404s, so it must agree with the runtime filter
 * exactly — a copy of this logic that drifts would 404 a page that exists, or
 * keep serving a draft.
 *
 * Kept dependency-free and type-only so the `.mts` build scripts can import it
 * directly under Node's type stripping.
 */

/** Resolve effective content status from status field or legacy draft flag */
export function resolveStatus(entry: { status?: ContentStatus; draft?: boolean }): ContentStatus {
  if (entry.status) return entry.status
  if (entry.draft) return 'draft'
  return 'published'
}

/** Returns true if entry should be visible in production */
export function isPublished(entry: { status?: ContentStatus; draft?: boolean }): boolean {
  return resolveStatus(entry) === 'published'
}
