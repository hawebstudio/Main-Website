import type { ValidationResult } from '../types'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+()\-\s\d]{7,20}$/

export function isValidEmail(email: string): boolean {
  return emailPattern.test(email.trim().toLowerCase())
}

export function isValidPhone(phone: string): boolean {
  return phonePattern.test(phone.trim())
}

export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return url.startsWith('/')
  }
}

export function isValidName(name: string): boolean {
  const value = name.trim()
  return value.length >= 2 && value.length <= 120
}

export function validateSearchPayload(query: string): ValidationResult {
  return {
    valid: query.trim().length > 0 && query.length <= 120,
    errors: query.trim() ? [] : ['Search query is required'],
  }
}

export function validateContactPayload(input: { name: string; email: string; message: string; phone?: string }): ValidationResult {
  const errors: string[] = []
  if (!isValidName(input.name)) errors.push('Valid name is required')
  if (!isValidEmail(input.email)) errors.push('Valid email is required')
  if (!input.message.trim()) errors.push('Message is required')
  if (input.phone && !isValidPhone(input.phone)) errors.push('Phone number is invalid')
  return { valid: errors.length === 0, errors }
}
