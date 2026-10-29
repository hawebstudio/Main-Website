import { writeRouteInventory } from '../shared/route-inventory.mts'

const inventory = await writeRouteInventory()
const total = inventory.dynamicRoutes.reduce((sum, route) => sum + route.paths.length, 0)
console.log(
  `Route inventory written: ${inventory.staticPaths.length} static paths, ${inventory.dynamicRoutes.length} dynamic patterns, ${total} content paths.`,
)
