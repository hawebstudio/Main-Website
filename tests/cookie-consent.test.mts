import assert from 'node:assert/strict'
import test from 'node:test'
import fs from 'node:fs'
import path from 'node:path'
import {
  normalizeIndexNowUrls,
  indexNowOrigin,
  indexNowUrlKey,
  INDEXNOW_MAX_URLS,
} from '../lib/seo/indexnow-urls.ts'

test('site-footer.tsx imports and renders CookieSettingsButton alongside legal links', () => {
  const footerPath = path.resolve('components/navigation/site-footer.tsx')
  assert.ok(fs.existsSync(footerPath), 'site-footer.tsx must exist')

  const content = fs.readFileSync(footerPath, 'utf8')

  // Verify import
  assert.ok(
    content.includes("import { CookieSettingsButton } from '@/components/consent/cookie-settings-button'"),
    'must import CookieSettingsButton from @/components/consent/cookie-settings-button'
  )

  // Verify render in JSX
  assert.ok(
    content.includes('<CookieSettingsButton />'),
    'must render <CookieSettingsButton /> in footer JSX'
  )

  // Verify legal links structure is retained
  assert.ok(content.includes('Privacy Policy'), 'must retain Privacy Policy legal link')
  assert.ok(content.includes('Terms of Service'), 'must retain Terms of Service legal link')
  assert.ok(content.includes('Cookie Policy'), 'must retain Cookie Policy legal link')
  assert.ok(content.includes('legalLinks.map'), 'must render legal links via mapping')
})

test('cookie-settings-button.tsx dispatches ha:open-cookie-settings event to reopen preferences', () => {
  const btnPath = path.resolve('components/consent/cookie-settings-button.tsx')
  assert.ok(fs.existsSync(btnPath), 'cookie-settings-button.tsx must exist')

  const content = fs.readFileSync(btnPath, 'utf8')

  assert.ok(content.includes('"use client"'), 'must be client component')
  assert.ok(content.includes('ha:open-cookie-settings'), 'must dispatch ha:open-cookie-settings event')
  assert.ok(content.includes('Cookie settings'), 'must have clear human readable label')
})

test('cookie-consent-banner.tsx manages full lifecycle: acceptAll, rejectNonEssential, custom preferences', () => {
  const bannerPath = path.resolve('components/consent/cookie-consent-banner.tsx')
  assert.ok(fs.existsSync(bannerPath), 'cookie-consent-banner.tsx must exist')

  const content = fs.readFileSync(bannerPath, 'utf8')

  // Listens to ha:open-cookie-settings
  assert.ok(
    content.includes('addEventListener("ha:open-cookie-settings"'),
    'must listen to ha:open-cookie-settings event'
  )

  // Lifecycle methods
  assert.ok(content.includes('function acceptAll()'), 'must implement acceptAll()')
  assert.ok(content.includes('function rejectNonEssential()'), 'must implement rejectNonEssential()')
  assert.ok(content.includes('saveConsent('), 'must persist preferences via saveConsent')

  // Access and ARIA attributes
  assert.ok(content.includes('role="dialog"'), 'preferences modal must have role="dialog"')
  assert.ok(content.includes('aria-live="polite"'), 'modal must have aria-live="polite"')
  assert.ok(content.includes('aria-label="Cookie consent"'), 'modal must have aria-label="Cookie consent"')
})

test('analytics-provider.tsx and consent.ts implement Consent Mode v2 default denial and regional gating', () => {
  const consentPath = path.resolve('lib/analytics/consent.ts')
  assert.ok(fs.existsSync(consentPath), 'consent.ts must exist')

  const consentContent = fs.readFileSync(consentPath, 'utf8')
  assert.ok(consentContent.includes('CONSENT_CHANGE_EVENT = "ha:consent-change"'), 'must define consent change event')
  assert.ok(consentContent.includes('analytics: false'), 'default state must have analytics: false')
  assert.ok(consentContent.includes('marketing: false'), 'default state must have marketing: false')
  assert.ok(consentContent.includes('export function setDefaultConsentMode()'), 'must export setDefaultConsentMode')
  assert.ok(consentContent.includes('export function applyConsent('), 'must export applyConsent')
  assert.ok(consentContent.includes('export function saveConsent('), 'must export saveConsent')

  // Verify Consent Mode v2 default denied payload for opt-in regions
  assert.ok(consentContent.includes('analytics_storage: "denied"'), 'must set analytics_storage denied in opt-in regions')
  assert.ok(consentContent.includes('ad_storage: "denied"'), 'must set ad_storage denied in opt-in regions')

  const providerPath = path.resolve('components/analytics/analytics-provider.tsx')
  assert.ok(fs.existsSync(providerPath), 'analytics-provider.tsx must exist')
  const providerContent = fs.readFileSync(providerPath, 'utf8')
  assert.ok(providerContent.includes('id="consent-mode-default"'), 'must configure consent-mode-default script')
  assert.ok(providerContent.includes('strategy="beforeInteractive"'), 'consent mode default script must be beforeInteractive')
  assert.ok(providerContent.includes("analytics_storage: 'denied'"), 'must default analytics_storage to denied for opt-in regions')
  assert.ok(providerContent.includes('CONSENT_CHANGE_EVENT'), 'must listen to consent changes')
})

test('clarity.tsx gates Microsoft Clarity tracking on analytics consent', () => {
  const clarityPath = path.resolve('lib/analytics/clarity.ts')
  assert.ok(fs.existsSync(clarityPath), 'clarity.ts must exist')

  const clarityContent = fs.readFileSync(clarityPath, 'utf8')
  assert.ok(clarityContent.includes('export function setClarityConsent(granted: boolean)'), 'must export setClarityConsent')
  assert.ok(clarityContent.includes('Clarity.consentV2'), 'must call Clarity.consentV2')
  assert.ok(clarityContent.includes("analytics_Storage: granted ? 'granted' : 'denied'"), 'must propagate analytics consent to Clarity')
})

test('IndexNow URL helper normalizes, deduplicates and enforces same origin', () => {
  const host = 'https://hawebstudio.com'
  assert.equal(indexNowOrigin(host), 'https://hawebstudio.com')
  assert.equal(indexNowUrlKey('https://hawebstudio.com/services/web-development/'), 'https://hawebstudio.com/services/web-development')

  const inputList = [
    'https://hawebstudio.com/services',
    'https://hawebstudio.com/services/',
    'https://hawebstudio.com/contact',
    'https://otherdomain.com/evil',
    'relative-path-should-be-dropped',
    'https://hawebstudio.com/about',
    'https://hawebstudio.com/services',
  ]

  const normalized = normalizeIndexNowUrls(inputList, host)
  assert.deepEqual(normalized, [
    'https://hawebstudio.com/services',
    'https://hawebstudio.com/contact',
    'https://hawebstudio.com/about',
  ], 'must drop off-origin and duplicates while preserving canonical order')
})

test('IndexNow max batch limit constant is exactly 10,000 per RFC', () => {
  assert.equal(INDEXNOW_MAX_URLS, 10000)
})

test('app/api/indexnow/route.ts utilizes normalizeIndexNowUrls for payload validation', () => {
  const routePath = path.resolve('app/api/indexnow/route.ts')
  assert.ok(fs.existsSync(routePath), 'indexnow route must exist')

  const content = fs.readFileSync(routePath, 'utf8')
  assert.ok(content.includes('normalizeIndexNowUrls'), 'must import and use normalizeIndexNowUrls')
  assert.ok(content.includes('INDEXNOW_MAX_URLS'), 'must enforce INDEXNOW_MAX_URLS limit')
})
