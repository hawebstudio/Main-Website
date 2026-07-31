export function createCsrfToken(seed = `${Date.now()}:${Math.random()}`): string {
  return Buffer.from(seed).toString('base64url')
}

export function isValidCsrfToken(token?: string): boolean {
  return Boolean(token && token.length >= 16)
}

export const csrfGuidance =
  'Use CSRF checks for state-changing server actions that accept browser-submitted form data. Read-only pages and static routes do not need CSRF handling.'
