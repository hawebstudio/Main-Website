import type { IncomingFormSubmission, Lead } from '../types'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function sanitizeText(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}

export function validateLead(input: Pick<Lead, 'name' | 'email'>): string[] {
  const errors: string[] = []
  if (!input.name.trim()) errors.push('Name is required')
  if (!emailPattern.test(input.email.trim().toLowerCase())) errors.push('Valid email is required')
  return errors
}

export function validateFormSubmission(input: IncomingFormSubmission): string[] {
  const name = input.name ?? input.email
  return validateLead({ name, email: input.email })
}
