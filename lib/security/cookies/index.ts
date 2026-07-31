import type { CookieOptions } from '../types'

export function serializeCookie(name: string, value: string, options: CookieOptions = {}): string {
  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`]
  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`)
  parts.push(`Path=${options.path ?? '/'}`)
  if (options.secure ?? true) parts.push('Secure')
  if (options.httpOnly) parts.push('HttpOnly')
  parts.push(`SameSite=${options.sameSite ?? 'lax'}`)
  return parts.join('; ')
}

export function parseCookieHeader(header: string): Record<string, string> {
  return Object.fromEntries(
    header
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const [name, ...value] = part.split('=')
        return [decodeURIComponent(name), decodeURIComponent(value.join('='))]
      }),
  )
}
