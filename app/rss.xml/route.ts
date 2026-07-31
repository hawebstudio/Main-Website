import path from 'node:path'
import matter from 'gray-matter'
import { siteConfig } from '@/config/site'
import { routes } from '@/config/routes'
import { absoluteUrl } from '@/lib/seo/metadata'

export const dynamic = 'force-static'

export async function GET() {
  const entries = await getInsightEntries()
  const items = entries
    .sort((a, b) => dateValue(b.publishedAt) - dateValue(a.publishedAt))
    .map(
      (entry) => `
        <item>
          <title>${escapeXml(entry.title)}</title>
          <link>${absoluteUrl(routes.insights.detail(entry.slug))}</link>
          <guid>${absoluteUrl(routes.insights.detail(entry.slug))}</guid>
          <description>${escapeXml(entry.description)}</description>
          ${entry.publishedAt ? `<pubDate>${new Date(entry.publishedAt).toUTCString()}</pubDate>` : ''}
        </item>`,
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteConfig.name)}</title>
        <link>${siteConfig.url}</link>
        <description>${escapeXml(siteConfig.description)}</description>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}

function dateValue(value?: string) {
  return value ? new Date(value).getTime() : 0
}

async function getInsightEntries() {
  const fs = await import('node:fs')
  const directory = path.join(process.cwd(), 'content', 'insights')
  if (!fs.existsSync(directory)) return []

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(directory, file), 'utf8'))
      const slug = data.slug ?? file.replace(/\.mdx$/, '')

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? '',
        publishedAt: data.publishedAt,
      }
    })
}

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    switch (character) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&apos;'
      default:
        return '&quot;'
    }
  })
}
