import { pathExists, printResult, type AuditMessage } from '../shared/toolkit.mts'

const messages: AuditMessage[] = []
for (const asset of ['public/favicon-mark.png', 'public/apple-icon.png', 'public/icon.svg']) {
  if (!pathExists(asset)) messages.push({ level: 'issue', message: `Missing favicon asset: ${asset}` })
}

printResult('Favicon asset check', messages)
