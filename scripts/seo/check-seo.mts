import {
  absoluteUrl,
  pathExists,
  printResult,
  readContentEntries,
  type AuditMessage,
} from '../shared/toolkit.mts'
import { readStructuredSeoEntries } from '../shared/structured-seo.mts'

interface FrontmatterData {
  seo?: { canonical?: string }
}

/**
 * Files the SEO surface actually depends on. These were previously listed as
 * `.mts`, which never existed (the app uses `.ts` route modules), so the check
 * failed on every run while still reporting success for content that it never
 * inspected. Keep this list in sync with the real route filenames.
 */
const requiredSeoSources = [
  'app/sitemap.ts',
  'app/robots.ts',
  'app/rss.xml/route.ts',
  'app/atom.xml/route.ts',
  'public/llms.txt',
]

const TITLE_WARN_LENGTH = 70
const DESCRIPTION_WARN_LENGTH = 170

const messages: AuditMessage[] = []
const titles = new Map<string, string>()
const descriptions = new Map<string, string>()

for (const required of requiredSeoSources) {
  if (!pathExists(required)) messages.push({ level: 'issue', message: `Missing SEO source or asset: ${required}` })
}

for (const entry of await readContentEntries()) {
  auditEntry(entry.url, entry.relativePath, entry.title, entry.description)
  const data = entry.data as FrontmatterData
  if (data.seo?.canonical && !data.seo.canonical.startsWith('http')) {
    messages.push({ level: 'issue', message: `${entry.url}: canonical must be absolute (${absoluteUrl(entry.url)} expected)` })
  }
}

// Services, service families and work live in TypeScript modules rather than
// MDX, so they are not part of `readContentEntries()`. Without this loop the
// checker silently skipped every service and family title.
for (const entry of readStructuredSeoEntries()) {
  auditEntry(entry.url, entry.relativePath, entry.title, entry.description)
}

printResult('SEO check', messages)

function auditEntry(url: string, relativePath: string, title: string, description: string) {
  if (!title) messages.push({ level: 'issue', message: `${relativePath} (${url}): missing SEO title` })
  if (!description) messages.push({ level: 'issue', message: `${relativePath} (${url}): missing SEO description` })
  if (title.length > TITLE_WARN_LENGTH) {
    messages.push({ level: 'warning', message: `${url}: title is ${title.length} characters` })
  }
  if (description.length > DESCRIPTION_WARN_LENGTH) {
    messages.push({ level: 'warning', message: `${url}: description is ${description.length} characters` })
  }
  track(titles, title, url, 'title')
  track(descriptions, description, url, 'description')
}

function track(map: Map<string, string>, value: string, url: string, label: string) {
  if (!value) return
  const existing = map.get(value)
  if (existing) messages.push({ level: 'issue', message: `${url}: duplicate ${label} also used by ${existing}` })
  else map.set(value, url)
}
