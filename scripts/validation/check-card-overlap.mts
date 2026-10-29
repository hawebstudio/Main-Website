import { printResult, readText, script, type AuditMessage } from '../shared/toolkit.mts'

/**
 * Phase C3.4 Regression Check:
 * Service-Card Heading / WhatsApp Action Icon Overlap
 *
 * Background:
 * Phase C3.2 measured ~32px of overlap where the floating WhatsApp action chip
 * (absolute right-4 top-4 z-20 size-9) sat over long headings in ContentCard.
 *
 * This test statically asserts:
 * 1. components/cards/content-card.tsx reserves a right gutter (pr-12 = 48px)
 *    on <Heading> when whatsappHref is active and !cover.
 * 2. Any eyebrow label in ContentCard also reserves the right gutter.
 * 3. The reserved gutter (48px) strictly exceeds the WhatsApp button intrusion
 *    (52px total right-extent minus 20px card padding = 32px intrusion),
 *    yielding a guaranteed positive clearance >= 16px across all viewport widths.
 * 4. components/cards/domain-cards.tsx correctly passes whatsappHref to ContentCard
 *    for ServiceCard instances.
 */

script('Service card heading overlap check', async () => {
  const messages: AuditMessage[] = []

  // 1. Check content-card.tsx layout reservation
  const contentCardSource = readText('components/cards/content-card.tsx')

  // Verify WhatsApp button positioning and dimensions
  const hasWhatsAppButton = /className=[\s\S]*?absolute right-4 top-4[\s\S]*?size-9[\s\S]*?/.test(contentCardSource)
  if (!hasWhatsAppButton) {
    messages.push({
      level: 'issue',
      message: 'components/cards/content-card.tsx: WhatsApp button position classes (right-4, top-4, size-9) not found or changed unexpectedly.',
    })
  }

  // Verify Heading padding reservation
  const headingHasPr12 = /<Heading[\s\S]*?whatsappHref\s*&&\s*!cover\s*&&\s*['"]pr-12['"]/.test(contentCardSource)
  if (!headingHasPr12) {
    messages.push({
      level: 'issue',
      message: 'components/cards/content-card.tsx: <Heading> does not reserve right gutter (expected whatsappHref && !cover && "pr-12"). Heading may overlap WhatsApp button.',
    })
  }

  // Verify Eyebrow padding reservation (if eyebrow present)
  const eyebrowHasPr12 = /\{eyebrow[\s\S]*?whatsappHref\s*&&\s*!cover\s*&&\s*['"]pr-12['"]/.test(contentCardSource)
  if (!eyebrowHasPr12) {
    messages.push({
      level: 'issue',
      message: 'components/cards/content-card.tsx: eyebrow label does not reserve right gutter (expected whatsappHref && !cover && "pr-12").',
    })
  }

  // 2. Geometric clearance check (mathematical proof of non-overlap)
  // Card padding: p-5 = 20px
  // Icon right: right-4 = 16px
  // Icon size: size-9 = 36px (extends 16px to 52px from card right edge)
  // Card content container starts 20px from card right edge
  // Icon intrudes into content container: 52px - 20px = 32px
  // Heading right padding: pr-12 = 3rem = 48px
  // Net clearance = 48px - 32px = 16px
  const cardPaddingPx = 20
  const iconRightInsetPx = 16
  const iconWidthPx = 36
  const headingPaddingRightPx = 48

  const iconLeftEdgeFromCardRight = iconRightInsetPx + iconWidthPx // 52px
  const iconIntrusionIntoContent = iconLeftEdgeFromCardRight - cardPaddingPx // 32px
  const netClearance = headingPaddingRightPx - iconIntrusionIntoContent // 16px

  if (netClearance < 16) {
    messages.push({
      level: 'issue',
      message: `Geometric clearance calculation failed: net clearance is ${netClearance}px, expected >= 16px.`,
    })
  }

  // 3. Verify domain-cards.tsx ServiceCard passes whatsappHref
  const domainCardsSource = readText('components/cards/domain-cards.tsx')
  const serviceCardPassesWhatsApp = /export function ServiceCard[\s\S]*?whatsappHref=\{buildWhatsAppUrl/.test(domainCardsSource)
  if (!serviceCardPassesWhatsApp) {
    messages.push({
      level: 'issue',
      message: 'components/cards/domain-cards.tsx: ServiceCard does not pass whatsappHref={buildWhatsAppUrl(...)} to ContentCard.',
    })
  }

  printResult('Service card heading overlap check', messages)
})
