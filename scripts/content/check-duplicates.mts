import { printResult, readContentEntries, type AuditMessage } from '../shared/toolkit.mts'

const messages: AuditMessage[] = []
const titles = new Map<string, string>()
const descriptions = new Map<string, string>()

for (const entry of await readContentEntries()) {
  track(titles, entry.title, entry.relativePath, 'title')
  track(descriptions, entry.description, entry.relativePath, 'description')
}

printResult('Content duplicate check', messages)

function track(map: Map<string, string>, value: string | undefined, filePath: string, label: string) {
  if (!value) return
  if (map.has(value)) messages.push({ level: 'issue', message: `${filePath}: duplicate ${label} also used in ${map.get(value)}` })
  else map.set(value, filePath)
}