/**
 * Server Action Security
 * Validates and secures server actions
 */

import { siteConfig } from '@/config/site'
import { headers } from 'next/headers'

export interface ServerActionConfig {
  requireAuth?: boolean
  allowedRoles?: string[]
  rateLimit?: {
    windowMs: number
    maxRequests: number
  }
  validateInput?: (input: unknown) => boolean | Promise<boolean>
}

export interface ServerActionAudit {
  valid: boolean
  issues: string[]
  warnings: string[]
}

export function auditServerAction(config: ServerActionConfig = {}): ServerActionAudit {
  const issues: string[] = []
  const warnings: string[] = []

  if (config.requireAuth && (!config.allowedRoles || config.allowedRoles.length === 0)) {
    warnings.push('Auth is required but no role allowlist was provided.')
  }

  if (config.rateLimit && config.rateLimit.maxRequests <= 0) {
    issues.push('Rate limit maxRequests must be greater than zero.')
  }

  return {
    valid: issues.length === 0,
    issues,
    warnings,
  }
}

/**
 * Validate server action request
 */
export async function validateServerAction(config: ServerActionConfig = {}): Promise<{
  valid: boolean
  reason?: string
}> {
  const headersList = await headers()
  const origin = headersList.get('origin')
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host')

  // Check for CSRF token or same-origin request headers
  const csrfToken = headersList.get('x-csrf-token')

  if (csrfToken) {
    const isValidCsrf = await validateCsrfToken(csrfToken)
    if (!isValidCsrf) {
      return { valid: false, reason: 'Invalid CSRF token' }
    }
  } else if (!isTrustedOrigin(origin, host)) {
    return { valid: false, reason: 'Cross-origin server action request blocked' }
  }

  // Check authentication if required
  if (config.requireAuth) {
    const session = headersList.get('cookie')
    if (!session) {
      return { valid: false, reason: 'Authentication required' }
    }
  }

  // Check role permissions
  if (config.allowedRoles && config.allowedRoles.length > 0) {
    const userRole = headersList.get('x-user-role')
    if (!userRole || !config.allowedRoles.includes(userRole)) {
      return { valid: false, reason: 'Insufficient permissions' }
    }
  }

  return { valid: true }
}

/**
 * Determine whether the request's Origin header can be trusted.
 *
 * A hardcoded comparison against a single configured production URL breaks
 * legitimate submissions from localhost, preview deployments, or any custom
 * domain that doesn't exactly match `siteConfig.url`. Instead we trust the
 * origin whenever its host matches the host that actually served the
 * request (mirrors the check Next.js itself uses for Server Actions), and
 * fall back to the configured production URL as a secondary allowlist entry
 * (useful behind proxies where the `host` header may not be the public
 * domain).
 */
function isTrustedOrigin(origin: string | null, host: string | null): boolean {
  // No Origin header is typical for same-origin requests in some browsers;
  // there's nothing to validate against, so don't block on its absence.
  if (!origin) return true

  let originHost: string
  try {
    originHost = new URL(origin).host
  } catch {
    return false
  }

  if (host && originHost === host) return true

  try {
    const configuredHost = new URL(siteConfig.url.trim()).host
    if (originHost === configuredHost) return true
  } catch {
    // Ignore malformed configuration; the host-based check above is primary.
  }

  return false
}

/**
 * Validate CSRF token
 */
async function validateCsrfToken(token: string): Promise<boolean> {
  // In production, validate against stored token
  // For now, accept any non-empty token
  return token.length > 0
}

/**
 * Wrap server action with security checks
 */
export function withServerActionSecurity<T extends (...args: unknown[]) => Promise<unknown>>(
  action: T,
  config: ServerActionConfig = {}
): T {
  return (async (...args: Parameters<T>) => {
    const audit = auditServerAction(config)
    if (!audit.valid) {
      const error = new Error(audit.issues.join('; '))
      const errorWithStatus = error as Error & { statusCode?: number }
      errorWithStatus.statusCode = 500
      throw errorWithStatus
    }

    const validation = await validateServerAction(config)

    if (!validation.valid) {
      const error = new Error(validation.reason || 'Server action validation failed')
      const errorWithStatus = error as Error & { statusCode?: number }
      errorWithStatus.statusCode = 403
      throw errorWithStatus
    }

    // Validate input if configured
    if (config.validateInput) {
      const input = args[0]
      const isValid = await config.validateInput(input)
      if (!isValid) {
        const error = new Error('Invalid input')
        const errorWithStatus = error as Error & { statusCode?: number }
        errorWithStatus.statusCode = 400
        throw errorWithStatus
      }
    }

    return action(...args)
  }) as T
}

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  return Buffer.from(Date.now().toString() + Math.random().toString()).toString('base64')
}

/**
 * Get CSRF token for client
 */
export async function getCsrfToken(): Promise<string> {
  // In production, retrieve from session
  return generateCsrfToken()
}
