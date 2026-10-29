import { markdownTable, readAllContentEntries, writeJson, writeText } from '../shared/toolkit.mts'

/**
 * Breadcrumb data for every content URL.
 *
 * The parent of each collection is written out explicitly: deriving it from the
 * collection name produced `/service-families` (a route that does not exist) and
 * `/work` for projects, which happens to be right. Family pages have no index of
 * their own, so they sit under `/services` with the services they group.
 */
const collectionParents: Record<string, { label: string; href: string }> = {
  services: { label: 'Services', href: '/services' },
  'service-families': { label: 'Services', href: '/services' },
  work: { label: 'Work', href: '/work' },
  'case-studies': { label: 'Case Studies', href: '/case-studies' },
  technologies: { label: 'Technologies', href: '/technologies' },
  insights: { label: 'Insights', href: '/insights' },
  problems: { label: 'Problems', href: '/problems' },
}

const breadcrumbs = (await readAllContentEntries()).map((entry) => ({
  url: entry.url,
  items: [
    { label: 'Home', href: '/' },
    collectionParents[entry.collection] ?? {
      label: titleFromCollection(entry.collection),
      href: `/${entry.collection}`,
    },
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
