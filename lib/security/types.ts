export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export interface SecurityCheckResult {
  valid: boolean
  reason?: string
}

export interface CookieOptions {
  maxAge?: number
  path?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  httpOnly?: boolean
}
