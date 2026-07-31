import type { AnalyticsPayload } from './types'

export function trackGa4PageView(path: string, title?: string) {
  if (typeof window === 'undefined') return

  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_title: title,
  })
}

export function trackGa4Event(eventName: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return

  window.gtag?.('event', eventName, payload)
}

export function trackGa4Conversion(eventName: string, payload: AnalyticsPayload = {}) {
  trackGa4Event(eventName, { ...payload, event_category: payload.event_category ?? 'conversion' })
}
