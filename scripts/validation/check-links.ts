import { extractLinks, printResult, readContentEntries, staticRoutes, type AuditMessage } from '../shared/toolkit.ts'

const messages: AuditMessage[] = []
const entries = await readContentEntries()
const knownRoutes = new Set<string>([...staticRoutes, ...entries.map((entry) => entry.url)])

for (const entry of entries) {
  for (const link of extractLinks(`${entry.content}\n${JSON.stringify(entry.data)}`)) {
    if (link.startsWith('http://')) messages.push({ level: 'warning', message: `${entry.url}: non-HTTPS external link ${link}` })
    if (!link.startsWith('/')) continue
    const clean = link.split('#')[0].replace(/\/$/, '') || '/'
    if (knownRoutes.has(clean)) continue
    if (knownRoutes.has(clean.replace(/\/$/, ''))) continue
    messages.push({ level: 'issue', message: `${entry.url}: internal link does not match a known route: ${link}` })
  }
}

printResult('Link validation', messages)
