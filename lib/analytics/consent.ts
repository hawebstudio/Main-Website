import { analyticsConfig } from "./constants";
import { setClarityConsent } from "./clarity";
import type { ConsentState } from "./types";

/** Fired on window whenever consent is read or changed, so UI stays in sync. */
export const CONSENT_CHANGE_EVENT = "ha:consent-change";

export function defaultConsentState(): ConsentState {
  return {
    analytics: false,
    marketing: false,
    updatedAt: new Date().toISOString(),
  };
}

export function readConsentState(): ConsentState | null {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(analyticsConfig.consentStorageKey);
  if (!value) return null;

  try {
    return JSON.parse(value) as ConsentState;
  } catch {
    return null;
  }
}

export function writeConsentState(
  consent: Omit<ConsentState, "updatedAt">,
): ConsentState {
  const state = { ...consent, updatedAt: new Date().toISOString() };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      analyticsConfig.consentStorageKey,
      JSON.stringify(state),
    );
    window.dispatchEvent(
      new CustomEvent<ConsentState>(CONSENT_CHANGE_EVENT, { detail: state }),
    );
  }

  return state;
}

/**
 * Sets Google Consent Mode v2 defaults. Must run before GTM/gtag.js loads
 * so the very first tag firing already respects the visitor's (denied)
 * defaults — this is the "wait_for_update" pattern Google recommends.
 */
export function setDefaultConsentMode() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => window.dataLayer!.push(args);

  // Broad default: most regions have no opt-in consent requirement, so
  // analytics/ads storage can start granted there.
  gtag("consent", "default", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
    functionality_storage: "granted",
    security_storage: "granted",
  });

  // Regional override: EEA + UK + Switzerland require opt-in consent, so
  // these regions start denied until the visitor explicitly grants it.
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
    region: [
      "AT",
      "BE",
      "BG",
      "HR",
      "CY",
      "CZ",
      "DK",
      "EE",
      "FI",
      "FR",
      "DE",
      "GR",
      "HU",
      "IS",
      "IE",
      "IT",
      "LV",
      "LI",
      "LT",
      "LU",
      "MT",
      "NL",
      "NO",
      "PL",
      "PT",
      "RO",
      "SK",
      "SI",
      "ES",
      "SE",
      "GB",
      "CH",
      // Non-EEA jurisdictions with opt-in consent requirements
      "IN", // India — DPDPA
      "BR", // Brazil — LGPD
      "CA-QC", // Quebec — Law 25 (federal Canada/PIPEDA is opt-out, so only Quebec is listed)
      "KR", // South Korea — PIPA
      "CN", // China — PIPL
      "ZA", // South Africa — POPIA
    ],
  });

  window.gtag = window.gtag ?? gtag;
}

/** Pushes an updated consent decision to GTM/gtag (Consent Mode v2) and Clarity. */
export function applyConsent(
  consent: Pick<ConsentState, "analytics" | "marketing">,
) {
  if (typeof window === "undefined") return;

  window.gtag?.("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });

  setClarityConsent(consent.analytics);
}

/** Persists the visitor's choice and immediately propagates it to every provider. */
export function saveConsent(
  consent: Pick<ConsentState, "analytics" | "marketing">,
): ConsentState {
  const state = writeConsentState(consent);
  applyConsent(consent);
  return state;
}
