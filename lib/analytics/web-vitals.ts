import { trackEvent } from './tracking'
import type { WebVitalMetric } from './types'

export function trackWebVital(metric: WebVitalMetric) {
  trackEvent('web_vital', {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
  })
}
