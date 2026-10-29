import matter from 'gray-matter'
import { printResult, readText, script, walkFiles, type AuditMessage } from '../shared/toolkit.mts'

/**
 * Root layout metadata (app/layout.tsx) applies the template `%s — HA Web Studio`
 * to every child page title. A content `seo.title` that already ends with the
 * brand therefore renders the brand twice in the HTML <title> — e.g.
 * "Website Planning & Strategy Services | HA Web Studio — HA Web Studio".
 *
 * Phase C3.2 found 30 such pages. This check fails if the pattern returns.
 */

const BRAND = 'HA Web Studio'
const TEMPLATE_SUFFIX = ` — ${BRAND}`
const TRAILING_BRAND = new RegExp(`[\\s|—–-]*${BRAND}\\s*$`)

/**
 * Reads every `seo.title` from a content source. Service/family entries are
 * plain TypeScript literals, so a light `seo: { ... }` block scan keeps this
 * check dependency-free and avoids importing app code (which relies on the
 * `@/` alias).
 */
function readTitles(relativePath: string): string[] {
  if (relativePath.endsWith('.mdx')) {
    const parsed = matter(readText(relativePath))
    const title = parsed.data?.seo?.title
    return typeof title === 'string' ? [title] : []
  }

  const source = readText(relativePath)
  const titles: string[] = []

  for (const block of source.matchAll(/seo\s*:\s*\{([\s\S]*?)\}/g)) {
    const match = /title\s*:\s*(?:"([^"]*)"|'([^']*)')/.exec(block[1])
    const title = match?.[1] ?? match?.[2]
    if (title) titles.push(title)
  }

  return titles
}

void script('SEO title brand check', () => {
  const messages: AuditMessage[] = []

  const sources = [
    'content/services/index.ts',
    ...walkFiles('content/services/families', ['.ts']),
    ...walkFiles('content/case-studies', ['.mdx']),
    ...walkFiles('content/technologies', ['.mdx']),
    ...walkFiles('content/insights', ['.mdx']),
    ...walkFiles('content/problems', ['.mdx']),
  ]

  for (const relativePath of sources) {
    for (const title of readTitles(relativePath)) {
      if (TRAILING_BRAND.test(title)) {
        messages.push({
          level: 'issue',
          message: `${relativePath}: seo.title "${title}" already ends with the brand, but app/layout.tsx appends "${TEMPLATE_SUFFIX}" — rendered <title> would be "${title}${TEMPLATE_SUFFIX}". Remove the trailing brand segment from the content title.`,
        })
      }
    }
  }

  printResult('SEO title brand check', messages)
})
