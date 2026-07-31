import { communicationConfig } from '../constants'
import type { EmailPayload, EmailProvider } from '../types'
import { normalizeEmail } from '../formatters'
import { validateEmail } from '../validation'

export { normalizeEmail, validateEmail }

export function createEmailPayload(payload: EmailPayload): EmailPayload {
  return {
    ...payload,
    from: payload.from ?? {
      name: communicationConfig.defaultFromName,
      email: communicationConfig.defaultFromEmail,
    },
    to: payload.to.map((recipient) => ({
      ...recipient,
      email: normalizeEmail(recipient.email),
    })),
  }
}

export async function sendEmail(provider: EmailProvider, payload: EmailPayload) {
  return provider.sendEmail(createEmailPayload(payload))
}
