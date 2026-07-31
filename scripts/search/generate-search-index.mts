import { readContentEntries, stripMarkdown, writeJson } from '../shared/toolkit.mts'

const entries = (await readContentEntries()).map((entry) => ({
  id: `${entry.collection}:${entry.slug}`,
  slug: entry.slug,
  type: collectionType(entry.collection),
  title: entry.title,
  description: entry.description,
  url: entry.url,
  category: String(entry.data.category ?? entry.collection),
  keywords: [
    entry.collection,
    ...((entry.data.tags as Array<string | { name?: string; slug?: string }>) ?? []).map((tag) => typeof tag === 'string' ? tag : tag.name ?? tag.slug),
    ...(entry.data.technologies as string[] ?? []),
  ].filter(Boolean),
  content: stripMarkdown(entry.content).replace(/\s+/g, ' ').slice(0, 2000),
}))

writeJson('public/search/search-index.json', entries)
console.log(`Generated search index with ${entries.length} item(s).`)

function collectionType(collection: string) {
  if (collection === 'services') return 'service'
  if (collection === 'work') return 'work'
  if (collection === 'case-studies') return 'case-study'
  if (collection === 'technologies') return 'technology'
  if (collection === 'problems') return 'problem'
  return 'insight'
}
