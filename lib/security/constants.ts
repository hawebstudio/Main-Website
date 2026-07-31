export const securityDefaults = {
  honeypotField: 'website',
  timestampField: 'timestamp',
  minSubmitTimeMs: 2000,
  maxSearchLength: 120,
  maxNameLength: 120,
  maxMessageLength: 5000,
} as const

export const publicMarketingAllowedOrigins = ['self'] as const
