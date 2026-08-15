/**
 * August Independence Day campaign — centralized config so the promotion
 * can be adjusted or fully disabled from one place, with no campaign
 * logic scattered elsewhere in the app.
 *
 * To disable the campaign entirely, set `enabled: false` below — every
 * consumer (popup, analytics) reads from this file.
 */
export const independenceDayCampaign = {
  enabled: true,

  // ISO date strings (local time). The popup is only eligible to appear
  // when today's date falls within this range.
  startDate: '2026-08-01',
  endDate: '2026-08-31',

  discountPercentage: 50,

  title: 'Independence Day Offer',
  headline: 'Build Better. Grow Faster.',
  description:
    'Get 50% off eligible HA Web Studio services during our August Independence Day offer.',
  disclaimer: 'Offer valid through August 31, 2026. Discount applies to eligible services only.',

  // Which services the discount applies to is a business decision that
  // hasn't been specified — leave empty (meaning "ask us which services
  // qualify") rather than inventing a list. Populate with real service
  // slugs from lib/data/services once decided.
  eligibleServiceSlugs: [] as string[],

  cta: { label: 'Claim the Offer', href: '/contact?intent=start-project&campaign=independence_day_50' },
  secondaryCta: { label: 'Maybe Later', href: null },

  // Random delay window (ms) before the popup is eligible to appear,
  // per §24 — never shown immediately.
  displayDelay: { min: 5000, max: 10000 },

  // localStorage key used to cap the popup at once per day per browser.
  localStorageKey: 'ha_independence_offer_last_shown',

  campaignId: 'independence_day_50',
}
