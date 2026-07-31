import { pathExists, printResult, readJson, type AuditMessage } from '../shared/toolkit.ts'

const messages: AuditMessage[] = []

if (!pathExists('public/search/search-index.json')) {
  messages.push({ level: 'issue', message: 'Missing public/search/search-index.json. Run `pnpm search:build`.' })
} else {
  const index = readJson<Record<string, unknown>[]>('public/search/search-index.json')
  if (!Array.isArray(index)) messages.push({ level: 'issue', message: 'Search index must be an array.' })
  for (const [indexNumber, entry] of index.entries()) {
    for (const field of ['id', 'slug', 'type', 'title', 'description', 'url', 'category']) {
      if (!entry[field]) messages.push({ level: 'issue', message: `Search entry ${indexNumber} missing ${field}.` })
    }
  }
}

printResult('Search validation', messages)
