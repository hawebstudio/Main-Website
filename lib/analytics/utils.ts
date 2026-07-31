import type { AnalyticsPayload } from './types'

export function cleanAnalyticsPayload(payload: AnalyticsPayload): AnalyticsPayload {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  )
}
