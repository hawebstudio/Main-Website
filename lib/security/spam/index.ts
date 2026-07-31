import { validateHoneypot } from '../honeypot'

const spamKeywords = ['casino', 'viagra', 'crypto guaranteed', 'free money']

export function containsSpamKeyword(value: string): boolean {
  const normalized = value.toLowerCase()
  return spamKeywords.some((keyword) => normalized.includes(keyword))
}

export function hasSuspiciousLinkCount(value: string, maxLinks = 2): boolean {
  const matches = value.match(/https?:\/\//gi)
  return (matches?.length ?? 0) > maxLinks
}

export function validateFormSpam(input: { message: string; name?: string }): { valid: boolean; reason?: string } {
  const text = `${input.name ?? ''} ${input.message}`
  if (containsSpamKeyword(text)) return { valid: false, reason: 'Spam keyword detected' }
  if (hasSuspiciousLinkCount(text)) return { valid: false, reason: 'Too many links' }
  return { valid: true }
}

export { validateHoneypot }
