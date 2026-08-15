/**
 * Location data types — Phase 2 local SEO architecture.
 *
 * Two data sets share these types:
 *  - `locationCandidates` (data/candidates.ts): every researched city across
 *    the 10 target states, classified into a tier with an honest reason.
 *    Tier 1 candidates are the only ones that also appear in
 *    `publishedLocations`; everything else has NO route and exists purely
 *    as research/roadmap data (see dynamicParams = false in the route).
 *  - `publishedLocations` (data/published.ts): the actual, live, indexable
 *    pages — one region hub plus the Tier 1 city pages that currently meet
 *    the quality bar (genuine local context, no fabricated claims, unique
 *    FAQs, no doorway-page duplication).
 */

/**
 * TIER 1 — high priority, published, indexable.
 * TIER 2 — strategic, real commercial potential, needs more evidence/content
 *          before an indexed page is justified.
 * TIER 3 — supporting, represented via the state/region conversation only.
 * TIER 4 — not currently targeted (no legitimate dedicated-page rationale).
 */
export type LocationTier = 1 | 2 | 3 | 4

export interface LocationFaq {
  question: string
  answer: string
}

/**
 * A researched-but-not-necessarily-published city. Every state in the
 * brief's target list is represented here so Phase 3 has a ready research
 * base — publishing more of these later is a content decision, not a
 * routing decision.
 */
export interface LocationCandidate {
  city: string
  state: string
  stateSlug: string
  /** Unique slug this city would use *if* published under /locations/[slug]. Not a live route unless it also appears in publishedLocations. */
  slug: string
  tier: LocationTier
  /** One honest, specific sentence — never "insufficient priority" boilerplate. */
  reason: string
}

/**
 * A live, indexable (or intentionally noindex draft) location page.
 * `type: 'region'` is used for the single Delhi/NCR hub; `type: 'city'` for
 * individual city pages.
 */
export interface PublishedLocation {
  slug: string
  type: 'region' | 'city'
  name: string
  state: string
  /** Slug of the parent region hub, when this is a city inside one (e.g. Noida -> delhi-ncr). */
  regionSlug?: string
  tier: LocationTier
  indexable: boolean

  seoTitle: string
  seoDescription: string
  h1: string

  intro: string
  servicesIntro: string
  businessContext: string
  whyModernWebsite: string
  deliveryModel: string
  industries: string[]

  primaryKeyword: string
  secondaryKeywords: string[]
  longTailKeywords: string[]

  faqs: LocationFaq[]

  /** Slugs of other published locations worth cross-linking (same region only). */
  relatedLocationSlugs: string[]
  /** Service family slugs worth linking from this page (`/services/families/[slug]`). */
  relatedServiceFamilySlugs: string[]
}
