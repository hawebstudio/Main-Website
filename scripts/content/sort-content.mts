import { markdownTable, readContentEntries, writeText } from '../shared/toolkit.ts'

const rows = [['Collection', 'Slug', 'Date']]
for (const entry of (await readContentEntries()).sort((a, b) => String(b.data.publishedAt ?? '').localeCompare(String(a.data.publishedAt ?? '')))) {
  rows.push([entry.collection, entry.slug, String(entry.data.publishedAt ?? entry.data.updatedAt ?? '')])
}

writeText('reports/content-order.md', `# Content Order Report\n\n${markdownTable(rows)}\n`)
console.log(`Generated reports/content-order.md for ${rows.length - 1} item(s).`)
