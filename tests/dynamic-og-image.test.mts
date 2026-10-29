import assert from 'node:assert/strict'
import test from 'node:test'
import fs from 'node:fs'
import path from 'node:path'

// ---------------------------------------------------------------------------
// WCAG 2.2 Relative Luminance and Contrast Calculator
// ---------------------------------------------------------------------------
function calculateLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function calculateContrast(hex1: string, hex2: string): number {
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
  const [r1, g1, b1] = parse(hex1)
  const [r2, g2, b2] = parse(hex2)
  const l1 = calculateLuminance(r1, g1, b1)
  const l2 = calculateLuminance(r2, g2, b2)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

// ---------------------------------------------------------------------------
// 1. Structural & Configuration Invariant Tests
// ---------------------------------------------------------------------------

test('dynamic OG image route exists, uses nodejs runtime, and targets 1200x630 canvas', () => {
  const routeFile = path.resolve('app/api/og/route.tsx')
  assert.ok(fs.existsSync(routeFile), 'app/api/og/route.tsx must exist')

  const content = fs.readFileSync(routeFile, 'utf8')

  // Runtime assertion
  assert.match(
    content,
    /export const runtime = ['"]nodejs['"]/,
    'OG route must use nodejs runtime for deterministic asset loading',
  )

  // Canvas dimension assertions
  assert.match(content, /const WIDTH = 1200/, 'Canvas width must be 1200px')
  assert.match(content, /const HEIGHT = 630/, 'Canvas height must be 630px')
  assert.match(content, /width: WIDTH/, 'ImageResponse must specify width: WIDTH')
  assert.match(content, /height: HEIGHT/, 'ImageResponse must specify height: HEIGHT')
})

test('dynamic OG image implements warm editorial color palette and design tokens', () => {
  const routeFile = path.resolve('app/api/og/route.tsx')
  const content = fs.readFileSync(routeFile, 'utf8')

  // Editorial palette tokens
  assert.match(content, /CANVAS_BG = '#fcfbf8'/, 'Canvas background must be warm cream #fcfbf8')
  assert.match(content, /CARD_BG = '#ffffff'/, 'Card background must be clean white #ffffff')
  assert.match(content, /BRAND_INK = '#1a161e'/, 'Headline must use high-contrast dark ink #1a161e')
  assert.match(content, /BRAND_PRIMARY = '#51283e'/, 'Must use HA luxury plum #51283e accent')
  assert.match(content, /BRAND_BRONZE_GOLD = '#7b5914'/, 'Must use accessible deep bronze gold #7b5914 for normal text')
  assert.match(content, /BRAND_BLUE = '#0969da'/, 'Must use studio engineering blue #0969da accent')
})

test('color tokens mathematically meet WCAG 2.2 AA and AAA contrast requirements', () => {
  const cardBg = '#ffffff'
  const headlineInk = '#1a161e'
  const brandPlum = '#51283e'
  const bronzeGold = '#7b5914'
  const mutedNeutral = '#625b62'

  // Headline ink: AAA requires >= 7.0:1
  const headlineContrast = calculateContrast(headlineInk, cardBg)
  assert.ok(
    headlineContrast >= 7.0,
    `Headline contrast must meet WCAG AAA (>= 7.0:1). Measured: ${headlineContrast.toFixed(2)}:1`,
  )

  // Brand plum: AAA requires >= 7.0:1
  const plumContrast = calculateContrast(brandPlum, cardBg)
  assert.ok(
    plumContrast >= 7.0,
    `Brand plum contrast must meet WCAG AAA (>= 7.0:1). Measured: ${plumContrast.toFixed(2)}:1`,
  )

  // Bronze gold kicker: normal text (< 18.66px bold) requires >= 4.5:1 for WCAG AA
  const goldContrast = calculateContrast(bronzeGold, cardBg)
  assert.ok(
    goldContrast >= 4.5,
    `Kicker text contrast must meet WCAG AA (>= 4.5:1). Measured: ${goldContrast.toFixed(2)}:1`,
  )

  // Muted neutral: normal text requires >= 4.5:1 for WCAG AA
  const mutedContrast = calculateContrast(mutedNeutral, cardBg)
  assert.ok(
    mutedContrast >= 4.5,
    `Muted text contrast must meet WCAG AA (>= 4.5:1). Measured: ${mutedContrast.toFixed(2)}:1`,
  )
})

test('dynamic OG image handles headline scaling and avoids dense multi-line body descriptions', () => {
  const routeFile = path.resolve('app/api/og/route.tsx')
  const content = fs.readFileSync(routeFile, 'utf8')

  // Dynamic font sizing
  assert.match(content, /getTitleFontSize/, 'Must implement dynamic title font sizing')
  assert.match(content, /length <= 40.*return 64/, 'Short titles must render at 64px bold')
  assert.match(content, /length <= 70.*return 56/, 'Medium titles must render at 56px bold')
  assert.match(content, /return 48/, 'Long titles must scale down to 48px to prevent overflow')

  // Description treatment: omit dense paragraph text on long titles to preserve thumbnail legibility
  assert.match(
    content,
    /title\.length <= 45 && rawDesc/,
    'Description/subtitle must only render for short titles (<= 45 chars) to prevent thumbnail crowding',
  )
})

test('dynamic OG image integrates official logo mark and brand signature', () => {
  const routeFile = path.resolve('app/api/og/route.tsx')
  const content = fs.readFileSync(routeFile, 'utf8')

  // Brand logo import and asset resolution
  assert.match(content, /import \{ BRAND_LOGO_DATA_URI \} from '\.\/brand-logo'/, 'Must import BRAND_LOGO_DATA_URI')
  assert.match(content, /BRAND_LOGO_DATA_URI/, 'Must fallback to BRAND_LOGO_DATA_URI')

  // Wordmark branding
  assert.match(content, /Web Studio/, 'Must display studio name')
  assert.match(content, /Digital Engineering/, 'Must display studio descriptor')
})

test('dynamic OG image preserves founder identity strictly as M.A. Malik', () => {
  const routeFile = path.resolve('app/api/og/route.tsx')
  const content = fs.readFileSync(routeFile, 'utf8')

  assert.match(
    content,
    /M\.A\. Malik · Founder & Principal/,
    'Founder identity must strictly be "M.A. Malik · Founder & Principal"',
  )

  // Ensure no unintended names or private identities leak
  assert.doesNotMatch(content, /Mohd/i, 'Must not expose private personal names')
  assert.doesNotMatch(content, /Asif/i, 'Must not expose private personal names')
})

test('dynamic OG image footer includes domain, live indicator and 3-color studio motif', () => {
  const routeFile = path.resolve('app/api/og/route.tsx')
  const content = fs.readFileSync(routeFile, 'utf8')

  assert.match(content, /hawebstudio\.com/, 'Footer must display studio domain')
  assert.match(content, /#10b981/, 'Footer must include active emerald indicator dot')
  assert.match(content, /BRAND_PRIMARY.*BRAND_GOLD_MOTIF.*BRAND_BLUE/s, 'Footer must display studio 3-color dot motif')
})

test('brand logo asset file exports valid base64 PNG data URI', () => {
  const logoFile = path.resolve('app/api/og/brand-logo.ts')
  assert.ok(fs.existsSync(logoFile), 'app/api/og/brand-logo.ts must exist')

  const content = fs.readFileSync(logoFile, 'utf8')
  assert.match(content, /export const BRAND_LOGO_DATA_URI = 'data:image\/png;base64,/, 'Must export valid data URI')

  const base64Data = content.split('base64,')[1]?.replace(/[';\s\n]/g, '')
  assert.ok(base64Data && base64Data.length > 500, 'Base64 data must be populated')

  // Verify PNG signature (iVBORw0KGgo)
  assert.ok(base64Data.startsWith('iVBORw0KGgo'), 'Base64 data must start with PNG magic header')
})

test('lib/seo/images/index.ts correctly builds dynamic OG URLs with parameters', () => {
  const imageHelperFile = path.resolve('lib/seo/images/index.ts')
  assert.ok(fs.existsSync(imageHelperFile), 'lib/seo/images/index.ts must exist')

  const content = fs.readFileSync(imageHelperFile, 'utf8')
  assert.match(content, /export function dynamicOgImageUrl/, 'Must export dynamicOgImageUrl')
  assert.match(content, /\/api\/og\?/, 'Must target /api/og endpoint')
  assert.match(content, /width: 1200/, 'Must specify width: 1200 in openGraphImage')
  assert.match(content, /height: 630/, 'Must specify height: 630 in openGraphImage')
})

// ---------------------------------------------------------------------------
// 2. Behavioral End-to-End HTTP & Binary Verification Tests
// ---------------------------------------------------------------------------

test('behavioral HTTP verification: live /api/og endpoint emits valid 1200x630 PNG with correct headers', async () => {
  const url = 'http://localhost:3001/api/og?title=Choosing+the+Right+CMS%3A+WordPress+vs+Sanity+vs+Payload+CMS&eyebrow=Insight'

  let res: Response
  try {
    res = await fetch(url)
  } catch (err) {
    // If dev server port 3001 is offline in an isolated CI run, skip the live fetch step gracefully
    console.warn('Dev server on port 3001 not reachable; skipping live HTTP fetch test.')
    return
  }

  assert.equal(res.status, 200, 'HTTP status must be 200 OK')
  assert.equal(res.headers.get('content-type'), 'image/png', 'Content-Type header must be image/png')

  const cacheControl = res.headers.get('cache-control') ?? ''
  assert.ok(cacheControl.includes('public'), 'Cache-Control must be public')
  assert.ok(cacheControl.includes('max-age=3600'), 'Browser max-age must be 1 hour')
  assert.ok(cacheControl.includes('s-maxage=86400'), 'CDN s-maxage must be 24 hours')
  assert.ok(!cacheControl.includes('immutable'), 'Unversioned dynamic OG URL must not be marked immutable')

  const buffer = Buffer.from(await res.arrayBuffer())

  // Assert minimum valid PNG size (> 15 KB, < 150 KB)
  assert.ok(buffer.length > 15000, `Generated PNG should be substantial. Actual: ${buffer.length} bytes`)
  assert.ok(buffer.length < 150000, `Generated PNG should be lightweight (<150KB). Actual: ${buffer.length} bytes`)

  // Binary PNG Magic Signature: 89 50 4E 47 0D 0A 1A 0A
  const pngMagic = buffer.subarray(0, 8).toString('hex')
  assert.equal(pngMagic, '89504e470d0a1a0a', 'Response payload must be a valid binary PNG')

  // Read IHDR chunk dimensions (offset 16: width, offset 20: height)
  const width = buffer.readUInt32BE(16)
  const height = buffer.readUInt32BE(20)

  assert.equal(width, 1200, `Image width must be 1200px. Actual: ${width}`)
  assert.equal(height, 630, `Image height must be 630px. Actual: ${height}`)
})
