import inventory from './route-inventory.generated.json' with { type: 'json' }

/**
 * Production guard for unknown dynamic-content URLs.
 *
 * Every dynamic content route renders behind `loading.tsx` boundaries (plus the
 * root `app/loading.tsx`), so Next streams a 200 shell before the page body
 * resolves. A `notFound()` inside the page can then only replace the content,
 * never the status — the response stays `200` with `index, follow`, which is a
 * cacheable soft 404. `dynamicParams = false` does not prevent this in a
 * production build because the root layout forces dynamic rendering for the
 * per-request CSP nonce.
 *
 * The proxy is therefore the only place that can reject the URL before the body
 * streams. It needs to know which URLs exist without reading `content/` (the
 * proxy bundle is never given those files by the build's tracing), so it reads
 * this inventory instead — generated from the same content modules by
 * `scripts/shared/route-inventory.mts` during `pnpm build:prepare`.
 */

interface RouteInventory {
  unmatchedPath: string
  staticPaths: string[]
  dynamicRoutes: Array<{ pattern: string; paths: string[] }>
}

const data = inventory as RouteInventory

/** A path that no route matches, so Next renders the 404 boundary with a real 404 status. */
export const UNMATCHED_CONTENT_PATH = data.unmatchedPath

const staticPaths = new Set(data.staticPaths)
const contentPaths = new Set(data.dynamicRoutes.flatMap((route) => route.paths))
const dynamicShapes = data.dynamicRoutes.map((route) => route.pattern.split('/').filter(Boolean))

function segmentsOf(pathname: string): string[] {
  return pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment)
      } catch {
        return segment
      }
    })
}

function matchesShape(shape: string[], segments: string[]): boolean {
  if (shape.length !== segments.length) return false
  return shape.every((segment, index) => segment.startsWith('[') || segment === segments[index])
}

/**
 * True only when the path matches a dynamic content route's shape and is not a
 * known content page. Static siblings (`/work/client`, `/services/families`)
 * win over the shape match, so they are never rejected, and paths that match no
 * route shape are left to Next's own routing.
 */
export function isUnknownContentPath(pathname: string): boolean {
  const segments = segmentsOf(pathname)
  if (!segments.length) return false

  const concretePath = `/${segments.join('/')}`
  if (staticPaths.has(concretePath)) return false
  if (!dynamicShapes.some((shape) => matchesShape(shape, segments))) return false
  return !contentPaths.has(concretePath)
}
