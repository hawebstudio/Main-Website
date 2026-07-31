import { markdownTable, readContentEntries, writeText } from '../shared/toolkit.ts'

const rows = [['Content', 'GitHub URL']]
for (const entry of await readContentEntries()) {
  const publicLinks = (entry.data.publicLinks as Array<{ url: string }>) ?? []
  for (const link of publicLinks) {
    if (link.url.includes('github.com')) rows.push([entry.title, link.url])
  }
}

writeText('reports/github.md', `# GitHub Report\n\n${markdownTable(rows)}\n`)
console.log(`Generated reports/github.md with ${rows.length - 1} GitHub link(s).`)