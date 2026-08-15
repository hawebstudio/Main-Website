'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useBodyScrollLock } from '@/components/navigation/use-body-scroll-lock'
import { analyticsEvents, trackEvent } from '@/lib/analytics/events'
import type { Promotion } from '@/lib/content/types'

const TITLE_ID = 'promotion-popup-title'
const DESC_ID = 'promotion-popup-description'

interface PromotionPopupProps {
  // Sourced from `content/promotion/` via `getActivePromotion()`. When
  // there's no active promotion in that folder (or none currently falls
  // inside its start/end date window), this is `null` and the popup
  // renders nothing. Not specific to any one campaign — whatever file is
  // active today (Independence Day, Diwali, Black Friday, ...) is what
  // gets shown, using the same component.
  promotion: Promotion | null
}

function todayKey(): string {
  // Local calendar date, not a full timestamp — "once per day" per §26.
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function randomDelay(promotion: Promotion): number {
  const { min, max } = promotion.displayDelay ?? { min: 5000, max: 10000 }
  return Math.floor(min + Math.random() * (max - min))
}

function storageKeyFor(promotion: Promotion): string {
  // Keyed per-promotion (not just per-site) so switching from one active
  // campaign to the next doesn't inherit the previous campaign's
  // "already shown today" state.
  return promotion.localStorageKey ?? `ha_promo_${promotion.slug}_last_shown`
}

export function PromotionPopup({ promotion }: PromotionPopupProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  useBodyScrollLock(visible)

  // Mount check (SSR-safe) + eligibility + randomized delayed reveal.
  // Eligibility (enabled flag, campaign date window, which promotion wins
  // if several files are active) is already resolved server-side by
  // `getActivePromotion()` — if we got a `promotion` prop at all, it's
  // currently active.
  useEffect(() => {
    setMounted(true)

    if (!promotion) return

    let lastShown: string | null = null
    try {
      lastShown = window.localStorage.getItem(storageKeyFor(promotion))
    } catch {
      // localStorage unavailable (privacy mode, etc.) — treat as not shown.
    }
    if (lastShown === todayKey()) return

    const timer = window.setTimeout(() => {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null
      setVisible(true)
      try {
        window.localStorage.setItem(storageKeyFor(promotion), todayKey())
      } catch {
        // Non-fatal — worst case the popup can reappear this session.
      }
      trackEvent(analyticsEvents.promotionOfferViewed, { campaign: promotion.campaignId })
    }, randomDelay(promotion))

    return () => window.clearTimeout(timer)
     
  }, [promotion])

  // Focus the dialog on open, restore focus to whatever had it before.
  useEffect(() => {
    if (!visible) return
    closeButtonRef.current?.focus()
    return () => {
      previouslyFocusedRef.current?.focus?.()
    }
  }, [visible])

  function close(reason: 'dismiss' | 'backdrop' | 'escape') {
    setVisible(false)
    if (promotion) {
      trackEvent(analyticsEvents.promotionOfferDismissed, { campaign: promotion.campaignId, reason })
    }
  }

  function handleCtaClick() {
    if (promotion) {
      trackEvent(analyticsEvents.promotionOfferCtaClicked, { campaign: promotion.campaignId })
    }
    setVisible(false)
  }

  // ESC to close + simple Tab focus trap while open.
  useEffect(() => {
    if (!visible) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        close('escape')
        return
      }
      if (event.key !== 'Tab' || !containerRef.current) return

      const focusable = containerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  // Nothing in content/promotion/ (or nothing currently active) — render
  // nothing.
  if (!promotion || !mounted || !visible) return null

  const modal = (
    <div className="fixed inset-0 z-100 flex items-end justify-center sm:items-center sm:p-4">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={() => close('backdrop')}
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        aria-describedby={DESC_ID}
        className={cn(
          'glass-strong relative w-full max-w-md rounded-t-[2rem] p-6 shadow-2xl sm:rounded-[2rem] sm:p-8',
          'animate-in fade-in slide-in-from-bottom-4 duration-300',
        )}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => close('dismiss')}
          aria-label="Close offer"
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {promotion.title}
        </div>
        <h2 id={TITLE_ID} className="mt-3 text-2xl font-semibold tracking-tight text-balance">
          {promotion.headline}
        </h2>
        <p id={DESC_ID} className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {promotion.description}
        </p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link
            href={promotion.cta.href}
            onClick={handleCtaClick}
            className={buttonVariants({ size: 'lg', className: 'w-full justify-center sm:w-auto' })}
          >
            {promotion.cta.label}
          </Link>
          {promotion.secondaryCta && (
            <button
              type="button"
              onClick={() => close('dismiss')}
              className={buttonVariants({
                variant: 'ghost',
                size: 'lg',
                className: 'w-full justify-center sm:w-auto',
              })}
            >
              {promotion.secondaryCta.label}
            </button>
          )}
        </div>

        {promotion.disclaimer && (
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80">{promotion.disclaimer}</p>
        )}
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
