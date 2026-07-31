import { lighthouseThresholds } from '../constants'
import type { LighthouseThresholds } from '../types'

export function evaluateLighthouseScores(
  scores: Partial<LighthouseThresholds>,
  thresholds: LighthouseThresholds = lighthouseThresholds,
) {
  return {
    performance: (scores.performance ?? 0) >= thresholds.performance,
    accessibility: (scores.accessibility ?? 0) >= thresholds.accessibility,
    bestPractices: (scores.bestPractices ?? 0) >= thresholds.bestPractices,
    seo: (scores.seo ?? 0) >= thresholds.seo,
  }
}
