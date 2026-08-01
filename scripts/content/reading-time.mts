import { markdownTable, readContentEntries, readingTimeMinutes, writeText } from '../shared/toolkit.mts'

const rows = [['File', 'Words', 'Reading time']]
for (const entry of (await readContentEntries()).filter((item) => item.collection === 'insights')) {
  const words = entry.content.trim().split(/\s+/).filter(Boolean).length
  rows.push([entry.relativePath, String(words), `${readingTimeMinutes(entry.content)} min`])
}

writeText('reports/reading-time.md', `# Reading Time Report\n\n${markdownTable(rows)}\n`)
console.log(`Generated reports/reading-time.md with ${rows.length - 1} insight(s).`)
