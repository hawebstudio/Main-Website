import { absoluteUrl, pathExists, printResult, readContentEntries, type AuditMessage } from '../shared/toolkit.mts'

interface FrontmatterData {
  seo?: { canonical?: string }
}

const messages: AuditMessage[] = []
const titles = new Map<string, string>()
const descriptions = new Map<string, string>()

for (const required of ['app/sitemap.mts', 'app/robots.mts', 'app/rss.xml/route.mts', 'app/atom.xml/route.mts', 'public/llms.txt']) {
  if (!pathExists(required)) messages.push({ level: 'issue', message: `Missing SEO source or asset: ${required}` })
}

for (const entry of await readContentEntries()) {
  if (!entry.title) messages.push({ level: 'issue', message: `${entry.relativePath}: missing SEO title` })
  if (!entry.description) messages.push({ level: 'issue', message: `${entry.relativePath}: missing SEO description` })
  if (entry.title.length > 70) messages.push({ level: 'warning', message: `${entry.url}: title is ${entry.title.length} characters` })
  if (entry.description.length > 170) messages.push({ level: 'warning', message: `${entry.url}: description is ${entry.description.length} characters` })
  const data = entry.data as FrontmatterData
  if (data.seo?.canonical && !data.seo.canonical.startsWith('http')) {
    messages.push({ level: 'issue', message: `${entry.url}: canonical must be absolute (${absoluteUrl(entry.url)} expected)` })
  }
  track(titles, entry.title, entry.url, 'title')
  track(descriptions, entry.description, entry.url, 'description')
}

printResult('SEO check', messages)

function track(map: Map<string, string>, value: string, url: string, label: string) {
  if (!value) return
  const existing = map.get(value)
  if (existing) messages.push({ level: 'issue', message: `${url}: duplicate ${label} also used by ${existing}` })
  else map.set(value, url)
}