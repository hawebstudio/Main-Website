import { extractHeadings, markdownTable, readContentEntries, writeText } from '../shared/toolkit.ts'

const rows = [['File', 'Headings']]
for (const entry of await readContentEntries()) {
  rows.push([entry.relativePath, String(extractHeadings(entry.content).length)])
}

writeText('reports/toc-report.md', `# Table of Contents Report\n\n${markdownTable(rows)}\n`)
console.log(`Generated reports/toc-report.md for ${rows.length - 1} file(s).`)
