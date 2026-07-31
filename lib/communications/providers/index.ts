import type { EmailProvider } from '../types'

export type EmailProviderFactory = () => EmailProvider

export function createEmailProvider(provider: EmailProvider): EmailProvider {
  return provider
}
