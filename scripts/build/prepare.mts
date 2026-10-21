import { pathExists, printResult, writeJson, type AuditMessage } from '../shared/toolkit.mts'
import { writeRouteInventory } from '../shared/route-inventory.mts'

const messages: AuditMessage[] = []

for (const required of ['app', 'components', 'config', 'content', 'lib', 'public']) {
  if (!pathExists(required)) messages.push({ level: 'issue', message: `Missing required directory: ${required}` })
}

writeJson('.next-build-manifest.json', {
  preparedAt: new Date().toISOString(),
  version: 1,
})

// The production proxy rejects unknown dynamic-content URLs using this table.
// It is generated here, before `next build`, so the proxy bundle never has to
// read content/ at runtime.
try {
  const inventory = await writeRouteInventory()
  const total = inventory.dynamicRoutes.reduce((sum, route) => sum + route.paths.length, 0)
  console.log(
    `Route inventory: ${inventory.staticPaths.length} static paths, ${inventory.dynamicRoutes.length} dynamic patterns, ${total} content paths.`,
  )
} catch (error) {
  messages.push({
    level: 'issue',
    message: `Route inventory generation failed: ${error instanceof Error ? error.message : String(error)}`,
  })
}

printResult('Build prepare', messages)
