/**
 * Content Security Policy Builder
 * Configurable CSP for Next.js applications
 */

export interface CSPConfig {
  mode?: 'strict' | 'balanced' | 'permissive'
  reportOnly?: boolean
  reportUri?: string
  directives?: Partial<CSPDirectives>
}

export interface CSPDirectives {
  'default-src'?: string[]
  'script-src'?: string[]
  'style-src'?: string[]
  'img-src'?: string[]
  'font-src'?: string[]
  'connect-src'?: string[]
  'media-src'?: string[]
  'object-src'?: string[]
  'frame-src'?: string[]
  'base-uri'?: string[]
  'form-action'?: string[]
  'frame-ancestors'?: string[]
  'report-to'?: string[]
  'upgrade-insecure-requests'?: boolean
  'block-all-mixed-content'?: boolean
}

const DEFAULT_DIRECTIVES: CSPDirectives = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': ["'self'", 'https:'],
  'media-src': ["'self'"],
  'object-src': ['none'],
  'frame-src': ['none'],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ['none'],
  'upgrade-insecure-requests': true,
  'block-all-mixed-content': false,
}

const STRICT_DIRECTIVES: CSPDirectives = {
  'default-src': ["'self'"],
  'script-src': ["'self'"],
  'style-src': ["'self'"],
  'img-src': ["'self'", 'data:'],
  'font-src': ["'self'"],
  'connect-src': ["'self'"],
  'media-src': ["'self'"],
  'object-src': ['none'],
  'frame-src': ['none'],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ['none'],
  'upgrade-insecure-requests': true,
  'block-all-mixed-content': true,
}

const PERMISSIVE_DIRECTIVES: CSPDirectives = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://cdn.jsdelivr.net'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
  'img-src': ["'self'", 'data:', 'https:', 'http:'],
  'font-src': ["'self'", 'data:', 'https://cdn.jsdelivr.net'],
  'connect-src': ["'self'", 'https:', 'http:'],
  'media-src': ["'self'", 'https:'],
  'object-src': ['none'],
  'frame-src': ['https://www.youtube.com', 'https://player.vimeo.com'],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ['none'],
  'upgrade-insecure-requests': false,
  'block-all-mixed-content': false,
}

export function buildCSP(config: CSPConfig = {}): string {
  const {
    mode = 'balanced',
    reportOnly = false,
    reportUri,
    directives: customDirectives,
  } = config

  let directives: CSPDirectives

  switch (mode) {
    case 'strict':
      directives = { ...STRICT_DIRECTIVES }
      break
    case 'permissive':
      directives = { ...PERMISSIVE_DIRECTIVES }
      break
    default:
      directives = { ...DEFAULT_DIRECTIVES }
  }

  // Merge custom directives
  if (customDirectives) {
    directives = { ...directives, ...customDirectives }
  }

  // Add report-to if reportUri is provided
  if (reportUri) {
    directives['report-to'] = ['csp-endpoint']
  }

  // Build CSP string
  const cspParts: string[] = []

  for (const [directive, values] of Object.entries(directives)) {
    if (directive === 'upgrade-insecure-requests' && values === true) {
      cspParts.push(directive)
    } else if (directive === 'block-all-mixed-content' && values === true) {
      cspParts.push(directive)
    } else if (Array.isArray(values) && values.length > 0) {
      cspParts.push(`${directive} ${values.join(' ')}`)
    }
  }

  return cspParts.join('; ')
}

export function getCSPHeaders(config: CSPConfig = {}): {
  'Content-Security-Policy'?: string
  'Content-Security-Policy-Report-Only'?: string
} {
  const csp = buildCSP(config)

  if (config.reportOnly) {
    return {
      'Content-Security-Policy-Report-Only': csp,
    }
  }

  return {
    'Content-Security-Policy': csp,
  }
}

/**
 * CSP for development (more permissive)
 */
export function getDevCSP(): string {
  return buildCSP({
    mode: 'permissive',
    reportOnly: true,
  })
}

/**
 * CSP for production (strict)
 */
export function getProdCSP(): string {
  return buildCSP({
    mode: 'strict',
  })
}
