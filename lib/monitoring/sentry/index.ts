export interface SentryConfig {
  dsn?: string
  environment?: string
  sampleRate?: number
}

export function createSentryConfig(input: SentryConfig = {}): SentryConfig {
  return {
    environment: process.env.NODE_ENV,
    sampleRate: 1,
    ...input,
  }
}

export function captureException(error: unknown, context?: Record<string, unknown>) {
  return {
    type: 'exception' as const,
    error,
    context,
    capturedAt: new Date().toISOString(),
  }
}

export function captureMessage(message: string, context?: Record<string, unknown>) {
  return {
    type: 'message' as const,
    message,
    context,
    capturedAt: new Date().toISOString(),
  }
}
