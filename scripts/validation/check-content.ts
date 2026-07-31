import { runCommand } from '../shared/toolkit.ts'

const scripts: Array<[string, string[]]> = [
  ['node', ['scripts/content/validate-frontmatter.ts']],
  ['node', ['scripts/content/check-slugs.ts']],
  ['node', ['scripts/content/check-duplicates.ts']],
]

for (const [command, args] of scripts) {
  const status = runCommand(command, args)
  if (status !== 0) process.exit(status)
}

console.log('Content validation passed.')
