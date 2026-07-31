import { readContentEntries, siteUrl, writeText } from '../shared/toolkit.ts'

const entries = await readContentEntries()

const keySections = [
  ['Services', '/services'],
  ['Work', '/work'],
  ['Case studies', '/case-studies'],
  ['Technologies', '/technologies'],
  ['Insights', '/insights'],
  ['Problems', '/problems'],
  ['Contact', '/contact'],
] as const

const feeds = [
  ['RSS', '/rss.xml'],
  ['Atom', '/atom.xml'],
  ['Sitemap', '/sitemap.xml'],
] as const

const lines = [
  '# HA Web Studio',
  '',
  '> Web design, development, SEO, performance, ecommerce, and custom web application studio.',
  '',
  `Website: ${siteUrl}`,
  '',
  '## Key Sections',
  '',
  ...keySections.map(([label, path]) => `- [${label}](${siteUrl}${path})`),
  '',
  '## Feeds',
  '',
  ...feeds.map(([label, path]) => `- [${label}](${siteUrl}${path})`),
  '',
  '## Content',
  '',
  ...entries.map((entry) => `- [${entry.title}](${siteUrl}${entry.url}): ${entry.description}`),
  '',
  '## Usage Guidance',
  '',
  'Use canonical URLs from the sitemap. Prefer page titles, descriptions, headings, and JSON-LD',
  'entities as the source of truth when summarizing HA Web Studio content.',
]

writeText(
  'public/llms-full.txt',
  [
    ...lines,
    '',
    '## Full Summaries',
    '',
    ...entries.map((entry) => `### ${entry.title}\n\nURL: ${siteUrl}${entry.url}\n\n${entry.description}\n`),
  ].join('\n'),
)

try {
  writeText('public/llms.txt', lines.join('\n'))
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  throw new Error(`Could not write public/llms.txt. Close any process holding that file and rerun this script. Original error: ${message}`)
}

console.log(`Generated llms.txt and llms-full.txt for ${entries.length} content item(s).`)
