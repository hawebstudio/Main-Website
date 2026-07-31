import { markdownTable, readContentEntries, wordCount, writeText } from '../shared/toolkit.ts'

const entries = await readContentEntries()
const byCollection = new Map<string, number>()
for (const entry of entries) byCollection.set(entry.collection, (byCollection.get(entry.collection) ?? 0) + 1)

const rows = [['Collection', 'Items']]
for (const [collection, count] of [...byCollection.entries()].sort()) rows.push([collection, String(count)])

writeText(
  'reports/content.md',
  `# Content Report\n\nTotal content items: ${entries.length}\n\n${markdownTable(rows)}\n\nTotal indexed words: ${entries.reduce((sum, entry) => sum + wordCount(entry.content), 0)}\n`,
)
console.log('Generated reports/content.md.')
