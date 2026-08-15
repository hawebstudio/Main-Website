import type { MetadataRoute } from 'next'
import { routes } from '@/config/routes'
import { absoluteUrl } from '@/lib/seo/metadata'
import {
  services,
  serviceFamilies,
  projects,
  caseStudies,
  technologies,
  insights,
  problems,
} from '@/lib/content/source'
import { publishedLocations } from '@/lib/business/locations/data'

/**
 * Sitemap — static routes plus every published content entry.
 * Grows automatically as content collections gain entries.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl(routes.home()), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl(routes.services.index()), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl(routes.work.index()), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl(routes.work.client()), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl(routes.work.personal()), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl(routes.work.internal()), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl(routes.work.labs()), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl(routes.caseStudies.index()), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl(routes.technologies.index()), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl(routes.locations.index()), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl(routes.insights.index()), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl(routes.problems.index()), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl(routes.search()), lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: absoluteUrl(routes.about()), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: absoluteUrl(routes.websiteGrowthAssessment()), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl(routes.contact()), lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: absoluteUrl(routes.socials()), lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: absoluteUrl(routes.privacy()), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl(routes.terms()), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl(routes.cookies()), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const [serviceEntries, projectEntries, caseStudyEntries, technologyEntries, technologyCategoryEntries, insightEntries, problemEntries] =
    await Promise.all([
      services.getAll(),
      projects.getAll(),
      caseStudies.getAll(),
      technologies.getAll(),
      technologies.getCategoryPages(),
      insights.getAll(),
      problems.getAll(),
    ])

  const contentEntries: MetadataRoute.Sitemap = [
    ...serviceEntries.map((entry) => sitemapEntry(routes.services.detail(entry.slug), entry.updatedAt, 0.8)),
    ...serviceFamilies.map((family) => sitemapEntry(routes.services.family(family.slug), undefined, 0.7)),
    ...projectEntries.map((entry) => sitemapEntry(routes.work.detail(entry.slug), entry.updatedAt, 0.7)),
    ...caseStudyEntries.map((entry) => sitemapEntry(routes.caseStudies.detail(entry.slug), entry.updatedAt, 0.8)),
    ...technologyCategoryEntries.map((entry) => sitemapEntry(routes.technologies.category(entry.slug), entry.updatedAt, 0.6)),
    ...technologyEntries.map((entry) =>
      sitemapEntry(routes.technologies.detail(entry.category ?? entry.slug, entry.category ? entry.slug : undefined), entry.updatedAt, 0.6),
    ),
    ...insightEntries.map((entry) =>
      sitemapEntry(routes.insights.detail(entry.slug), entry.updatedAt ?? entry.publishedAt, 0.7),
    ),
    ...problemEntries.map((entry) => sitemapEntry(routes.problems.detail(entry.slug), entry.updatedAt, 0.6)),
    // Only published, indexable locations are included — draft/supporting-only
    // candidates in lib/business/locations/data/candidates.ts have no route
    // and must never appear here.
    ...publishedLocations
      .filter((location) => location.indexable)
      .map((location) =>
        sitemapEntry(routes.locations.detail(location.slug), undefined, location.type === 'region' ? 0.7 : 0.6),
      ),
  ]

  return [...staticEntries, ...contentEntries]
}

function sitemapEntry(path: string, lastModified?: string, priority = 0.7): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency: 'weekly',
    priority,
  }
}
