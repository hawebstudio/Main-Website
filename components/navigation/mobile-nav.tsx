'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { useBodyScrollLock } from '@/components/navigation/use-body-scroll-lock'
import { SiteSearchLazy } from '@/components/search/site-search-lazy'
import { CTAS } from '@/lib/data/ctas'
import type { NavItem } from '@/lib/content/types'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  items: NavItem[]
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const panelId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useBodyScrollLock(open)

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

  function closeMenu() {
    setOpen(false)
    toggleRef.current?.focus()
  }

  useEffect(() => {
    if (!open || !mounted) return
    panelRef.current?.focus()
  }, [mounted, open])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }
      if (event.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      if (active === panel || !panel.contains(active)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
        return
      }
      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const overlay = open && mounted ? (
    <div className="fixed inset-0 z-[105] lg:hidden">
      {/* Dark scrim backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeMenu}
      />

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        tabIndex={-1}
        className="absolute inset-x-3 top-20 flex max-h-[calc(100dvh-5.5rem)] max-w-md mx-auto flex-col overflow-hidden rounded-2xl border border-border/70 bg-background shadow-2xl outline-none sm:inset-x-4 md:right-4 md:left-auto md:w-[24rem]"
      >
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              Navigation
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">Quick access to main sections</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close navigation menu"
            className="size-8 rounded-full hover:bg-muted"
            onClick={closeMenu}
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="border-b border-border/60 p-4">
          <SiteSearchLazy
            variant="mobile"
            placeholder="Search the site..."
            className="w-full"
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 space-y-4">
          <ul className="flex flex-col gap-1.5">
            {items.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold border border-primary/20'
                        : 'text-foreground/80 hover:bg-muted/70 hover:text-foreground',
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="pt-2">
            <Link
              href={CTAS.requestAudit.href}
              className={buttonVariants({ className: 'w-full rounded-xl px-5 py-2.5 font-medium shadow-sm' })}
              onClick={() => setOpen(false)}
            >
              {CTAS.requestAudit.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : null

  return (
    <div className="lg:hidden">
      <Button
        ref={toggleRef}
        variant="ghost"
        size="icon"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className={cn(
          'size-9 rounded-xl border border-border/60 bg-background/55 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background/80',
          open && 'border-primary/40 bg-primary/10',
        )}
        onClick={() => (open ? closeMenu() : setOpen(true))}
      >
        {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
      </Button>

      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </div>
  )
}
