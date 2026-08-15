'use client'

import { useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { analyticsEvents, trackEvent } from '@/lib/analytics/events'
import type { Promotion } from '@/lib/content/types'

interface PromotionBannerProps {
  // Sourced from `content/promotion/` via `getActivePromotion()`. When
  // there's no active promotion, this is `null` and nothing renders.
  promotion: Promotion | null
  className?: string
}

/**
 * Small inline banner surfacing the active promotion on the contact page.
 * Renders nothing when `content/promotion/` has no eligible entry.
 */
export function PromotionBanner({ promotion, className }: PromotionBannerProps) {
  useEffect(() => {
    if (!promotion) return
    trackEvent(analyticsEvents.promotionBannerViewed, { campaign: promotion.campaignId })
  }, [promotion])

  if (!promotion) return null

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4',
        className,
      )}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Sparkles className="size-4" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {promotion.title}
          </span>
          {typeof promotion.discountPercentage === 'number' && (
            <span className="text-xs font-semibold text-primary">
              {promotion.discountPercentage}% off
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{promotion.description}</p>
        {promotion.disclaimer && (
          <p className="text-xs leading-relaxed text-muted-foreground/80">{promotion.disclaimer}</p>
        )}
      </div>
    </div>
  )
}
