export type CommunicationChannel = 'email' | 'newsletter' | 'notification'

export interface EmailAddress {
  email: string
  name?: string
}

export interface EmailAttachment {
  filename: string
  contentType: string
  url?: string
}

export interface EmailPayload {
  to: EmailAddress[]
  from?: EmailAddress
  replyTo?: EmailAddress
  subject: string
  text?: string
  html?: string
  attachments?: EmailAttachment[]
  tags?: string[]
}

export interface EmailSendResult {
  provider: string
  messageId?: string
  accepted: boolean
}

export interface EmailProvider {
  name: string
  sendEmail: (payload: EmailPayload) => Promise<EmailSendResult>
}

export interface NewsletterSubscription {
  email: string
  name?: string
  source?: string
  tags?: string[]
}

export interface ContactRequest {
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
  source?: string
}

export interface NotificationPayload {
  type: 'contact_submitted' | 'newsletter_signup' | 'quote_request' | 'build' | 'admin_alert'
  title: string
  body: string
  channel?: CommunicationChannel
  metadata?: Record<string, unknown>
}

export interface TemplateInput {
  subject: string
  body: string
  cta?: {
    label: string
    url: string
  }
}
