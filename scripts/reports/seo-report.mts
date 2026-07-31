import { runCommand } from '../shared/toolkit.mts'

for (const args of [
  ['scripts/seo/generate-meta-report.mts'],
  ['scripts/seo/generate-schema-report.mts'],
  ['scripts/seo/generate-breadcrumbs.mts'],
]) {
  const status = runCommand('node', args)
  if (status !== 0) process.exit(status)
}

console.log('Generated SEO reports.')
