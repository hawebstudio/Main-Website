import { printResult, readText, type AuditMessage } from '../shared/toolkit.mts'

const messages: AuditMessage[] = []
// The tracking implementation lives in lib/monitoring/web-vitals.ts; this read
// used to point at lib/analytics/web-vitals.mts, which does not exist, so the
// check crashed instead of reporting anything.
const source = readText('lib/monitoring/web-vitals.ts')
for (const metric of ['CLS', 'INP', 'LCP', 'FCP', 'TTFB']) {
  if (!source.includes(metric)) messages.push({ level: 'warning', message: `Core Web Vital not referenced in tracking source: ${metric}` })
}

printResult('Core Web Vitals validation', messages)
