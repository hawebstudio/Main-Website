import { readContentEntries, slugify, writeJson } from '../shared/toolkit.ts'

const keywords = new Map<string, Set<string>>()

for (const entry of await readContentEntries()) {
  for (const value of [
    entry.title,
    ...((entry.data.tags as Array<string | { name?: string; slug?: string }>) ?? []).map((tag) => typeof tag === 'string' ? tag : tag.name ?? tag.slug),
    ...(entry.data.technologies as string[] ?? [])
  ]) {
    if (!value) continue
    const key = slugify(String(value))
    if (!keywords.has(key)) keywords.set(key, new Set())
    keywords.get(key)?.add(entry.url)
  }
}

writeJson(
  'public/search/keywords.json',
  [...keywords.entries()].map(([keyword, urls]) => ({ keyword, urls: [...urls].sort() })).sort((a, b) => a.keyword.localeCompare(b.keyword)),
)
console.log(`Generated public/search/keywords.json with ${keywords.size} keyword(s).`)
