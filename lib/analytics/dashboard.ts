import type { AnalyticsPayload } from './types'

export type AnalyticsEventType =
  | 'page_view'
  | 'cta_click'
  | 'form_submit'
  | 'content_view'
  | 'search_query'
  | 'internal_link_click'
  | 'external_link_click'
  | 'scroll_depth'
  | 'time_on_page'

export interface AnalyticsEvent {
  type: AnalyticsEventType
  properties: AnalyticsPayload
  timestamp: string
}

export function createAnalyticsEvent(type: AnalyticsEventType, properties: AnalyticsPayload = {}): AnalyticsEvent {
  return {
    type,
    properties,
    timestamp: new Date().toISOString(),
  }
}

export const logAnalyticsEvent = createAnalyticsEvent

export function trackCtaClick(location: string, text: string, destination: string) {
  return createAnalyticsEvent('cta_click', { location, text, destination })
}

export function trackFormSubmit(formType: string, success: boolean) {
  return createAnalyticsEvent('form_submit', { formType, success })
}

export function trackContentView(contentType: string, slug: string) {
  return createAnalyticsEvent('content_view', { contentType, slug })
}

export function trackSearchQuery(query: string, resultsCount: number) {
  return createAnalyticsEvent('search_query', { query, resultsCount })
}
