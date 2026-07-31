import type { MonitoringProvider, MonitoringReport } from '../types'

export function createMonitoringReport(
  provider: MonitoringProvider,
  title: string,
  summary: Record<string, unknown>,
): MonitoringReport {
  return {
    provider,
    title,
    summary,
    generatedAt: new Date().toISOString(),
  }
}
