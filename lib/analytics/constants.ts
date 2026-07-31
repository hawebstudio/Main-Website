export const analyticsConfig = {
  ga4MeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  gtmId: process.env.GOOGLE_TAG_MANAGER_ID,
  consentStorageKey: 'ha_analytics_consent',
} as const
