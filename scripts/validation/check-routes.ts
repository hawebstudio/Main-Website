import { printResult, staticRoutes, walkFiles, type AuditMessage } from '../shared/toolkit.ts'

const messages: AuditMessage[] = []
const pages = new Set(
  walkFiles('app', ['.tsx', '.ts'])
    .filter((file) => /\/page\.tsx$/.test(file.replace(/\\/g, '/')))
    .map((file) => routeFromPage(file)),
)

for (const route of staticRoutes) {
  if (route === '/') continue
  if (!pages.has(route) && !route.startsWith('/work/')) {
    messages.push({ level: 'warning', message: `Static route not backed by a direct page file: ${route}` })
  }
}

printResult('Route validation', messages)

function routeFromPage(file: string): string {
  const route = file
    .replace(/^app\//, '')
    .replace(/\/page\.tsx$/, '')
    .split('/')
    .filter((part) => !part.startsWith('('))
    .join('/')
  return route ? `/${route}` : '/'
}
