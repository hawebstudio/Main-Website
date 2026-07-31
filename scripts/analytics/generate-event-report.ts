import { markdownTable, readText, writeText } from '../shared/toolkit.ts'

const source = readText('lib/analytics/events.ts')
const rows = [['Event or helper', 'Source']]
for (const match of source.matchAll(/export\s+(?:const|function)\s+([a-zA-Z0-9_]+)/g)) {
  rows.push([match[1], 'lib/analytics/events.ts'])
}

writeText('reports/analytics-events.md', `# Analytics Event Report\n\n${markdownTable(rows)}\n`)
console.log(`Generated reports/analytics-events.md with ${rows.length - 1} exported event helper(s).`)
