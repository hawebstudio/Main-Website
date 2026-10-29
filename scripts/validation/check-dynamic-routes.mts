import { printResult, readJson, readText, script, walkFiles, type AuditMessage } from '../shared/toolkit.mts'
import { buildRouteInventory, INVENTORY_PATH, UNMATCHED_CONTENT_PATH, type RouteInventory } from '../shared/route-inventory.mts'

/**
 * Phase C3.6 / C3.8 regression check.
 *
 * Background: every dynamic content route renders behind `loading.tsx`
 * boundaries (and the root `app/loading.tsx`), so Next streams a 200 shell
 * before a render-time `notFound()` can set a status. In a production build that
 * makes unknown slugs cacheable soft 404s (`200`, `index, follow`), because the
 * root layout forces dynamic rendering for the per-request CSP nonce and
 * `dynamicParams = false` is therefore not enforced.
 *
 * The production fix is the proxy guard in `proxy.ts`, which rejects unknown
 * dynamic URLs before the body streams using the generated route inventory.
 * This check enforces everything that can be verified without a server:
 *
 * 1. Every dynamic page still declares `dynamicParams = false` (this is what
 *    keeps the development server honest).
 * 2. The inventory exists, is in sync with the route tree and the content
 *    modules, and covers every dynamic route.
 * 3. The rewrite target used to render a real 404 is not a routable page.
 *
 * Actual HTTP status codes are exercised by `validate:http` against a running
 * production server, which is the only sufficient evidence for the status.
 */

const REQUIRED_FLAG = /export\s+const\s+dynamicParams\s*=\s*false\b/

script('Dynamic route param check', async () => {
  const messages: AuditMessage[] = []

  const pages = walkFiles('app', ['.tsx']).filter((file) => file.endsWith('/page.tsx') && file.includes('['))

  if (!pages.length) {
    messages.push({ level: 'issue', message: 'No dynamic page files found under app/ — refusing to pass silently.' })
  }

  for (const relativePath of pages) {
    const source = readText(relativePath)
    const hasStaticParams =
      /export\s+async\s+function\s+generateStaticParams\b|export\s+function\s+generateStaticParams\b/.test(source)
    const hasFlag = REQUIRED_FLAG.test(source)

    if (!hasStaticParams) {
      messages.push({
        level: 'warning',
        message: `${relativePath}: dynamic segment without generateStaticParams — verify its HTTP 404 manually.`,
      })
      continue
    }

    if (!hasFlag) {
      messages.push({
        level: 'issue',
        message: `${relativePath}: generateStaticParams is declared but "export const dynamicParams = false" is missing — the development server would serve unknown params. Add the flag.`,
      })
      continue
    }

    if (/export\s+const\s+dynamicParams\s*=\s*true\b/.test(source)) {
      messages.push({ level: 'issue', message: `${relativePath}: dynamicParams must be false, not true.` })
    }
  }

  let inventory: RouteInventory | null = null
  try {
    inventory = readJson<RouteInventory>(INVENTORY_PATH)
  } catch {
    messages.push({
      level: 'issue',
      message: `${INVENTORY_PATH} is missing — the production proxy cannot reject unknown content URLs. Run "pnpm build:prepare".`,
    })
  }

  if (inventory) {
    const expected = await buildRouteInventory()
    if (JSON.stringify(expected) !== JSON.stringify(inventory)) {
      messages.push({
        level: 'issue',
        message: `${INVENTORY_PATH} is stale or was hand-edited: it no longer matches the route tree and content modules. Run "pnpm build:prepare" and commit the result.`,
      })
    }

    const covered = new Set(inventory.dynamicRoutes.map((route) => route.pattern))
    const patterns = new Set(
      pages.map((file) =>
        `/${file
          .replace(/^app\//, '')
          .replace(/\/page\.tsx$/, '')
          .split('/')
          .filter((segment) => segment && !segment.startsWith('('))
          .join('/')}`,
      ),
    )

    for (const pattern of patterns) {
      if (!covered.has(pattern)) {
        messages.push({
          level: 'issue',
          message: `${pattern}: dynamic route is not covered by the generated route inventory, so unknown params would still soft-404 in production.`,
        })
      }
    }

    if (inventory.staticPaths.includes(UNMATCHED_CONTENT_PATH)) {
      messages.push({
        level: 'issue',
        message: `${UNMATCHED_CONTENT_PATH} is reserved for not-found rewrites but is now a routable page.`,
      })
    }

    for (const route of inventory.dynamicRoutes) {
      if (!route.paths.length) {
        messages.push({ level: 'issue', message: `${route.pattern}: no valid paths in the inventory.` })
      }
    }
  }

  printResult('Dynamic route param check', messages)
})
