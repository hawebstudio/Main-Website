import { printResult, readJson, readText, walkFiles, type AuditMessage } from '../shared/toolkit.ts'

const packageJson = readJson<{ dependencies?: Record<string, string>; devDependencies?: Record<string, string>; scripts?: Record<string, string> }>('package.json')
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies }
const messages: AuditMessage[] = []
const used = new Set<string>()

for (const file of [...walkFiles('app', ['.ts', '.tsx']), ...walkFiles('components', ['.ts', '.tsx']), ...walkFiles('lib', ['.ts', '.tsx'])]) {
  for (const match of readText(file).matchAll(/from\s+['"]([^'"]+)['"]|import\(['"]([^'"]+)['"]\)/g)) {
    const name = match[1] ?? match[2]
    if (!name || name.startsWith('.') || name.startsWith('@/') || name.startsWith('node:')) continue
    used.add(name.startsWith('@') ? name.split('/').slice(0, 2).join('/') : name.split('/')[0])
  }
}

for (const required of ['dev', 'build', 'start', 'type-check']) {
  if (!packageJson.scripts?.[required]) messages.push({ level: 'issue', message: `Missing package script: ${required}` })
}

for (const name of Object.keys(dependencies)) {
  if (name.startsWith('@types/') || ['typescript', 'tailwindcss', 'postcss', 'glob', 'shadcn'].includes(name)) continue
  if (!used.has(name)) messages.push({ level: 'warning', message: `Potentially unused dependency: ${name}` })
}

printResult('Dependency validation', messages)
