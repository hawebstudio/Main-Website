import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { readAllContentEntries } from '../scripts/shared/toolkit.mts'
import { buildRouteInventory, INVENTORY_PATH } from '../scripts/shared/route-inventory.mts'

test('the committed inventory matches what the sources generate', async () => {
  const generated = await buildRouteInventory()
  const committed = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'))

  // Fails when content or routes change without regenerating the table the
  // production proxy uses — the drift that 404s live pages instead of ghosts.
  assert.deepEqual(
    committed,
    JSON.parse(JSON.stringify(generated)),
    `${INVENTORY_PATH} is stale: run "pnpm build:prepare" and commit the result.`,
  )
})

test('generation is deterministic', async () => {
  const first = JSON.stringify(await buildRouteInventory())
  const second = JSON.stringify(await buildRouteInventory())

  assert.equal(first, second)
})

test('every content route the site serves is in the inventory', async () => {
  const inventory = await buildRouteInventory()
  const known = new Set([...inventory.staticPaths, ...inventory.dynamicRoutes.flatMap((route) => route.paths)])

  for (const entry of await readAllContentEntries()) {
    assert.ok(known.has(entry.url), `${entry.url} is not in the inventory, so the proxy would 404 it`)
  }
})

test('no dynamic pattern is empty', async () => {
  const inventory = await buildRouteInventory()

  for (const route of inventory.dynamicRoutes) {
    assert.ok(route.paths.length > 0, `${route.pattern} has no paths`)
  }
})
