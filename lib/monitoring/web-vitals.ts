/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals for performance monitoring
 */

export interface WebVitalsReport {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  entries: PerformanceEntry[];
  navigationType: string;
}

export interface WebVitalsConfig {
  reportThreshold?: number;
  reportToAnalytics?: boolean;
  reportToConsole?: boolean;
}

import { webVitalThresholds } from "./constants";

// Extended PerformanceEntry types
interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

interface LCPEntry extends PerformanceEntry {
  id: string;
  loadEventEnd?: number;
  navigationType?: string;
}

interface FIDEntry extends PerformanceEntry {
  id: string;
  processingStart: number;
  name: string;
}

/**
 * Get rating for a metric
 */
function getRating(
  name: string,
  value: number,
): "good" | "needs-improvement" | "poor" {
  const threshold = webVitalThresholds[name as keyof typeof webVitalThresholds];
  if (!threshold) return "good";

  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs-improvement";
  return "poor";
}

/**
 * Report web vital
 */
export function reportWebVital(
  metric: WebVitalsReport,
  config: WebVitalsConfig = {},
): void {
  const { reportToAnalytics = true, reportToConsole = false } = config;

  if (reportToConsole) {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }

  if (reportToAnalytics) {
    // Send to analytics service (Vercel Analytics, Google Analytics, etc.)
    if (typeof window !== "undefined" && window.va) {
      window.va("event", {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
      });
    }
  }
}

/**
 * Observe web vitals
 */
export function observeWebVitals(config: WebVitalsConfig = {}): void {
  if (typeof window === "undefined") return;

  // Largest Contentful Paint
  if ("PerformanceObserver" in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const entry = entries[entries.length - 1] as LCPEntry;

        reportWebVital(
          {
            id: entry.id,
            name: "LCP",
            value: entry.startTime,
            rating: getRating("LCP", entry.startTime),
            delta: entry.startTime - (entry.loadEventEnd || 0),
            entries,
            navigationType: entry.navigationType || "navigation",
          },
          config,
        );
      });

      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      console.warn("LCP observation failed:", e);
    }

    // First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const entry = entries[0] as FIDEntry;

        reportWebVital(
          {
            id: entry.id,
            name: "FID",
            value: entry.processingStart - entry.startTime,
            rating: getRating("FID", entry.processingStart - entry.startTime),
            delta: entry.processingStart - entry.startTime,
            entries,
            navigationType: entry.name,
          },
          config,
        );
      });

      fidObserver.observe({ entryTypes: ["first-input"] });
    } catch (e) {
      console.warn("FID observation failed:", e);
    }

    // Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          const layoutEntry = entry as LayoutShiftEntry;
          if (!layoutEntry.hadRecentInput) {
            clsValue += layoutEntry.value;
          }
        }

        reportWebVital(
          {
            id: "cls",
            name: "CLS",
            value: clsValue,
            rating: getRating("CLS", clsValue),
            delta: clsValue,
            entries,
            navigationType: "CLS",
          },
          config,
        );
      });

      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      console.warn("CLS observation failed:", e);
    }

    // First Contentful Paint
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const entry = entries[0] as FIDEntry;

        reportWebVital(
          {
            id: entry.id,
            name: "FCP",
            value: entry.startTime,
            rating: getRating("FCP", entry.startTime),
            delta: entry.startTime,
            entries,
            navigationType: entry.name,
          },
          config,
        );
      });

      fcpObserver.observe({ entryTypes: ["paint"] });
    } catch (e) {
      console.warn("FCP observation failed:", e);
    }
  }
}

/**
 * Get navigation timing
 */
export function getNavigationTiming(): {
  ttfb: number;
  domContentLoaded: number;
  loadComplete: number;
} | null {
  if (typeof window === "undefined" || !performance.timing) return null;

  const timing = performance.timing;
  const navigationStart = timing.navigationStart;

  return {
    ttfb: timing.responseStart - navigationStart,
    domContentLoaded: timing.domContentLoadedEventEnd - navigationStart,
    loadComplete: timing.loadEventEnd - navigationStart,
  };
}

/**
 * Report navigation timing
 */
export function reportNavigationTiming(config: WebVitalsConfig = {}): void {
  const timing = getNavigationTiming();
  if (!timing) return;

  reportWebVital(
    {
      id: "ttfb",
      name: "TTFB",
      value: timing.ttfb,
      rating: getRating("TTFB", timing.ttfb),
      delta: timing.ttfb,
      entries: [],
      navigationType: "navigation",
    },
    config,
  );
}
