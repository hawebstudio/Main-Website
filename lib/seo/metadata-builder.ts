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

  return {
    title: input.title,
    description,
    alternates: {
      canonical: url,
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
