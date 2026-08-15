# Promotions

Drop one `.mdx` file per promotion in this folder to run it. The popup
(`components/promotions/promotion-popup.tsx`) and the contact form banner
(`components/promotions/promotion-banner.tsx`) both read from here via
`getActivePromotion()` in `lib/content/source.ts` — there is nothing else
to wire up. Neither component knows or cares which holiday it's showing;
whatever file is active today is what renders.

If this folder is empty (or every file's `enabled`/date fields make it
inactive), the popup and the contact form banner render nothing.

## Multiple files at once

You can keep any number of `.mdx` files here — one per campaign — and
each one only shows during its own `startDate`–`endDate` window. As soon
as today falls outside a file's window, it stops being eligible
automatically; no need to delete it or flip `enabled` off by hand.

This folder ships with one file per major global holiday/shopping event,
each with its own non-overlapping window so they rotate in and out on
their own:

| File | Window (2026–27) |
| --- | --- |
| `independence-day.mdx` | Aug 1 – Aug 31, 2026 |
| `diwali.mdx` | Nov 1 – Nov 10, 2026 |
| `black-friday-cyber-monday.mdx` | Nov 23 – Nov 30, 2026 |
| `christmas.mdx` | Dec 15 – Dec 25, 2026 |
| `new-year.mdx` | Dec 26, 2026 – Jan 5, 2027 |
| `lunar-new-year.mdx` | Feb 1 – Feb 6, 2027 |
| `valentines-day.mdx` | Feb 7 – Feb 14, 2027 |
| `eid-al-fitr.mdx` | Mar 8 – Mar 11, 2027 |

Diwali, Lunar New Year, and Eid al-Fitr follow lunar/lunisolar calendars,
so their Gregorian dates shift every year — double-check the actual date
each year and update `startDate`/`endDate` accordingly (each file has a
note on where its date came from).

If you add a new file whose window happens to **overlap** an existing
one, only one promotion is ever shown at a time — the one with the higher
`priority` wins the tie. With the calendar above there's no overlap, so
`priority` isn't doing any tie-breaking work yet, but it's there for when
you need it.

## How "active" is decided

A promotion is shown when **all** of the following are true:

- `enabled: true` (or omitted — defaults to `true`)
- today's date falls between `startDate` and `endDate` (inclusive)
- its content `status` isn't `draft`/`review`/`archived` (defaults to
  `published` when omitted)

If more than one file is active at the same time, the one with the
highest `priority` wins.

## Frontmatter reference

```yaml
slug: independence-day        # kebab-case, must be unique
title: "Independence Day Offer"   # small eyebrow label shown above the headline
description: "..."                # shown as the popup body copy
enabled: true
startDate: "2026-08-01"        # inclusive
endDate: "2026-08-31"          # inclusive
headline: "Build Better. Grow Faster."   # large popup heading
discountPercentage: 50         # optional, shown on the contact form banner
eligibleServiceSlugs: []       # optional, informational only for now
cta:
  label: "Claim the Offer"
  href: "/contact?intent=start-project&campaign=independence_day_50"
secondaryCta:                  # optional
  label: "Maybe Later"
  href: null
disclaimer: "Offer valid through August 31, 2026. ..."   # optional fine print
displayDelay:                  # optional, popup reveal delay in ms
  min: 5000
  max: 10000
localStorageKey: "ha_independence_offer_last_shown"   # optional, defaults to "ha_promo_<slug>_last_shown"
campaignId: "independence_day_50"   # used for analytics + ?campaign= attribution
priority: 10                   # optional, higher wins if multiple promos are active
```

To pause a promotion without deleting it, set `enabled: false`. To end it
for good, delete the file (or move it out of this folder).
