export { locationCandidates, getCandidatesByState, getCandidatesByTier } from './candidates'
export { publishedLocations } from './published'
export type { LocationCandidate, LocationTier, PublishedLocation, LocationFaq } from '../types'

import { publishedLocations } from './published'
import type { PublishedLocation } from '../types'

export function getPublishedLocation(slug: string): PublishedLocation | undefined {
  return publishedLocations.find((location) => location.slug === slug)
}

export function getPublishedCities(regionSlug?: string): PublishedLocation[] {
  return publishedLocations.filter(
    (location) => location.type === 'city' && (!regionSlug || location.regionSlug === regionSlug),
  )
}

export function getPublishedRegions(): PublishedLocation[] {
  return publishedLocations.filter((location) => location.type === 'region')
}

export function getRelatedLocations(location: PublishedLocation): PublishedLocation[] {
  return location.relatedLocationSlugs
    .map((slug) => publishedLocations.find((entry) => entry.slug === slug))
    .filter((entry): entry is PublishedLocation => Boolean(entry))
}
