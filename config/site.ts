import {
  branding,
  company,
  contact,
  metadataDefaults,
  socialLinks,
} from '@/lib/business'
import { analyticsConfig } from '@/lib/analytics'

export const siteConfig = {
  name: company.name,
  shortName: 'HA',
  description: company.shortDescription,
  url: metadataDefaults.canonicalBaseUrl,
  ogImage: branding.assets.openGraph,
  twitter: metadataDefaults.twitter.handle,
  contactEmail: contact.emails.general,
  locale: company.locale,
  keywords: metadataDefaults.keywords,
  links: socialLinks,
  analytics: {
    gaId: analyticsConfig.ga4MeasurementId,
    gtmId: analyticsConfig.gtmId,
    clarityId: analyticsConfig.clarityProjectId,
  },
} as const

export type SiteConfig = typeof siteConfig
