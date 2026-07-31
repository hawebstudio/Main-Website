import { pathExists, printResult, type AuditMessage } from '../shared/toolkit.mts'

const messages: AuditMessage[] = []
for (const asset of ['public/icon.svg', 'public/apple-icon.png', 'public/icon-light-32x32.png', 'public/icon-dark-32x32.png']) {
  if (!pathExists(asset)) messages.push({ level: 'issue', message: `Missing favicon asset: ${asset}` })
}

printResult('Favicon asset check', messages)
