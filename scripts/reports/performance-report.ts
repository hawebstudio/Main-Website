import { runCommand } from '../shared/toolkit.ts'

for (const args of [['scripts/performance/bundle-analysis.ts'], ['scripts/performance/performance-report.ts']]) {
  const status = runCommand('node', args)
  if (status !== 0) process.exit(status)
}

console.log('Generated performance reports.')
