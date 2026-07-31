import { runCommand } from '../shared/toolkit.mts'

for (const args of [['scripts/performance/bundle-analysis.mts'], ['scripts/performance/performance-report.mts']]) {
  const status = runCommand('node', args)
  if (status !== 0) process.exit(status)
}

console.log('Generated performance reports.')
