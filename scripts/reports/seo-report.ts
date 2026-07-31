import { runCommand } from '../shared/toolkit.ts'

for (const args of [
  ['scripts/seo/generate-meta-report.ts'],
  ['scripts/seo/generate-schema-report.ts'],
  ['scripts/seo/generate-breadcrumbs.ts'],
]) {
  const status = runCommand('node', args)
  if (status !== 0) process.exit(status)
}

console.log('Generated SEO reports.')
