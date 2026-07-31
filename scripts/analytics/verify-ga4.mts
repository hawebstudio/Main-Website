import { printResult, readText, type AuditMessage } from '../shared/toolkit.mts'

const messages: AuditMessage[] = []
const env = readText('.env')
if (!/NEXT_PUBLIC_GA_MEASUREMENT_ID=G-[A-Z0-9]+/.test(env)) {
  messages.push({ level: 'warning', message: 'NEXT_PUBLIC_GA_MEASUREMENT_ID is missing or not a GA4 measurement ID.' })
}
if (!readText('components/analytics/analytics-provider.tsx').includes('ga4')) {
  messages.push({ level: 'issue', message: 'Analytics provider does not reference GA4 integration.' })
}

printResult('GA4 verification', messages)
