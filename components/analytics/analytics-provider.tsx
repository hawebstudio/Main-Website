"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  CONSENT_CHANGE_EVENT,
  applyConsent,
  readConsentState,
} from "@/lib/analytics/consent";
import { initClarity } from "@/lib/analytics/clarity";
import type { ConsentState } from "@/lib/analytics/types";

interface AnalyticsProviderProps {
  gaId?: string;
  gtmId?: string;
  clarityId?: string;
  nonce?: string;
}

export function AnalyticsProvider({
  gaId,
  gtmId,
  clarityId,
  nonce,
}: AnalyticsProviderProps) {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const stored = readConsentState();
    setConsent(stored);
    if (stored) applyConsent(stored);

    function handleConsentChange(event: Event) {
      setConsent((event as CustomEvent<ConsentState>).detail);
    }

    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    return () =>
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
  }, []);

  useEffect(() => {
    if (consent?.analytics && clarityId) {
      initClarity(true);
    }
  }, [consent?.analytics, clarityId]);

  const consentModeNeeded = Boolean(gtmId || gaId);

  return (
    <>
      {consentModeNeeded ? (
        <Script
          id="consent-mode-default"
          strategy="beforeInteractive"
          nonce={nonce}
          suppressHydrationWarning
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted',
              functionality_storage: 'granted',
              security_storage: 'granted'
            });
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500,
              region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH','IN','BR','CA-QC','KR','CN','ZA']
            });
            window.gtag = window.gtag || gtag;
          `}
        </Script>
      ) : null}

      {gtmId ? (
        <>
          <Script
            id="gtm-container"
            strategy="afterInteractive"
            nonce={nonce}
            suppressHydrationWarning
          >
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
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      ) : null}

      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
            nonce={nonce}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            nonce={nonce}
            suppressHydrationWarning
          >
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
  );
}
