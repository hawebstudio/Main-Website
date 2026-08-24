"use client";

import dynamic from "next/dynamic";
import type { Promotion } from "@/lib/content/types";

// None of these render anything for the first paint (web-vitals/error
// reporting bootstrap, a banner gated on "have we already seen a consent
// choice?", and a popup that only appears after a multi-second delay), so
// they're loaded as separate chunks after hydration instead of being part
// of the JS every route has to parse up front. They stay client-only
// (`ssr: false`) since they already render nothing on the server (mount
// checks / localStorage reads gate everything).
//
// This has to live in its own Client Component: `next/dynamic`'s
// `ssr: false` option is only allowed inside a Client Component, and
// app/layout.tsx is a Server Component (it reads `headers()`).
const MonitoringBootstrap = dynamic(
  () => import("@/components/monitoring/monitoring-bootstrap").then((m) => m.MonitoringBootstrap),
  { ssr: false },
);
const CookieConsentBanner = dynamic(
  () => import("@/components/consent/cookie-consent-banner").then((m) => m.CookieConsentBanner),
  { ssr: false },
);
const PromotionPopup = dynamic(
  () => import("@/components/promotions/promotion-popup").then((m) => m.PromotionPopup),
  { ssr: false },
);

export function DeferredGlobals({ promotion }: { promotion: Promotion | null }) {
  return (
    <>
      <MonitoringBootstrap />
      <CookieConsentBanner />
      <PromotionPopup promotion={promotion} />
    </>
  );
}
