"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { CTAS } from "@/lib/data/ctas";
import { Container } from "@/components/primitives/container";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { NavLink } from "@/components/navigation/nav-link";
import { SiteSearchLazy } from "@/components/search/site-search-lazy";
import { primaryNav } from "@/config/navigation";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-100 px-2 pt-2 sm:px-4 sm:pt-4">
      <Container size="xl" className="px-0 sm:px-0 lg:px-0">
        <nav
          aria-label="Primary"
          className={cn(
            "relative flex items-center justify-between gap-2 overflow-visible rounded-2xl border px-3 py-2.5 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-3 md:px-5 lg:px-6",
            scrolled
              ? "border-foreground/15 bg-background/96 shadow-[0_10px_30px_-22px_rgba(20,24,35,0.28)]"
              : "border-foreground/10 bg-background/90 shadow-[0_8px_24px_-20px_rgba(20,24,35,0.22)]",
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_55%)]"
          />

          <Link
            href={routes.home()}
            aria-label={siteConfig.name}
            className="site-wordmark relative z-10 flex min-w-0 shrink-0 items-center gap-0.5 text-foreground sm:gap-1"
          >
            <Image
              src="/ha-web-studio-logo.webp"
              width={1152}
              height={768}
              priority
              className="size-9 shrink-0 rounded-xl object-contain sm:size-10"
              alt="HA Web Studio logo"
            />
            <span className="site-wordmark__name truncate">
              <span className="site-wordmark__descriptor">Web Studio</span>
            </span>
          </Link>

          <ul className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-xl border border-foreground/10 bg-background/60 p-1 lg:flex">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
            <SiteSearchLazy
              variant="modal"
              className="hidden lg:inline-flex"
              placeholder="Search services, technologies, case studies..."
              enableShortcut
              shortcutMedia="desktop"
            />
            <Link
              href={CTAS.requestAudit.href}
              className={cn(
                buttonVariants({
                  size: "sm",
                  className: "shrink-0 rounded-xl px-4 xl:px-5",
                }),
                "max-lg:hidden",
              )}
            >
              Get an Assessment
            </Link>
            <MobileNav items={primaryNav} />
          </div>
        </nav>
      </Container>
    </div>
  );
}
