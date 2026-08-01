import { markdownTable, readContentEntries, writeText } from '../shared/toolkit.mts'

const entries = await readContentEntries()
const rows = [['File', 'Related candidates']]

for (const entry of entries) {
  const tags = new Set<string>(
    (entry.data.tags as Array<string | { slug: string }>)?.map((tag) => typeof tag === 'string' ? tag : tag.slug) ?? []
  )
  const related = entries
    .filter((candidate) => candidate.relativePath !== entry.relativePath)
    .filter((candidate) => 
      (candidate.data.tags as Array<string | { slug: string }>)?.some((tag) => tags.has(typeof tag === 'string' ? tag : tag.slug))
    )
    .slice(0, 5)
    .map((candidate) => candidate.slug)
  rows.push([entry.relativePath, related.join(', ') || 'none'])
}

writeText('reports/related-content.md', `# Related Content Report\n\n${markdownTable(rows)}\n`)
console.log(`Generated reports/related-content.md for ${entries.length} file(s).`)
