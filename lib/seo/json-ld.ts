import { company, contact } from '@/lib/business'
import { locations } from '@/lib/business/locations'
import { siteConfig } from '@/config/site'
import { absoluteUrl } from '@/lib/seo/metadata'
import type { BreadcrumbItem } from '@/lib/content/types'

export type JsonLdObject = Record<string, unknown>

export function organizationJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.contactEmail,
    logo: absoluteUrl('/icon.svg'),
    sameAs: Object.values(siteConfig.links),
  }
}

/**
 * HA Web Studio operates as a remote-first service business rather than a
 * storefront, so this deliberately omits a physical `address`/geo and
 * instead declares its service areas via `areaServed`. Swap in a real
 * PostalAddress if/when the business opens a physical location.
 */
export function localBusinessJsonLd(): JsonLdObject {
  const primaryLocation = locations[0]

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#local-business`,
    name: siteConfig.name,
    image: absoluteUrl(siteConfig.ogImage),
    url: siteConfig.url,
    email: siteConfig.contactEmail,
    telephone: contact.phones.primary,
    priceRange: '$$',
    description: siteConfig.description,
    founder: { '@type': 'Person', name: company.founder },
    areaServed: primaryLocation
      ? primaryLocation.serviceAreas.map((area) => ({ '@type': 'Place', name: area }))
      : undefined,
    sameAs: Object.values(siteConfig.links),
    parentOrganization: { '@id': `${siteConfig.url}/#organization` },
  }
}

export function websiteJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function personJsonLd(input: {
  name: string
  path?: string
  role?: string
  description?: string
  sameAs?: string[]
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: input.name,
    ...(input.role ? { jobTitle: input.role } : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.path ? { url: absoluteUrl(input.path) } : {}),
    ...(input.sameAs?.length ? { sameAs: input.sameAs } : {}),
  }
}

export function webPageJsonLd(input: {
  title: string
  description: string
  path: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': input.type ?? 'WebPage',
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    publisher: { '@id': `${siteConfig.url}/#organization` },
  }
}

export function collectionPageJsonLd(input: {
  title: string
  description: string
  path: string
  items?: { title: string; path: string }[]
}): JsonLdObject {
  return {
    ...webPageJsonLd({ ...input, type: 'CollectionPage' }),
    ...(input.items?.length
      ? {
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: input.items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.title,
              url: absoluteUrl(item.path),
            })),
          },
        }
      : {}),
  }
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  }
}

export function articleJsonLd(input: {
  title: string
  description: string
  path: string
  publishedAt?: string
  updatedAt?: string
  authorName?: string
  image?: string
  type?: 'Article' | 'BlogPosting'
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': input.type ?? 'Article',
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.publishedAt ? { datePublished: input.publishedAt } : {}),
    ...(input.updatedAt ? { dateModified: input.updatedAt } : {}),
    author: {
      '@type': input.authorName ? 'Person' : 'Organization',
      name: input.authorName ?? siteConfig.name,
    },
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
  }
}

export function blogPostingJsonLd(input: Parameters<typeof articleJsonLd>[0]): JsonLdObject {
  return articleJsonLd({ ...input, type: 'BlogPosting' })
}

export function serviceJsonLd(input: {
  title: string
  description: string
  path: string
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      '@id': `${siteConfig.url}/#organization`,
    },
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function projectJsonLd(input: {
  title: string
  description: string
  path: string
  client?: string
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    creator: {
      '@id': `${siteConfig.url}/#organization`,
    },
    ...(input.client ? { about: { '@type': 'Organization', name: input.client } } : {}),
  }
}

export function caseStudyJsonLd(input: {
  title: string
  description: string
  path: string
  client?: string
  authorName?: string
  publishedAt?: string
  updatedAt?: string
  schemaType?: 'Article' | 'TechArticle' | 'CreativeWork'
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': input.schemaType ?? 'Article',
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    ...(input.client
      ? {
          about: {
            '@type': 'Organization',
            name: input.client,
          },
        }
      : {}),
    ...(input.publishedAt ? { datePublished: input.publishedAt } : {}),
    ...(input.updatedAt ? { dateModified: input.updatedAt } : {}),
    author: {
      '@type': input.authorName ? 'Person' : 'Organization',
      name: input.authorName ?? siteConfig.name,
    },
    publisher: { '@id': `${siteConfig.url}/#organization` },
  }
}

export function technologyJsonLd(input: {
  title: string
  description: string
  path: string
  website?: string
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    applicationCategory: 'WebApplication',
  }
}

export function problemJsonLd(input: {
  title: string
  description: string
  path: string
}): JsonLdObject {
  return webPageJsonLd(input)
}
