export type AnalyticsPrimitive = string | number | boolean | null | undefined

export type AnalyticsPayload = Record<string, AnalyticsPrimitive>

export type AnalyticsProviderName = 'ga4' | 'gtm' | 'clarity' | 'vercel' | 'custom'

export interface AnalyticsEventDefinition {
  name: string
  description: string
  conversion?: boolean
}

export interface ConversionDefinition {
  id: string
  name: string
  eventName: string
  category: 'lead' | 'quote' | 'contact' | 'newsletter' | 'purchase' | 'booking'
}

export interface ConsentState {
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

export interface WebVitalMetric {
  name: 'CLS' | 'LCP' | 'FID' | 'INP' | 'TTFB'
  value: number
  rating?: 'good' | 'needs-improvement' | 'poor'
  id?: string
}

export type GtagConsentPayload = Record<
  'ad_storage' | 'ad_user_data' | 'ad_personalization' | 'analytics_storage' | 'functionality_storage' | 'security_storage',
  'granted' | 'denied'
> extends infer T
  ? Partial<T> & { wait_for_update?: number }
  : never

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (
      command: 'config' | 'event' | 'js' | 'consent' | 'set',
      target: string | Date | 'default' | 'update',
      payload?: AnalyticsPayload | GtagConsentPayload,
    ) => void
  }
}
