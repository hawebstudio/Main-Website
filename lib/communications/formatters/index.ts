export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function formatName(name: string): string {
  return name.trim().replace(/\s+/g, ' ')
}

export function normalizePhone(phone: string): string {
  return phone.trim().replace(/\s+/g, ' ')
}

export function formatAddress(parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(', ')
}
