import type { MetricRating } from '../types'

export function performanceWarning(name: string, value: number, rating: MetricRating): string | null {
  if (rating === 'good') return null
  return `${name} is ${rating} at ${value}`
}

export function performanceScore(ratings: MetricRating[]): number {
  if (!ratings.length) return 100
  const points = ratings.map((rating) => (rating === 'good' ? 100 : rating === 'needs-improvement' ? 60 : 20))
  return Math.round(points.reduce((sum, value) => sum + value, 0) / points.length)
}
