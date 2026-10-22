import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { canonicalUrl } from './canonical'
import { metaDescription } from './descriptions'
import { dynamicOgImageUrl } from './images'
import { openGraphDefaults } from './opengraph'
import { robotsDirectives } from './robots'
import { twitterCard } from './twitter'
import type { PageMetadataInput } from './types'

const SECTION_LABELS: Record<string, string> = {
  services: 'Service',
  work: 'Work',
  'case-studies': 'Case Study',
  technologies: 'Technology',
  insights: 'Insight',
  problems: 'Problem',
}

function deriveEyebrow(path: string): string | undefined {
  const segment = path.split('/').filter(Boolean)[0]
  return segment ? SECTION_LABELS[segment] : undefined
}

export function buildMetadata(input: PageMetadataInput): Metadata {
  const url = canonicalUrl(input.path)
  const description = metaDescription(input.description)
  const eyebrow = input.eyebrow ?? deriveEyebrow(input.path)
  const image =
    input.ogImage ?? dynamicOgImageUrl({ title: input.title, description, eyebrow })

  // The root layout appends `— HA Web Studio` to every title. Any page title
  // that already names the studio would otherwise render the brand twice
  // (e.g. "About HA Web Studio | … — HA Web Studio"), which hurts brand and
  // entity clarity in search results. Brand-bearing titles opt out of the
  // template instead of repeating the name.
  const title: Metadata['title'] = input.title.includes(siteConfig.name)
    ? { absolute: input.title }
    : input.title

  return {
    title,
    description,
    alternates: {
      canonical: url,
      // Self-referencing hreflang for this page. Next.js replaces the whole
      // `alternates` object with the deepest definition rather than merging
      // it, so the root layout's `languages` entry never reached the served
      // HTML on any page that calls this helper — which is every page. The
      // site is single-locale, so the correct signal is that this page is its
      // own `en-US` variant and its own default; nothing here claims a
      // translated variant exists.
      languages: {
        'en-US': url,
        'x-default': url,
      },
      types: {
        'application/rss+xml': `${siteConfig.url}/rss.xml`,
        'application/atom+xml': `${siteConfig.url}/atom.xml`,
      },
    },
    openGraph: {
      ...openGraphDefaults({
        title: input.title,
        description,
        url,
        image,
        article: Boolean(input.article),
      }),
      ...(input.article
        ? {
            publishedTime: input.article.publishedTime,
            modifiedTime: input.article.modifiedTime,
            authors: input.article.authors,
            tags: input.article.tags,
          }
        : {}),
    },
    twitter: twitterCard({ title: input.title, description, image }),
    robots: robotsDirectives(input.noIndex),
  }
}
