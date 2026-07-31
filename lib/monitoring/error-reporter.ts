/**
 * Error Reporter
 * Captures and reports client-side errors
 */

export interface ErrorReport {
  id: string
  message: string
  stack?: string
  url: string
  userAgent: string
  timestamp: string
  userId?: string
  sessionId?: string
  additionalData?: Record<string, unknown>
}

export interface ErrorReporterConfig {
  reportToConsole?: boolean
  reportToService?: boolean
  serviceUrl?: string
  sampleRate?: number
}

class ErrorReporter {
  private config: ErrorReporterConfig
  private sessionId: string

  constructor(config: ErrorReporterConfig = {}) {
    this.config = {
      reportToConsole: true,
      reportToService: false,
      sampleRate: 1,
      ...config,
    }
    this.sessionId = this.generateSessionId()
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(7)}`
  }

  /**
   * Capture error
   */
  captureError(error: Error, additionalData?: Record<string, unknown>): void {
    // Sample rate check
    if (this.config.sampleRate && Math.random() > this.config.sampleRate) {
      return
    }

    const report: ErrorReport = {
      id: this.generateSessionId(),
      message: error.message,
      stack: error.stack,
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      additionalData,
    }

    if (this.config.reportToConsole) {
      console.error('[Error Reporter]', error, report)
    }

    if (this.config.reportToService && this.config.serviceUrl) {
      this.sendToService(report)
    }
  }

  /**
   * Send error to service
   */
  private async sendToService(report: ErrorReport): Promise<void> {
    try {
      await fetch(this.config.serviceUrl!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      })
    } catch (error) {
      console.error('Failed to send error to service:', error)
    }
  }

  /**
   * Setup global error handlers
   */
  setupGlobalHandlers(): void {
    if (typeof window === 'undefined') return

    // Unhandled errors
    window.addEventListener('error', (event) => {
      this.captureError(event.error || new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      })
    })

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError(
        event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        {
          type: 'unhandledrejection',
        }
      )
    })
  }
}

/**
 * Create error reporter instance
 */
export function createErrorReporter(config?: ErrorReporterConfig): ErrorReporter {
  return new ErrorReporter(config)
}

/**
 * Global error reporter instance
 */
let globalErrorReporter: ErrorReporter | null = null

/**
 * Initialize global error reporter
 */
export function initErrorReporter(config?: ErrorReporterConfig): void {
  globalErrorReporter = createErrorReporter(config)
  globalErrorReporter.setupGlobalHandlers()
}

/**
 * Capture error with global reporter
 */
export function captureError(error: Error, additionalData?: Record<string, unknown>): void {
  if (globalErrorReporter) {
    globalErrorReporter.captureError(error, additionalData)
  }
}
