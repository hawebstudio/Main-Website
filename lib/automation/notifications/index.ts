export interface NotificationMessage {
  subject: string
  body: string
  channel?: 'email' | 'slack' | 'webhook'
}

export function createNotification(input: NotificationMessage): NotificationMessage {
  return input
}
