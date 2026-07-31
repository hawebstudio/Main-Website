import { communicationConfig } from '../constants'
import type { ContactRequest, EmailPayload } from '../types'
import { formatName, normalizeEmail, normalizePhone } from '../formatters'

export function normalizeContactRequest(input: ContactRequest): ContactRequest {
  return {
    ...input,
    name: formatName(input.name),
    email: normalizeEmail(input.email),
    phone: input.phone ? normalizePhone(input.phone) : undefined,
    message: input.message.trim(),
  }
}

export function contactSubject(input: ContactRequest): string {
  return input.subject?.trim() || `New enquiry from ${input.name}`
}

export function contactEmailPayload(input: ContactRequest): EmailPayload {
  const request = normalizeContactRequest(input)

  return {
    to: [{ email: communicationConfig.supportEmail, name: communicationConfig.defaultFromName }],
    replyTo: { email: request.email, name: request.name },
    subject: contactSubject(request),
    text: [
      `Name: ${request.name}`,
      `Email: ${request.email}`,
      request.phone ? `Phone: ${request.phone}` : undefined,
      request.company ? `Company: ${request.company}` : undefined,
      '',
      request.message,
    ]
      .filter(Boolean)
      .join('\n'),
  }
}
