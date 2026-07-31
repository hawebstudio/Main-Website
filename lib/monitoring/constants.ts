export const webVitalThresholds = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
} as const

export const lighthouseThresholds = {
  performance: 90,
  accessibility: 95,
  bestPractices: 95,
  seo: 95,
} as const
