import { markdownTable, readContentEntries, writeText } from '../shared/toolkit.ts'

const rows = [['URL', 'Title length', 'Description length', 'Canonical']]
for (const entry of await readContentEntries()) {
  rows.push([
    entry.url,
    String(entry.title.length),
    String(entry.description.length),
    String(entry.data.seo?.canonical ?? entry.url),
  ])
}

writeText('reports/seo-meta.md', `# SEO Metadata Report\n\n${markdownTable(rows)}\n`)
console.log(`Generated reports/seo-meta.md with ${rows.length - 1} row(s).`)
