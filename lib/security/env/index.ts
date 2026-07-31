import type { ValidationResult } from '../types'

export function validateEnv(required: string[], env: NodeJS.ProcessEnv = process.env): ValidationResult {
  const errors = required.filter((key) => !env[key]).map((key) => `Missing required environment variable: ${key}`)
  return {
    valid: errors.length === 0,
    errors,
  }
}

export function validatePublicSiteUrl(env: NodeJS.ProcessEnv = process.env): ValidationResult {
  const value = env.NEXT_PUBLIC_SITE_URL
  if (!value) return { valid: false, errors: ['NEXT_PUBLIC_SITE_URL is required'] }
  try {
    new URL(value)
    return { valid: true, errors: [] }
  } catch {
    return { valid: false, errors: ['NEXT_PUBLIC_SITE_URL must be a valid URL'] }
  }
}
