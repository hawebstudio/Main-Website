'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { NavLink } from '@/components/navigation/nav-link'
import { CTAS } from '@/lib/data/ctas'
import type { NavItem } from '@/lib/content/types'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  items: NavItem[]
}

/**
 * MobileNav — client island for the small-screen menu.
 * Closes automatically on route change; supports Escape and backdrop dismiss.
 */
export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const panelId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    function onSearchOpen() {
      setOpen(false)
    }
    window.addEventListener('ha-search-open', onSearchOpen)
    return () => window.removeEventListener('ha-search-open', onSearchOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const overlay = open && mounted ? (
    <div className="fixed inset-0 z-[105] lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-transparent"
        onClick={() => setOpen(false)}
      />

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="absolute inset-x-3 top-[5.5rem] flex max-h-[calc(100dvh-6.5rem)] flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-background shadow-[0_24px_70px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:inset-x-4 md:left-auto md:right-4 md:w-[26rem]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_32%,transparent_68%,rgba(14,165,233,0.08))]" />

        <div className="relative border-b border-border/60 px-5 py-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
            Navigation
          </div>
          <div className="mt-1.5 text-sm text-muted-foreground">Quick access to the main sections.</div>
        </div>

        <div className="relative min-h-0 flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col gap-1 rounded-full border border-border/60 bg-background/25 p-1.5">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink
                  item={item}
                  className="flex w-full px-4 py-3 text-base"
                  onNavigate={() => setOpen(false)}
                />
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-border/60 pt-4">
            <Link
              href={CTAS.startProject.href}
              className={buttonVariants({ className: 'w-full rounded-full px-5' })}
              onClick={() => setOpen(false)}
            >
              {CTAS.startProject.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : null

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className={cn(
          'rounded-full border border-border/60 bg-background/55 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background/80',
          open && 'border-primary/35 bg-primary/10',
        )}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </div>
  )
}
