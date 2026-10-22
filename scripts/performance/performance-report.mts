import { markdownTable, pathExists, readText, writeText } from '../shared/toolkit.mts'

const rows = [
  ['Check', 'Status'],
  ['Bundle report', pathExists('reports/bundle-analysis.md') ? 'available' : 'missing'],
  // Was lib/analytics/web-vitals.mts (nonexistent), which made this report throw.
  ['Web vitals tracker', readText('lib/monitoring/web-vitals.ts').length > 0 ? 'available' : 'missing'],
  ['Budget baseline', pathExists('docs/website-improvement/performance-baseline.json') ? 'recorded' : 'not recorded'],
  ['Next build output', pathExists('.next') ? 'available' : 'missing'],
]

writeText('reports/performance.md', `# Performance Report\n\n${markdownTable(rows)}\n`)
console.log('Generated reports/performance.md.')
