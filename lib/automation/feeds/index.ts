import type { FeedEntry } from '../types'

export function generateJsonFeed(input: {
  title: string
  siteUrl: string
  feedUrl: string
  entries: FeedEntry[]
}) {
  return {
    version: 'https://jsonfeed.org/version/1.1',
    title: input.title,
    home_page_url: input.siteUrl,
    feed_url: input.feedUrl,
    items: input.entries.map((entry) => ({
      id: entry.url,
      url: entry.url,
      title: entry.title,
      summary: entry.description,
      date_published: entry.publishedAt,
      date_modified: entry.updatedAt,
      author: entry.author ? { name: entry.author } : undefined,
    })),
  }
}
