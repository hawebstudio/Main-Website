import type { NotificationPayload } from '../types'

export function createNotification(payload: NotificationPayload): NotificationPayload {
  return {
    ...payload,
    channel: payload.channel ?? 'notification',
  }
}
