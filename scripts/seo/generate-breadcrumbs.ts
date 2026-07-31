import { markdownTable, readContentEntries, writeJson, writeText } from '../shared/toolkit.ts'

const breadcrumbs = (await readContentEntries()).map((entry) => ({
  url: entry.url,
  items: [
    { label: 'Home', href: '/' },
    { label: titleFromCollection(entry.collection), href: `/${entry.collection}` },
    { label: entry.title, href: entry.url },
  ],
}))

writeJson('public/generated/breadcrumbs.json', breadcrumbs)
writeText(
  'reports/breadcrumbs.md',
  `# Breadcrumb Report\n\n${markdownTable([['URL', 'Breadcrumbs'], ...breadcrumbs.map((item) => [item.url, item.items.map((crumb) => crumb.label).join(' > ')])])}\n`,
)
console.log(`Generated breadcrumb data for ${breadcrumbs.length} URL(s).`)

function titleFromCollection(collection: string): string {
  return collection.split('-').map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join(' ')
}
