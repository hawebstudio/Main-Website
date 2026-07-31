'use client'

import { useEffect } from 'react'
import { initErrorReporter, observeWebVitals, reportNavigationTiming } from '@/lib/monitoring'

let monitoringStarted = false

export function MonitoringBootstrap() {
  useEffect(() => {
    if (monitoringStarted || typeof window === 'undefined') {
      return
    }

    monitoringStarted = true
    observeWebVitals({ reportToAnalytics: true })
    reportNavigationTiming({ reportToAnalytics: true })
    initErrorReporter({ reportToConsole: false, reportToService: false, sampleRate: 1 })
  }, [])

  return null
}