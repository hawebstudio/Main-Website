import { collectionType, readAllContentEntries, stripMarkdown, writeJson } from '../shared/toolkit.mts'

const documents = (await readAllContentEntries()).map((entry) => ({
  id: `${entry.collection}:${entry.slug}`,
  type: collectionType(entry.collection),
  slug: entry.slug,
  title: entry.title,
  description: entry.description,
  url: entry.url,
  content: stripMarkdown(entry.content).replace(/\s+/g, ' ').trim(),
  category: String(entry.data.category ?? entry.collection),
  tags: ((entry.data.tags as Array<string | { name?: string; slug?: string }>) ?? []).map((tag) => typeof tag === 'string' ? tag : tag.name ?? tag.slug).filter(Boolean),
  keywords: entry.data.keywords ?? [],
}))

writeJson('public/search/documents.json', documents)
console.log(`Generated public/search/documents.json with ${documents.length} document(s).`)
