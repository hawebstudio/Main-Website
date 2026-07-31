import type { AnalyticsEventDefinition, AnalyticsPayload } from './types'
import { trackEvent } from './tracking'

export const analyticsEvents = {
  contactSubmitted: 'contact_submitted',
  quoteRequested: 'quote_requested',
  serviceViewed: 'service_viewed',
  caseStudyViewed: 'case_study_viewed',
  insightViewed: 'insight_viewed',
  problemViewed: 'problem_viewed',
  technologyViewed: 'technology_viewed',
  workViewed: 'work_viewed',
  newsletterSignup: 'newsletter_signup',
  download: 'download',
  phoneClick: 'phone_click',
  emailClick: 'email_click',
  externalLink: 'external_link',
  ctaClick: 'cta_click',
  formSubmit: 'form_submit',
  projectView: 'project_view',
  technologyView: 'technology_view',
  insightView: 'insight_view',
  siteSearch: 'site_search',
  scrollDepth: 'scroll_depth',
  buyerJourney: 'buyer_journey',
} as const

export type AnalyticsEventName = (typeof analyticsEvents)[keyof typeof analyticsEvents]

export const eventDefinitions: Record<AnalyticsEventName, AnalyticsEventDefinition> = {
  [analyticsEvents.contactSubmitted]: { name: analyticsEvents.contactSubmitted, description: 'Contact form submitted', conversion: true },
  [analyticsEvents.quoteRequested]: { name: analyticsEvents.quoteRequested, description: 'Quote requested', conversion: true },
  [analyticsEvents.serviceViewed]: { name: analyticsEvents.serviceViewed, description: 'Service page viewed' },
  [analyticsEvents.caseStudyViewed]: { name: analyticsEvents.caseStudyViewed, description: 'Case study viewed' },
  [analyticsEvents.insightViewed]: { name: analyticsEvents.insightViewed, description: 'Insight article viewed' },
  [analyticsEvents.problemViewed]: { name: analyticsEvents.problemViewed, description: 'Problem page viewed' },
  [analyticsEvents.technologyViewed]: { name: analyticsEvents.technologyViewed, description: 'Technology page viewed' },
  [analyticsEvents.workViewed]: { name: analyticsEvents.workViewed, description: 'Work detail viewed' },
  [analyticsEvents.newsletterSignup]: { name: analyticsEvents.newsletterSignup, description: 'Newsletter signup', conversion: true },
  [analyticsEvents.download]: { name: analyticsEvents.download, description: 'Download clicked' },
  [analyticsEvents.phoneClick]: { name: analyticsEvents.phoneClick, description: 'Phone link clicked' },
  [analyticsEvents.emailClick]: { name: analyticsEvents.emailClick, description: 'Email link clicked' },
  [analyticsEvents.externalLink]: { name: analyticsEvents.externalLink, description: 'External link clicked' },
  [analyticsEvents.ctaClick]: { name: analyticsEvents.ctaClick, description: 'CTA clicked' },
  [analyticsEvents.formSubmit]: { name: analyticsEvents.formSubmit, description: 'Form submitted', conversion: true },
  [analyticsEvents.projectView]: { name: analyticsEvents.projectView, description: 'Project viewed' },
  [analyticsEvents.technologyView]: { name: analyticsEvents.technologyView, description: 'Technology viewed' },
  [analyticsEvents.insightView]: { name: analyticsEvents.insightView, description: 'Insight viewed' },
  [analyticsEvents.siteSearch]: { name: analyticsEvents.siteSearch, description: 'Site search used' },
  [analyticsEvents.scrollDepth]: { name: analyticsEvents.scrollDepth, description: 'Scroll depth reached' },
  [analyticsEvents.buyerJourney]: { name: analyticsEvents.buyerJourney, description: 'Buyer journey interaction' },
}

export function trackAnalyticsEvent(eventName: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  return trackEvent(eventName, payload)
}

export { trackEvent }
