"use client";

import dynamic from "next/dynamic";
import type { Promotion } from "@/lib/content/types";

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
const ScrollToTop = dynamic(
  () => import("@/components/navigation/scroll-to-top").then((m) => m.ScrollToTop),
  { ssr: false },
);

export function DeferredGlobals({ promotion }: { promotion: Promotion | null }) {
  return (
    <>
      <MonitoringBootstrap />
      <CookieConsentBanner />
      <PromotionPopup promotion={promotion} />
      <ScrollToTop />
    </>
  );
}
