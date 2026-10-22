import { printResult, readAllContentEntries, staticRoutes, type AuditMessage } from '../shared/toolkit.mts'
import { auditInternalLinks } from './link-audit.mts'

const entries = await readAllContentEntries()

// Services, service families and work are defined in TypeScript, so a reader that
// only walks MDX cannot see them — neither as link targets nor as link sources.
// `readAllContentEntries()` includes them; if it ever stops doing so, every link
// into those collections would fail and this check must not pass quietly.
const structuredEntries = entries.filter((entry) => entry.source === 'typescript')
const knownRoutes = new Set<string>([...staticRoutes, ...entries.map((entry) => entry.url)])

const messages: AuditMessage[] = auditInternalLinks(entries, knownRoutes)

if (!structuredEntries.length) {
  messages.push({
    level: 'issue',
    message: 'No TypeScript-defined content entries were read: links into services, service families and work cannot be validated',
  })
}

printResult('Link validation', messages)
