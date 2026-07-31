export type MonitoringProvider = 'sentry' | 'lighthouse' | 'web-vitals'
export type MetricRating = 'good' | 'needs-improvement' | 'poor'

export interface MonitoringAlert {
  type: MonitoringProvider
  message: string
  severity: 'info' | 'warning' | 'critical'
  metadata?: Record<string, unknown>
}

export interface LighthouseThresholds {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
}

export interface MonitoringReport {
  title: string
  generatedAt: string
  provider: MonitoringProvider
  summary: Record<string, unknown>
}
