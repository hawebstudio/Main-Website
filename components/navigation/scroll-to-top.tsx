"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * ScrollToTop - compact, restrained, accessible scroll-to-top control.
 *
 * Design:
 * - Technical editorial: circular, subtle dark glass surface matching HA Web Studio styling.
 * - Colors: Navy #0B1220 background with subtle border and blue #2563EB hover accent.
 * - Geometry: size-10 (40px) on mobile, size-11 (44px) on desktop, positioned vertically
 *   above the WhatsApp button (bottom-24 right-6 sm:bottom-28 sm:right-8) to avoid overlap.
 * - Restrained motion: 200ms ease opacity/transform, disabled when prefers-reduced-motion is active.
 * - Threshold: only appears after scrolling 400px down.
 * - Accessibility: semantic <button type="button">, descriptive aria-label, visible focus ring.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 400);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      title="Scroll to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-6 bottom-24 z-40 flex size-10 items-center justify-center rounded-full border border-border/70 bg-[#0B1220]/80 text-muted-foreground shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2563EB]/60 hover:text-white hover:shadow-[0_0_15px_rgba(37,99,235,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 sm:right-8 sm:bottom-28 sm:size-11 motion-reduce:transition-none motion-reduce:hover:transform-none ${
        visible
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-3"
      }`}
    >
      <ArrowUp className="size-4.5 sm:size-5" aria-hidden="true" />
      <span className="sr-only">Back to top</span>
    </button>
  );
}
