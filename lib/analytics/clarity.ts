import Clarity from '@microsoft/clarity'
import { analyticsConfig } from './constants'

let initialized = false

/**
 * Initializes Microsoft Clarity via the official npm package. Only call
 * this once analytics consent has been granted — Clarity is a session
 * recording / heatmap tool and should not run before opt-in.
 *
 * `consentGranted` is re-applied immediately after init. This matters:
 * `applyConsent()` (lib/analytics/consent.ts) calls `setClarityConsent()`
 * *before* this function has a chance to run (Clarity isn't initialized
 * yet on first opt-in, since init only happens in response to the same
 * consent-change event), so that first call is silently dropped by the
 * `!initialized` guard below. Without re-applying here, Clarity ends up
 * initialized but never told the user actually granted consent.
 */
export function initClarity(consentGranted = true) {
  if (typeof window === 'undefined' || initialized) return

  const projectId = analyticsConfig.clarityProjectId
  if (!projectId) return

  Clarity.init(projectId)
  initialized = true
  setClarityConsent(consentGranted)
}

export function isClarityInitialized() {
  return initialized
}

export function trackClarityEvent(eventName: string) {
  if (typeof window === 'undefined' || !initialized) return

  Clarity.event(eventName)
}

export function setClarityTag(key: string, value: string | string[]) {
  if (typeof window === 'undefined' || !initialized) return

  Clarity.setTag(key, value)
}

/**
 * Identifies the current visitor. `customId` is the only required field —
 * Clarity hashes it client-side before it ever leaves the browser.
 */
export function identifyClaritySession(
  customId: string,
  customSessionId?: string,
  customPageId?: string,
  friendlyName?: string,
) {
  if (typeof window === 'undefined' || !initialized) return

  Clarity.identify(customId, customSessionId, customPageId, friendlyName)
}

/** Prioritizes the current session for recording (e.g. after a key event). */
export function upgradeClaritySession(reason: string) {
  if (typeof window === 'undefined' || !initialized) return

  Clarity.upgrade(reason)
}

/** Syncs Clarity's own cookie consent flag to the site's consent state. */
export function setClarityConsent(granted: boolean) {
  if (typeof window === 'undefined' || !initialized) return

  Clarity.consentV2({
    ad_Storage: granted ? 'granted' : 'denied',
    analytics_Storage: granted ? 'granted' : 'denied',
  })
}
