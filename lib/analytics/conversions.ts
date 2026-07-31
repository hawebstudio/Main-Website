import type { ConversionDefinition } from './types'

export const conversions: ConversionDefinition[] = [
  { id: 'lead', name: 'Lead', eventName: 'form_submit', category: 'lead' },
  { id: 'quote', name: 'Quote request', eventName: 'quote_requested', category: 'quote' },
  { id: 'contact', name: 'Contact submission', eventName: 'contact_submitted', category: 'contact' },
  { id: 'newsletter', name: 'Newsletter signup', eventName: 'newsletter_signup', category: 'newsletter' },
]

export function isConversionEvent(eventName: string): boolean {
  return conversions.some((conversion) => conversion.eventName === eventName)
}
