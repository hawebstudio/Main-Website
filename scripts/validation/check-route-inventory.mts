import { spawnSync } from 'node:child_process'
import { isPublished, resolveStatus } from '../../lib/content/status.ts'
import { printResult, readJson, script, type AuditMessage } from '../shared/toolkit.mts'
import { buildRouteInventory, INVENTORY_PATH, type RouteInventory } from '../shared/route-inventory.mts'

/**
 * Guards the two ways the build-time route inventory can silently stop matching
 * the running application (step-17o findings D-2 and D-7).
 *
 * 1. The inventory decides which URLs the production proxy 404s. It must use
 *    the same publish predicate as the content layer; an independent copy would
 *    drift without any HTTP symptom in the current checkout.
 * 2. The inventory is derived from git/MDX sources. With a CMS provider
 *    configured, those sources are no longer what the site serves, so the
 *    inventory must refuse to be built rather than emit a wrong route table.
 */

type StatusFields = Parameters<typeof isPublished>[0]

const PREDICATE_CASES: Array<[StatusFields, boolean, string]> = [
  [{}, true, 'no status field'],
  [{ draft: false }, true, 'legacy draft flag false'],
  [{ status: 'published' }, true, 'status published'],
  [{ draft: true }, false, 'legacy draft flag true'],
  [{ status: 'draft' }, false, 'status draft'],
  [{ status: 'review' }, false, 'status review'],
  [{ status: 'archived' }, false, 'status archived'],
  [{ status: 'published', draft: true }, true, 'status wins over the legacy flag'],
  [{ status: 1 } as unknown as StatusFields, false, 'malformed status is not published'],
]

script('Route inventory check', async () => {
  const messages: AuditMessage[] = []

  for (const [fields, expected, label] of PREDICATE_CASES) {
    const actual = isPublished(fields)
    if (actual !== expected) {
      messages.push({
        level: 'issue',
        message: `publish predicate (${label}): expected isPublished=${expected}, got ${actual} (resolveStatus=${resolveStatus(fields)}).`,
      })
    }
  }

  const committed = readJson<RouteInventory>(INVENTORY_PATH)
  const generated = await buildRouteInventory()
  if (JSON.stringify(generated) !== JSON.stringify(committed)) {
    messages.push({
      level: 'issue',
      message: `${INVENTORY_PATH} does not match what the git sources generate. Run "pnpm build:prepare" and commit the result.`,
    })
  }

  // A CMS provider must stop the build before it writes anything.
  const unsupported = spawnSync(process.execPath, ['scripts/build/generate-route-inventory.mts'], {
    env: { ...process.env, CONTENT_PROVIDER: 'sanity' },
    encoding: 'utf8',
  })
  if (unsupported.status === 0) {
    messages.push({
      level: 'issue',
      message: 'CONTENT_PROVIDER=sanity did not fail inventory generation — a CMS-backed site would 404 its own pages.',
    })
  }
  if (!/cannot be represented by the route inventory/.test(unsupported.stderr ?? '')) {
    messages.push({
      level: 'issue',
      message: 'CONTENT_PROVIDER=sanity failed without the provider diagnostic (it may be failing for an unrelated reason).',
    })
  }
  if (JSON.stringify(readJson<RouteInventory>(INVENTORY_PATH)) !== JSON.stringify(committed)) {
    messages.push({ level: 'issue', message: 'The unsupported-provider run modified the inventory before failing.' })
  }

  printResult('Route inventory check', messages)
})
