import { trackClarityEvent } from './clarity'
import { isConversionEvent } from './conversions'
import { trackGa4Conversion, trackGa4Event, trackGa4PageView } from './ga4'
import type { AnalyticsPayload } from './types'

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (isConversionEvent(eventName)) {
    trackGa4Conversion(eventName, payload)
  } else {
    trackGa4Event(eventName, payload)
  }

  trackClarityEvent(eventName)
}

export function trackPage(path: string, title?: string) {
  trackGa4PageView(path, title)
}

export function trackOutboundLink(url: string, label?: string) {
  trackEvent('external_link', { url, label })
}

export function trackDownload(url: string, fileName?: string) {
  trackEvent('download', { url, file_name: fileName })
}

export function trackSearch(query: string, resultsCount: number) {
  trackEvent('site_search', { query, results_count: resultsCount })
}

export function trackCta(location: string, text: string, destination: string) {
  trackEvent('cta_click', { location, text, destination })
}

export function trackForm(form: string, success: boolean) {
  trackEvent('form_submit', { form, success })
}

export function trackScroll(depth: number, path?: string) {
  trackEvent('scroll_depth', { depth, path })
}

export function trackEngagement(name: string, payload: AnalyticsPayload = {}) {
  trackEvent(name, payload)
}
