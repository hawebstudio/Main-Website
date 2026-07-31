import { markdownTable, pathExists, readText, writeText } from '../shared/toolkit.mts'

const rows = [
  ['Check', 'Status'],
  ['Bundle report', pathExists('reports/bundle-analysis.md') ? 'available' : 'missing'],
  ['Web vitals tracker', readText('lib/analytics/web-vitals.mts').length > 0 ? 'available' : 'missing'],
  ['Next build output', pathExists('.next') ? 'available' : 'missing'],
]

writeText('reports/performance.md', `# Performance Report\n\n${markdownTable(rows)}\n`)
console.log('Generated reports/performance.md.')
