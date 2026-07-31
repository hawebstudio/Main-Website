import type { FeedEntry } from '../types'
import { escapeXml } from '../utils'

export function generateRssFeed(input: {
  title: string
  siteUrl: string
  description: string
  entries: FeedEntry[]
}): string {
  const items = input.entries
    .map(
      (entry) => `<item>
  <title>${escapeXml(entry.title)}</title>
  <link>${escapeXml(entry.url)}</link>
  <guid>${escapeXml(entry.url)}</guid>
  ${entry.description ? `<description>${escapeXml(entry.description)}</description>` : ''}
  ${entry.publishedAt ? `<pubDate>${new Date(entry.publishedAt).toUTCString()}</pubDate>` : ''}
</item>`,
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(input.title)}</title>
  <link>${escapeXml(input.siteUrl)}</link>
  <description>${escapeXml(input.description)}</description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${items}
</channel>
</rss>`
}
