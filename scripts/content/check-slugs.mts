import { printResult, readContentEntries, slugify, type AuditMessage } from '../shared/toolkit.mts'

const messages: AuditMessage[] = []
const seen = new Map<string, string>()

for (const entry of await readContentEntries()) {
  const key = `${entry.collection}:${entry.slug}`
  const expected = slugify(entry.slug)

  if (entry.slug !== expected) messages.push({ level: 'issue', message: `${entry.relativePath}: slug should be ${expected}` })
  if (seen.has(key)) messages.push({ level: 'issue', message: `${entry.relativePath}: duplicate slug also used in ${seen.get(key)}` })
  else seen.set(key, entry.relativePath)
}

printResult('Content slug check', messages)
