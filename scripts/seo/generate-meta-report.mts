import { markdownTable, readContentEntries, writeText } from '../shared/toolkit.mts'

interface FrontmatterData {
  seo?: { canonical?: string }
}

const rows = [['URL', 'Title length', 'Description length', 'Canonical']]
for (const entry of await readContentEntries()) {
  const data = entry.data as FrontmatterData
  rows.push([
    entry.url,
    String(entry.title.length),
    String(entry.description.length),
    String(data.seo?.canonical ?? entry.url),
  ])
}

writeText('reports/seo-meta.md', `# SEO Metadata Report\n\n${markdownTable(rows)}\n`)
console.log(`Generated reports/seo-meta.md with ${rows.length - 1} row(s).`)