export interface PerformanceSnapshot {
  path: string
  capturedAt: string
  lighthouseScore?: number
  coreWebVitalsPassed?: boolean
}

export function createPerformanceSnapshot(
  path: string,
  input: Omit<PerformanceSnapshot, 'path' | 'capturedAt'> = {},
): PerformanceSnapshot {
  return {
    path,
    capturedAt: new Date().toISOString(),
    ...input,
  }
}
