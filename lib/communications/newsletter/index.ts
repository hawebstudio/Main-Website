import type { NewsletterSubscription } from '../types'
import { normalizeEmail } from '../formatters'
import { validateEmail } from '../validation'

export function validateNewsletterSubscription(input: NewsletterSubscription): string[] {
  return validateEmail(input.email) ? [] : ['Valid email is required']
}

export function subscribe(input: NewsletterSubscription): NewsletterSubscription {
  return {
    ...input,
    email: normalizeEmail(input.email),
    tags: input.tags ?? [],
  }
}

export function unsubscribe(email: string): { email: string } {
  return { email: normalizeEmail(email) }
}
