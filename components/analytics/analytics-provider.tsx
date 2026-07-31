'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { CONSENT_CHANGE_EVENT, applyConsent, readConsentState } from '@/lib/analytics/consent'
import { initClarity } from '@/lib/analytics/clarity'
import type { ConsentState } from '@/lib/analytics/types'

interface AnalyticsProviderProps {
  gaId?: string
  gtmId?: string
  clarityId?: string
  /** CSP nonce for the current request, read from middleware in the root layout. */
  nonce?: string
}

/**
 * Loads GTM, GA4, and Clarity per Google's Consent Mode v2 pattern:
 *
 * - Consent defaults (all denied except strictly-necessary storage) are set
 *   before anything else runs, so the very first tag fired already respects
 *   the visitor's choice.
 * - GTM is the tag-delivery container — it loads unconditionally, and its
 *   own tags decide what to do based on the consent signals above.
 * - GA4 (direct gtag.js) and Clarity are only initialized once the visitor
 *   has actively granted analytics consent (Basic Consent Mode for the
 *   tags we load ourselves).
 *
 * Ids are passed in as props from the server layout rather than read from
 * `process.env` in this client component, so a non `NEXT_PUBLIC_`-prefixed
 * var like `GOOGLE_TAG_MANAGER_ID` still reaches the browser correctly.
 */
export function AnalyticsProvider({ gaId, gtmId, clarityId, nonce }: AnalyticsProviderProps) {
  const [consent, setConsent] = useState<ConsentState | null>(null)

  useEffect(() => {
    const stored = readConsentState()
    setConsent(stored)
    if (stored) applyConsent(stored)

    function handleConsentChange(event: Event) {
      setConsent((event as CustomEvent<ConsentState>).detail)
    }

    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange)
  }, [])

  useEffect(() => {
    if (consent?.analytics && clarityId) {
      initClarity(true)
    }
  }, [consent?.analytics, clarityId])

  const analyticsGranted = consent?.analytics === true
  const consentModeNeeded = Boolean(gtmId || gaId)

  return (
    <>
      {consentModeNeeded ? (
        <Script id="consent-mode-default" strategy="beforeInteractive" nonce={nonce} suppressHydrationWarning>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500
            });
            window.gtag = window.gtag || gtag;
          `}
        </Script>
      ) : null}

      {gtmId ? (
        <>
          <Script id="gtm-container" strategy="afterInteractive" nonce={nonce} suppressHydrationWarning>
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      ) : null}

      {gaId && analyticsGranted ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive" nonce={nonce} suppressHydrationWarning>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
    </>
  )
}
