'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { CTAS } from '@/lib/data/ctas'
import { Container } from '@/components/primitives/container'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { NavLink } from '@/components/navigation/nav-link'
import { SiteSearch } from '@/components/search/site-search'
import { primaryNav } from '@/config/navigation'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[100] px-2 pt-2 sm:px-4 sm:pt-4">
      <Container size="xl" className="px-0 sm:px-0 lg:px-0">
        <nav
          aria-label="Primary"
          className={cn(
            'relative flex items-center justify-between gap-2 overflow-visible rounded-full border px-3 py-2.5 backdrop-blur-xl transition-all duration-300 sm:gap-3 sm:px-4 sm:py-3 md:px-5 lg:px-6',
            scrolled
              ? 'border-border/80 bg-background/90 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.8)]'
              : 'border-border/65 bg-background/78 shadow-[0_14px_42px_-28px_rgba(0,0,0,0.75)]',
          )}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_32%,transparent_68%,rgba(14,165,233,0.08))]" />

          <Link
            href={routes.home()}
            className="relative z-10 flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-foreground sm:gap-3"
          >
            <Image
              src="/HAwebstudio_logo.webp"
              width={36}
              height={36}
              className="size-8 shrink-0 rounded-full object-cover sm:size-10"
              alt="HA Web Studio Logo"
            />
            <span className="hidden truncate sm:inline">{siteConfig.name}</span>
          </Link>

          <ul className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-border/60 bg-background/25 p-1 lg:flex">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
            <SiteSearch
              variant="header"
              className="min-w-0 w-[6.75rem] shrink sm:w-32 md:w-40 lg:w-48 xl:w-56"
              placeholder="Search..."
              enableShortcut
              shortcutMedia="all"
            />
            <Link
              href={CTAS.startProject.href}
              className={cn(
                buttonVariants({ size: 'sm', className: 'shrink-0 rounded-full px-4 xl:px-5' }),
                'max-lg:hidden',
              )}
            >
              {CTAS.startProject.label}
            </Link>
            <MobileNav items={primaryNav} />
          </div>
        </nav>
      </Container>
    </div>
  )
}
