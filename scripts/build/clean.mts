import fs from 'node:fs'
import path from 'node:path'
import { root } from '../shared/toolkit.mts'

const targets = [
  '.next-build-manifest.json',
  'public/search/search-index.json',
  'public/search/documents.json',
  'public/search/keywords.json',
]

for (const target of targets) {
  const fullPath = path.resolve(root, target)
  if (!fullPath.startsWith(root)) throw new Error(`Refusing to remove outside workspace: ${fullPath}`)
  if (fs.existsSync(fullPath)) fs.rmSync(fullPath, { force: true })
}

console.log(`Build clean removed ${targets.length} generated file target(s).`)
