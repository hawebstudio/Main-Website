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
    <header className="fixed inset-x-0 top-0 z-100 px-3 pt-2 sm:px-6 sm:pt-4">
      <Container size="xl" className="px-0 sm:px-0 lg:px-0">
        <nav
          aria-label="Primary"
          className={cn(
            "relative flex items-center justify-between gap-3 rounded-2xl border px-3.5 py-2.5 transition-all duration-300 sm:px-5 sm:py-3",
            scrolled
              ? "border-border/80 bg-background/95 shadow-md shadow-black/5 backdrop-blur-md"
              : "border-border/50 bg-background/85 shadow-sm backdrop-blur-sm",
          )}
        >
          <Link
            href={routes.home()}
            aria-label={siteConfig.name}
            className="site-wordmark relative z-10 flex min-w-0 shrink-0 items-center gap-1.5 text-foreground"
          >
            <Image
              src="/ha-web-studio-logo.webp"
              width={1152}
              height={768}
              priority
              className="size-9 shrink-0 rounded-xl object-contain sm:size-10"
              alt="HA Web Studio logo"
            />
            <span className="site-wordmark__name truncate font-semibold">
              <span className="site-wordmark__descriptor">Web Studio</span>
            </span>
          </Link>

          <ul className="relative z-10 hidden items-center gap-1 rounded-xl border border-border/40 bg-card/40 px-2 py-1 lg:flex">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-3">
            <SiteSearchLazy
              variant="modal"
              className="hidden lg:inline-flex"
              placeholder="Search services, tech, case studies..."
              enableShortcut
              shortcutMedia="desktop"
            />
            <Link
              href={CTAS.requestAudit.href}
              className={cn(
                buttonVariants({
                  size: "sm",
                  className: "shrink-0 rounded-xl px-4 font-medium",
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
    </header>
  );
}
