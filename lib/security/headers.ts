/**
 * Security Headers Configuration
 * Production-ready security headers for Next.js
 */

import { getCSPHeaders, type CSPConfig } from './csp'

export interface SecurityHeadersConfig {
  csp?: CSPConfig
  hsts?: {
    enabled: boolean
    maxAge: number
    includeSubDomains: boolean
    preload: boolean
  }
  frameGuard?: boolean
  noSniff?: boolean
  xssProtection?: boolean
  referrerPolicy?: string
  permissionsPolicy?: Record<string, string[]>
}

const DEFAULT_CONFIG: SecurityHeadersConfig = {
  csp: {
    mode: 'balanced',
  },
  hsts: {
    enabled: true,
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  frameGuard: true,
  noSniff: true,
  xssProtection: true,
  referrerPolicy: 'strict-origin-when-cross-origin',
  permissionsPolicy: {
    'camera': ['self'],
    'microphone': ['self'],
    'geolocation': ['self'],
    'interest-cohort': [],
  },
}

export function getSecurityHeaders(config: SecurityHeadersConfig = DEFAULT_CONFIG): Record<string, string> {
  const headers: Record<string, string> = {}

  // Content Security Policy
  if (config.csp) {
    const cspHeaders = getCSPHeaders(config.csp)
    Object.assign(headers, cspHeaders)
  }

  // HTTP Strict Transport Security (HSTS)
  if (config.hsts?.enabled) {
    const hstsValue = [
      `max-age=${config.hsts.maxAge}`,
      config.hsts.includeSubDomains ? 'includeSubDomains' : '',
      config.hsts.preload ? 'preload' : '',
    ]
      .filter(Boolean)
      .join('; ')
    headers['Strict-Transport-Security'] = hstsValue
  }

  // X-Frame-Options (Frame Guard)
  if (config.frameGuard) {
    headers['X-Frame-Options'] = 'DENY'
  }

  // X-Content-Type-Options (No Sniff)
  if (config.noSniff) {
    headers['X-Content-Type-Options'] = 'nosniff'
  }

  // X-XSS-Protection
  if (config.xssProtection) {
    headers['X-XSS-Protection'] = '1; mode=block'
  }

  // Referrer Policy
  if (config.referrerPolicy) {
    headers['Referrer-Policy'] = config.referrerPolicy
  }

  // Permissions Policy
  if (config.permissionsPolicy) {
    const policies = Object.entries(config.permissionsPolicy)
      .map(([feature, origins]) => {
        const originList = origins.length > 0 ? origins.join(' ') : '*'
        return `${feature}=(${originList})`
      })
      .join(', ')
    headers['Permissions-Policy'] = policies
  }

  // Additional security headers
  headers['X-DNS-Prefetch-Control'] = 'off'
  headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
  headers['Cross-Origin-Opener-Policy'] = 'same-origin'
  headers['Cross-Origin-Resource-Policy'] = 'same-origin'

  return headers
}

/**
 * Development headers (more permissive)
 */
export function getDevSecurityHeaders(): Record<string, string> {
  return getSecurityHeaders({
    csp: {
      mode: 'permissive',
      reportOnly: true,
    },
    hsts: {
      enabled: false,
      maxAge: 0,
      includeSubDomains: false,
      preload: false,
    },
    frameGuard: false,
    noSniff: true,
    xssProtection: true,
    referrerPolicy: 'strict-origin-when-cross-origin',
    permissionsPolicy: {
      'camera': ['*'],
      'microphone': ['*'],
      'geolocation': ['*'],
    },
  })
}

/**
 * Production headers (strict)
 */
export function getProdSecurityHeaders(): Record<string, string> {
  return getSecurityHeaders(DEFAULT_CONFIG)
}
