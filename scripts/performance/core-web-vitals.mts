import { printResult, readText, type AuditMessage } from '../shared/toolkit.mts'

const messages: AuditMessage[] = []
const source = readText('lib/analytics/web-vitals.mts')
for (const metric of ['CLS', 'INP', 'LCP', 'FCP', 'TTFB']) {
  if (!source.includes(metric)) messages.push({ level: 'warning', message: `Core Web Vital not referenced in tracking source: ${metric}` })
}

printResult('Core Web Vitals validation', messages)
