import { pathExists, printResult, writeJson, type AuditMessage } from '../shared/toolkit.mts'

const messages: AuditMessage[] = []

for (const required of ['app', 'components', 'config', 'content', 'lib', 'public']) {
  if (!pathExists(required)) messages.push({ level: 'issue', message: `Missing required directory: ${required}` })
}

writeJson('.next-build-manifest.json', {
  preparedAt: new Date().toISOString(),
  version: 1,
})

printResult('Build prepare', messages)
