import { markdownTable, readContentEntries, writeText } from '../shared/toolkit.ts'

const rows = [['URL', 'Schema candidates']]
for (const entry of await readContentEntries()) {
  const candidates = ['BreadcrumbList']
  if (entry.collection === 'services') candidates.push('Service', 'FAQPage')
  if (entry.collection === 'insights') candidates.push('Article')
  if (entry.collection === 'case-studies' || entry.collection === 'work') candidates.push('CreativeWork')
  const faqs = (entry.data.faqs as unknown[]) ?? []
  if (faqs.length) candidates.push('FAQPage')
  rows.push([entry.url, [...new Set(candidates)].join(', ')])
}

writeText('reports/schema.md', `# Schema Report\n\n${markdownTable(rows)}\n`)
console.log(`Generated reports/schema.md with ${rows.length - 1} row(s).`)