import { printResult, readContentEntries, wordCount, type AuditMessage } from '../shared/toolkit.ts'

const messages: AuditMessage[] = []

for (const entry of await readContentEntries()) {
  const title = entry.data.seo?.title ?? entry.data.title
  const description = entry.data.seo?.description ?? entry.data.description

  if (!title) messages.push({ level: 'issue', message: `${entry.relativePath}: missing title` })
  if (!description) messages.push({ level: 'issue', message: `${entry.relativePath}: missing description` })
  if (!entry.slug) messages.push({ level: 'issue', message: `${entry.relativePath}: missing slug` })
  if (entry.collection === 'insights' && entry.data.status === 'published' && !entry.data.author?.name) {
    messages.push({ level: 'issue', message: `${entry.relativePath}: published insight missing author` })
  }
  if (entry.collection === 'insights' && !entry.data.readingTime) {
    messages.push({ level: 'warning', message: `${entry.relativePath}: missing readingTime` })
  }
  if (wordCount(entry.content) < 250) {
    messages.push({ level: 'warning', message: `${entry.relativePath}: thin content under 250 words` })
  }
}

printResult('Content frontmatter validation', messages)
