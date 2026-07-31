import { defaultLeadPriority, defaultLeadStatus } from '../constants'
import type { IncomingFormSubmission, Lead } from '../types'
import { sanitizeText } from '../validation'

export function normalizeFormSubmission(input: IncomingFormSubmission): Lead {
  return {
    name: sanitizeText(input.name ?? input.email),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim(),
    company: input.company ? sanitizeText(input.company) : undefined,
    message: input.message?.trim(),
    status: defaultLeadStatus,
    priority: defaultLeadPriority,
    source: input.source ?? 'website',
    tags: [...new Set([input.type, ...(input.tags ?? [])])],
  }
}
