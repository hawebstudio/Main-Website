"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { readConsentState, saveConsent } from "@/lib/analytics/consent";

type ConsentDraft = { analytics: boolean; marketing: boolean };

const DEFAULT_DRAFT: ConsentDraft = { analytics: false, marketing: false };

/**
 * Site-wide cookie consent banner. Nothing analytics-related fires until
 * the visitor makes a choice here — see AnalyticsProvider for how the
 * decision is applied to GTM/GA4/Clarity via Google Consent Mode v2.
 */
export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [draft, setDraft] = useState<ConsentDraft>(DEFAULT_DRAFT);
  const preferencesRef = useRef<HTMLDivElement>(null);
  const manageRef = useRef<HTMLButtonElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  // This banner is fixed to the bottom of the viewport, so while it is on screen
  // it can sit on top of the floating WhatsApp launcher and the scroll-progress
  // control — a keyboard user could focus a control they cannot see (WCAG
  // 2.4.11, "focus not obscured"). Rather than changing the banner's appearance,
  // it publishes its own height and those controls offset themselves by it.
  // The measurement is live because the banner changes height between its two
  // views and across breakpoints; it is removed when the banner goes away.
  useEffect(() => {
    const element = bannerRef.current;
    const root = document.documentElement;
    if (!element) {
      root.style.removeProperty("--consent-banner-height");
      return;
    }
    const publish = () => {
      root.style.setProperty(
        "--consent-banner-height",
        `${Math.round(element.getBoundingClientRect().height)}px`,
      );
    };
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(element);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--consent-banner-height");
    };
  }, [visible, showPreferences]);

  // Opening the preference view from the footer's "Cookie settings" control
  // swaps the banner's contents in place. Without this, the new controls appear
  // while focus stays on the footer button behind them (WCAG 2.4.3).
  useEffect(() => {
    if (showPreferences) preferencesRef.current?.focus();
  }, [showPreferences]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!readConsentState()) setVisible(true);
    const openSettings = () => {
      const saved = readConsentState();
      setDraft({ analytics: Boolean(saved?.analytics), marketing: Boolean(saved?.marketing) });
      setShowPreferences(true);
      setVisible(true);
    };
    window.addEventListener("ha:open-cookie-settings", openSettings);
    return () => window.removeEventListener("ha:open-cookie-settings", openSettings);
  }, []);

  function acceptAll() {
    saveConsent({ analytics: true, marketing: true });
    setVisible(false);
  }

  function rejectNonEssential() {
    saveConsent({ analytics: false, marketing: false });
    setVisible(false);
  }

  function savePreferences() {
    saveConsent(draft);
    setVisible(false);
    setShowPreferences(false);
  }

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-100 border-t border-border bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:p-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        {!showPreferences ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              We use cookies to run this site and, with your permission, to
              measure traffic and improve your experience. Read our{" "}
              <Link
                href={routes.cookies()}
                className="underline underline-offset-2 hover:text-foreground"
              >
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                ref={manageRef}
                variant="ghost"
                size="sm"
                onClick={() => setShowPreferences(true)}
              >
                Manage preferences
              </Button>
              <Button variant="outline" size="sm" onClick={rejectNonEssential}>
                Reject non-essential
              </Button>
              <Button size="sm" onClick={acceptAll}>
                Accept all
              </Button>
            </div>
          </div>
        ) : (
          <div
            ref={preferencesRef}
            tabIndex={-1}
            className="flex flex-col gap-4 outline-none"
          >
            <div>
              <h2 className="text-sm font-medium text-foreground">
                Cookie preferences
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Essential cookies are always on because the site needs them to
                function. Choose which optional cookies you&apos;d like to
                allow.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border p-3">
                <p className="text-sm font-medium text-foreground">Essential</p>
                <p className="mt-1 text-xs text-muted-foreground">Always on</p>
              </div>

              <label className="flex cursor-pointer flex-col gap-1 rounded-lg border border-border p-3">
                <span className="flex items-center justify-between text-sm font-medium text-foreground">
                  Analytics
                  <input
                    type="checkbox"
                    checked={draft.analytics}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        analytics: event.target.checked,
                      }))
                    }
                    className="size-4"
                  />
                </span>
                <span className="text-xs text-muted-foreground">
                  GA4 and Microsoft Clarity session insights
                </span>
              </label>

              <label className="flex cursor-pointer flex-col gap-1 rounded-lg border border-border p-3">
                <span className="flex items-center justify-between text-sm font-medium text-foreground">
                  Marketing
                  <input
                    type="checkbox"
                    checked={draft.marketing}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        marketing: event.target.checked,
                      }))
                    }
                    className="size-4"
                  />
                </span>
                <span className="text-xs text-muted-foreground">
                  Ad personalization signals
                </span>
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowPreferences(false);
                  // "Back" collapses the preference view, so focus has to land
                  // back on the control that opened it rather than the void.
                  requestAnimationFrame(() => manageRef.current?.focus());
                }}
              >
                Back
              </Button>
              <Button variant="outline" size="sm" onClick={rejectNonEssential}>
                Reject non-essential
              </Button>
              <Button size="sm" onClick={savePreferences}>
                Save preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
