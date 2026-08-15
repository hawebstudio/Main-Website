import {
  serviceSchema,
  projectSchema,
  caseStudySchema,
  technologySchema,
  insightSchema,
  problemSchema,
  promotionSchema,
} from '@/lib/content/schemas'
import type {
  Service,
  Project,
  CaseStudy,
  Technology,
  Insight,
  Problem,
  Promotion,
  ContentStatus,
} from '@/lib/content/types'
import { resolveProvider, type ContentProvider } from '@/lib/content/providers'
import { services as servicesData, serviceFamilies as serviceFamiliesData } from '@/content/services'
import { projects as projectsData } from '@/content/work'

export type WithContent<T> = T & { content?: string }

export interface ContentCollection<T> {
  getAll: () => Promise<WithContent<T>[]>
  getBySlug: (slug: string) => Promise<WithContent<T> | null>
  getSlugs: () => Promise<string[]>
  getByCategory: (categorySlug: string) => Promise<WithContent<T>[]>
  getByTag: (tagSlug: string) => Promise<WithContent<T>[]>
  getFeatured: () => Promise<WithContent<T>[]>
  getByStatus: (status: ContentStatus) => Promise<WithContent<T>[]>
}

export interface TechnologyContentCollection<T> extends ContentCollection<T> {
  getRoot: () => Promise<WithContent<T> | null>
  getCategoryPages: () => Promise<WithContent<T>[]>
  getCategoryPage: (slug: string) => Promise<WithContent<T> | null>
  getByCategoryAndSlug: (category: string, slug: string) => Promise<WithContent<T> | null>
}

/** Resolve effective content status from status field or legacy draft flag */
export function resolveStatus(entry: { status?: ContentStatus; draft?: boolean }): ContentStatus {
  if (entry.status) return entry.status
  if (entry.draft) return 'draft'
  return 'published'
}

/** Returns true if entry should be visible in production */
export function isPublished(entry: { status?: ContentStatus; draft?: boolean }): boolean {
  return resolveStatus(entry) === 'published'
}

function createCollection<
  T extends {
    slug: string
    status?: ContentStatus
    draft?: boolean
    category?: unknown
    tags?: { slug: string }[]
    featured?: boolean
  },
>(provider: ContentProvider<T>): ContentCollection<T> {
  return {
    async getAll() {
      const entries = await provider.getAll()
      return entries.filter(isPublished)
    },
    async getBySlug(slug) {
      const entries = await provider.getAll()
      return entries.find((entry) => entry.slug === slug && isPublished(entry)) ?? null
    },
    async getSlugs() {
      const entries = await provider.getAll()
      return entries.filter(isPublished).map((entry) => entry.slug)
    },
    async getByCategory(categorySlug) {
      const entries = await this.getAll()
      return entries.filter((entry) => {
        if (!entry.category) return false
        if (typeof entry.category === 'string') return entry.category === categorySlug
        return (entry.category as { slug: string }).slug === categorySlug
      })
    },
    async getByTag(tagSlug) {
      const entries = await this.getAll()
      return entries.filter((entry) => entry.tags?.some((tag) => tag.slug === tagSlug))
    },
    async getFeatured() {
      const entries = await this.getAll()
      return entries.filter((entry) => entry.featured)
    },
    async getByStatus(status) {
      const entries = await provider.getAll()
      return entries.filter((entry) => resolveStatus(entry) === status)
    },
  }
}

