import { runCommand } from '../shared/toolkit.mts'

const scripts: Array<[string, string[]]> = [
  ['node', ['scripts/content/validate-frontmatter.mts']],
  ['node', ['scripts/content/check-slugs.mts']],
  ['node', ['scripts/content/check-duplicates.mts']],
]

for (const [command, args] of scripts) {
  const status = runCommand(command, args)
  if (status !== 0) process.exit(status)
}

console.log('Content validation passed.')
