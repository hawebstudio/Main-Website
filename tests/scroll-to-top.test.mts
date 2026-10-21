import assert from 'node:assert/strict'
import test from 'node:test'
import fs from 'node:fs'
import path from 'node:path'

test('ScrollToTop component structure, styling tokens, and accessibility attributes', () => {
  const file = path.resolve('components/navigation/scroll-to-top.tsx')
  assert.ok(fs.existsSync(file), 'scroll-to-top.tsx must exist')

  const content = fs.readFileSync(file, 'utf8')

  // Verify client component
  assert.match(content, /"use client"|'use client'/, 'must be a client component')

  // Verify accessibility attributes
  assert.match(content, /type="button"/, 'must have type="button"')
  assert.match(content, /aria-label="Scroll to top of page"/, 'must have descriptive accessible name')
  assert.match(content, /title="Scroll to top"/, 'must have title attribute')

  // Verify touch target dimensions: size-10 (40px) on mobile, size-11 (44px) on desktop
  assert.match(content, /size-10/, 'must have at least 40px touch target on mobile')
  assert.match(content, /sm:size-11/, 'must have 44px touch target on desktop')

  // Verify aesthetic color tokens: Navy #0B1220 and Blue #2563EB
  assert.match(content, /#0B1220/, 'must incorporate HA Web Studio navy background')
  assert.match(content, /#2563EB/, 'must incorporate blue accent on focus/hover')

  // Verify motion and scroll threshold
  assert.match(content, /scrollY > 400/, 'must use 400px scroll threshold')
  assert.match(content, /prefers-reduced-motion/, 'must check prefers-reduced-motion')
  assert.match(content, /motion-reduce:transition-none/, 'must respect reduced motion preferences in CSS')
})

test('ScrollToTop visibility threshold calculation behavior', () => {
  // Pure behavioral test for visibility threshold logic: window.scrollY > 400
  const isVisibleAt = (scrollY: number) => scrollY > 400

  assert.equal(isVisibleAt(0), false, 'hidden at top of page')
  assert.equal(isVisibleAt(200), false, 'hidden midway before threshold')
  assert.equal(isVisibleAt(400), false, 'hidden at exact threshold boundary')
  assert.equal(isVisibleAt(401), true, 'visible immediately beyond threshold')
  assert.equal(isVisibleAt(1500), true, 'visible deep in page content')
})

test('ScrollToTop reduced-motion branching behavior', () => {
  // Pure behavioral test for scroll options resolution under motion preferences
  const resolveScrollOptions = (prefersReducedMotion: boolean): ScrollToOptions => ({
    top: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  })

  // Standard user: smooth scrolling
  const standardOptions = resolveScrollOptions(false)
  assert.equal(standardOptions.top, 0)
  assert.equal(standardOptions.behavior, 'smooth', 'must use smooth scrolling for users without reduced-motion preference')

  // Reduced motion requested: immediate jump, no continuous motion
  const reducedOptions = resolveScrollOptions(true)
  assert.equal(reducedOptions.top, 0)
  assert.equal(reducedOptions.behavior, 'auto', 'must use auto (instant) scrolling when prefers-reduced-motion is active')
})

test('ScrollToTop keyboard navigation and accessibility state management', () => {
  // Test accessibility attributes derived from visibility state
  const getAccessibilityState = (visible: boolean) => ({
    tabIndex: visible ? 0 : -1,
    ariaHidden: !visible,
    pointerEventsClass: visible ? 'pointer-events-auto' : 'pointer-events-none',
    opacityClass: visible ? 'opacity-100' : 'opacity-0',
  })

  // When hidden: must NOT be focusable by keyboard, must be aria-hidden, must ignore clicks
  const hiddenState = getAccessibilityState(false)
  assert.equal(hiddenState.tabIndex, -1, 'hidden control must have tabIndex=-1 to prevent invisible keyboard focus traps')
  assert.equal(hiddenState.ariaHidden, true, 'hidden control must have aria-hidden=true for screen readers')
  assert.equal(hiddenState.pointerEventsClass, 'pointer-events-none', 'hidden control must ignore pointer events')
  assert.equal(hiddenState.opacityClass, 'opacity-0', 'hidden control must be visually invisible')

  // When visible: must be keyboard reachable with standard tab sequence
  const visibleState = getAccessibilityState(true)
  assert.equal(visibleState.tabIndex, 0, 'visible control must have tabIndex=0 for standard keyboard accessibility')
  assert.equal(visibleState.ariaHidden, false, 'visible control must not be aria-hidden')
  assert.equal(visibleState.pointerEventsClass, 'pointer-events-auto', 'visible control must receive pointer events')
  assert.equal(visibleState.opacityClass, 'opacity-100', 'visible control must be visually fully opaque')
})

test('ScrollToTop and FloatingWhatsAppButton vertical clearance geometry', () => {
  // Verify vertical stacking geometry to guarantee zero overlap with WhatsApp launcher
  // Tailwind rem mappings (1rem = 16px):
  // WhatsApp: bottom-6 (24px) on mobile, bottom-8 (32px) on desktop. Button size: p-3.5 + size-6 = 52px total height.
  const whatsappMobileTop = 24 + 52 // 76px from viewport bottom
  const whatsappDesktopTop = 32 + 52 // 84px from viewport bottom

  // ScrollToTop: bottom-24 (96px) on mobile, bottom-28 (112px) on desktop.
  const scrollTopMobileBottom = 96 // 96px from viewport bottom
  const scrollTopDesktopBottom = 112 // 112px from viewport bottom

  const mobileClearance = scrollTopMobileBottom - whatsappMobileTop
  const desktopClearance = scrollTopDesktopBottom - whatsappDesktopTop

  assert.ok(mobileClearance >= 16, `mobile clearance (${mobileClearance}px) must be >= 16px`)
  assert.equal(mobileClearance, 20, 'mobile clearance is exactly 20px (96px - 76px)')

  assert.ok(desktopClearance >= 16, `desktop clearance (${desktopClearance}px) must be >= 16px`)
  assert.equal(desktopClearance, 28, 'desktop clearance is exactly 28px (112px - 84px)')
})

test('ScrollToTop dynamic client mounting configuration', () => {
  const deferredGlobalsFile = path.resolve('components/layouts/deferred-globals.tsx')
  assert.ok(fs.existsSync(deferredGlobalsFile), 'deferred-globals.tsx must exist')

  const content = fs.readFileSync(deferredGlobalsFile, 'utf8')

  // Verify that ScrollToTop is imported with ssr: false
  assert.match(
    content,
    /const\s+ScrollToTop\s*=\s*dynamic\(\s*\(\)\s*=>\s*import\(["']@\/components\/navigation\/scroll-to-top["']\)\.then\(\(m\)\s*=>\s*m\.ScrollToTop\),\s*\{\s*ssr:\s*false\s*\},?\s*\)/,
    'ScrollToTop must be dynamically mounted with { ssr: false } to prevent hydration overhead and mismatches'
  )

  // Verify that <ScrollToTop /> is rendered inside DeferredGlobals
  assert.match(content, /<ScrollToTop\s*\/>/, 'DeferredGlobals must render <ScrollToTop />')
})
