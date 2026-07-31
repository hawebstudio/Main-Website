import { printResult, readText, type AuditMessage } from '../shared/toolkit.ts'

const messages: AuditMessage[] = []
const env = readText('.env')
if (!/NEXT_PUBLIC_CLARITY_PROJECT_ID=.+/.test(env)) messages.push({ level: 'warning', message: 'NEXT_PUBLIC_CLARITY_PROJECT_ID is not configured.' })
if (!readText('components/analytics/analytics-provider.tsx').toLowerCase().includes('clarity')) {
  messages.push({ level: 'issue', message: 'Analytics provider does not reference Microsoft Clarity integration.' })
}

printResult('Clarity verification', messages)
