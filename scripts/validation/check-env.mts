import { printResult, readText, type AuditMessage } from '../shared/toolkit.mts'

const messages: AuditMessage[] = []
const env = readText('.env')

for (const name of ['NEXT_PUBLIC_GA_MEASUREMENT_ID', 'NEXT_PUBLIC_CLARITY_PROJECT_ID']) {
  if (!env.includes(`${name}=`)) messages.push({ level: 'warning', message: `Missing optional analytics env var: ${name}` })
}

printResult('Environment validation', messages)
