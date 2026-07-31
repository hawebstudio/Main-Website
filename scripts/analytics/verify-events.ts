import { printResult, readText, type AuditMessage } from '../shared/toolkit.ts'

const messages: AuditMessage[] = []
const events = readText('lib/analytics/events.ts')
for (const eventName of ['form', 'contact', 'conversion']) {
  if (!events.toLowerCase().includes(eventName)) messages.push({ level: 'warning', message: `No analytics event coverage found for: ${eventName}` })
}

printResult('Analytics event verification', messages)
