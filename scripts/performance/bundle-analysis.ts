import fs from 'node:fs'
import { markdownTable, pathExists, resolveRoot, walkFiles, writeText } from '../shared/toolkit.ts'

const rows = [['File', 'KB']]
if (pathExists('.next/static')) {
  for (const file of walkFiles('.next/static', ['.js', '.css'])) {
    rows.push([file, (fs.statSync(resolveRoot(file)).size / 1024).toFixed(1)])
  }
}

writeText('reports/bundle-analysis.md', `# Bundle Analysis\n\n${rows.length === 1 ? 'Run `pnpm build` before this report for compiled assets.\n' : markdownTable(rows)}\n`)
console.log(`Generated reports/bundle-analysis.md with ${rows.length - 1} asset row(s).`)
