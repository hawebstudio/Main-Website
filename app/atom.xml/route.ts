import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { siteConfig } from '@/config/site'
import { routes } from '@/config/routes'
import { absoluteUrl } from '@/lib/seo/metadata'

export const dynamic = 'force-static'

export async function GET() {
  const entries = getInsightEntries()
  const updated =
    entries
      .map((entry) => entry.updatedAt ?? entry.publishedAt)
      .filter(Boolean)
      .sort()
      .at(-1) ?? new Date().toISOString()

  const items = entries
    .sort((a, b) => dateValue(b.publishedAt) - dateValue(a.publishedAt))
    .map((entry) => {
      const href = absoluteUrl(routes.insights.detail(entry.slug))

      return `
        <entry>
          <title>${escapeXml(entry.title)}</title>
          <link href="${href}" />
          <id>${href}</id>
          <updated>${new Date(entry.updatedAt ?? entry.publishedAt ?? Date.now()).toISOString()}</updated>
          <summary>${escapeXml(entry.description)}</summary>
        </entry>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>${escapeXml(siteConfig.name)}</title>
      <link href="${siteConfig.url}" />
      <link rel="self" href="${siteConfig.url}/atom.xml" />
      <id>${siteConfig.url}</id>
      <updated>${new Date(updated).toISOString()}</updated>
      <subtitle>${escapeXml(siteConfig.description)}</subtitle>
      ${items}
    </feed>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}

function dateValue(value?: string) {
  return value ? new Date(value).getTime() : 0
}

function getInsightEntries() {
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
        updatedAt: data.updatedAt,
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
