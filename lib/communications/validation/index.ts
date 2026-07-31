import type { ContactRequest } from '../types'
import { normalizeEmail } from '../formatters'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+()\-\s\d]{7,20}$/

export function validateEmail(email: string): boolean {
  return emailPattern.test(normalizeEmail(email))
}

export function validatePhone(phone: string): boolean {
  return phonePattern.test(phone.trim())
}

export function validateContactRequest(input: ContactRequest): string[] {
  const errors: string[] = []

  if (!input.name.trim()) errors.push('Name is required')
  if (!validateEmail(input.email)) errors.push('Valid email is required')
  if (!input.message.trim()) errors.push('Message is required')
  if (input.phone && !validatePhone(input.phone)) errors.push('Phone number is invalid')

  return errors
}

export function hasSpamSignals(input: Pick<ContactRequest, 'message' | 'name'>): boolean {
  const text = `${input.name} ${input.message}`.toLowerCase()
  return ['http://', 'https://', '[url=', '<a href='].some((signal) => text.includes(signal))
}
