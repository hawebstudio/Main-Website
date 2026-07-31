import { company, contact } from '@/lib/business/company'

export const communicationConfig = {
  defaultFromName: company.name,
  defaultFromEmail: contact.emails.general,
  supportEmail: contact.emails.support,
} as const