function createTechnologyCollection(
  provider: ContentProvider<Technology>,
): TechnologyContentCollection<Technology> {
  async function allEntries() {
    const entries = await provider.getAll()
    return entries.filter(isPublished)
  }

  async function technologyEntries() {
    const entries = await allEntries()
    return entries.filter((entry) => (entry.kind ?? 'technology') === 'technology')
  }

  return {
    async getAll() {
      return technologyEntries()
    },
    async getBySlug(slug) {
      const entries = await technologyEntries()
      return entries.find((entry) => entry.slug === slug) ?? null
    },
    async getSlugs() {
      const entries = await technologyEntries()
      return entries.map((entry) => entry.slug)
    },
    async getByCategory(categorySlug) {
      const entries = await technologyEntries()
      return entries.filter((entry) => entry.category === categorySlug)
    },
    async getByTag(tagSlug) {
      const entries = await technologyEntries()
      return entries.filter((entry) => entry.tags?.some((tag) => tag.slug === tagSlug))
    },
    async getFeatured() {
      const root = await this.getRoot()
      const featured = new Set(root?.featuredTechnologies ?? [])
      const entries = await technologyEntries()
      return featured.size ? entries.filter((entry) => featured.has(entry.slug)) : entries.filter((entry) => entry.featured)
    },
    async getByStatus(status) {
      const entries = await provider.getAll()
      return entries.filter((entry) => resolveStatus(entry) === status && (entry.kind ?? 'technology') === 'technology')
    },
    async getRoot() {
      const entries = await allEntries()
      return entries.find((entry) => entry.kind === 'root') ?? null
    },
    async getCategoryPages() {
      const entries = await allEntries()
      return entries.filter((entry) => entry.kind === 'category')
    },
    async getCategoryPage(slug) {
      const entries = await allEntries()
      return entries.find((entry) => entry.kind === 'category' && entry.slug === slug) ?? null
    },
    async getByCategoryAndSlug(category, slug) {
      const entries = await technologyEntries()
      return entries.find((entry) => entry.category === category && entry.slug === slug) ?? null
    },
  }
}

function wrapProvider<T>(provider: import('@/lib/content/providers').ContentProvider<T>): ContentProvider<T> {
  return {
    type: provider.type,
    async getAll() {
      return provider.getAll()
    },
  }
}

export const services = createCollection<Service>(
  wrapProvider(resolveProvider({ name: 'services', gitData: servicesData || [] })),
)
export const serviceFamilies = serviceFamiliesData

export function getServiceBySlug(slug: string) {
  return servicesData.find((service) => service.slug === slug)
}

export function getFamilyBySlug(slug: string) {
  return serviceFamiliesData.find((family) => family.slug === slug)
}

export function getServicesByFamily(slug: string) {
  return servicesData.filter((service) => service.family === slug)
}
export const projects = createCollection<Project>(
  wrapProvider(resolveProvider({ name: 'projects', gitData: projectsData || [] })),
)
export const caseStudies = createCollection<CaseStudy>(
  wrapProvider(
    resolveProvider({ name: 'case-studies', gitDirectory: 'content/case-studies', schema: caseStudySchema }),
  ),
)
export const technologies = createTechnologyCollection(
  wrapProvider(resolveProvider({ name: 'technologies', gitDirectory: 'content/technologies', schema: technologySchema })),
)
export const insights = createCollection<Insight>(
  wrapProvider(resolveProvider({ name: 'insights', gitDirectory: 'content/insights', schema: insightSchema })),
)
export const problems = createCollection<Problem>(
  wrapProvider(resolveProvider({ name: 'problems', gitDirectory: 'content/problems', schema: problemSchema })),
)

/**
 * Promotions live in `content/promotion/`. This collection is intentionally
 * kept out of `allCollections` below — promotions have no detail pages of
 * their own and aren't part of the related-content graph, they're just a
 * time-boxed banner/popup source.
 *
 * If the folder is empty (or missing entirely) `getAll()` resolves to an
 * empty array — see `createGitMdxProvider` — so every consumer naturally
 * renders nothing rather than needing its own "is there a promo" branch.
 */
export const promotions = createCollection<Promotion>(
  wrapProvider(resolveProvider({ name: 'promotions', gitDirectory: 'content/promotion', schema: promotionSchema })),
)

function isWithinPromotionWindow(promotion: Promotion, now: Date): boolean {
  try {
    const start = new Date(`${promotion.startDate}T00:00:00`)
    const end = new Date(`${promotion.endDate}T23:59:59`)
    return now >= start && now <= end
  } catch {
    return false
  }
}

/** All promotions currently eligible to be shown, highest priority first. */
export async function getActivePromotions(): Promise<WithContent<Promotion>[]> {
  const entries = await promotions.getAll()
  const now = new Date()
  return entries
    .filter((promotion) => promotion.enabled !== false && isWithinPromotionWindow(promotion, now))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
}

/**
 * The single promotion the popup and contact form should surface.
 * Returns `null` when `content/promotion/` has no eligible entry — the
 * "render nothing" case.
 */
export async function getActivePromotion(): Promise<WithContent<Promotion> | null> {
  const [first] = await getActivePromotions()
  return first ?? null
}

/** All registered collections for automation and maintenance scripts */
export const allCollections = {
  services,
  projects,
  caseStudies,
  technologies,
  insights,
  problems,
} as const

export type CollectionName = keyof typeof allCollections
