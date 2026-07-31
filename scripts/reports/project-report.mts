import { markdownTable, pathExists, readJson, writeText } from '../shared/toolkit.mts'

const packageJson = readJson<{ name: string; version: string; scripts: Record<string, string> }>('package.json')
const rows = [
  ['Item', 'Value'],
  ['Package', packageJson.name],
  ['Version', packageJson.version],
  ['App Router', pathExists('app') ? 'yes' : 'no'],
  ['Content directory', pathExists('content') ? 'yes' : 'no'],
  ['Scripts registered', String(Object.keys(packageJson.scripts).length)],
]

writeText('reports/project.md', `# Project Report\n\n${markdownTable(rows)}\n`)
console.log('Generated reports/project.md.')
