export interface ReportRequest {
  type: 'analytics' | 'search' | 'performance' | 'broken-links' | 'seo'
  period: string
  requestedAt: string
}

export function createReportRequest(type: ReportRequest['type'], period: string): ReportRequest {
  return {
    type,
    period,
    requestedAt: new Date().toISOString(),
  }
}
