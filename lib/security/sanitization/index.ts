import { securityDefaults } from '../constants'

export function sanitizeText(value: string, maxLength: number = securityDefaults.maxMessageLength): string {
  const withoutControlCharacters = Array.from(value)
    .filter((character) => {
      const codePoint = character.codePointAt(0) ?? 0
      return codePoint > 31 && codePoint !== 127
    })
    .join('')

  return withoutControlCharacters
    .trim()
    .slice(0, maxLength)
}

export function sanitizeSearchInput(value: string): string {
  return sanitizeText(value, securityDefaults.maxSearchLength)
}

export function sanitizeQueryParam(value: string | string[] | undefined): string {
  return sanitizeText(Array.isArray(value) ? value[0] ?? '' : value ?? '', securityDefaults.maxSearchLength)
}

export function sanitizeUrl(value: string): string {
  const trimmed = value.trim()
  if (/^javascript:/i.test(trimmed)) return ''
  if (/^data:/i.test(trimmed)) return ''
  return trimmed
}

export function sanitizeContactField(value: string, maxLength: number = securityDefaults.maxNameLength): string {
  return sanitizeText(value, maxLength)
}
