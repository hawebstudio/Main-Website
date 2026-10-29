import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { company } from '@/lib/business'
import { BRAND_LOGO_DATA_URI } from './brand-logo'

export const runtime = 'nodejs'

const WIDTH = 1200
const HEIGHT = 630

// Brand Design Tokens (aligned with HA Web Studio editorial system)
const BRAND_PRIMARY = '#51283e' // HA luxury deep plum (12.19:1 on #fff - AAA)
const BRAND_BRONZE_GOLD = '#7b5914' // Accessible deep bronze gold (6.40:1 on #fff - AA compliant >= 4.5:1)
const BRAND_GOLD_MOTIF = '#c7aa72' // HA decorative gold for non-text triad dot
const BRAND_BLUE = '#0969da' // Studio engineering blue (4.65:1 on #fff)
const BRAND_INK = '#1a161e' // High-contrast deep ink for title (17.84:1 on #fff - AAA)
const BRAND_MUTED = '#625b62' // Refined neutral for secondary text (6.58:1 on #fff - AA)
const CANVAS_BG = '#fcfbf8' // Warm cream editorial canvas
const CARD_BG = '#ffffff' // Clean card surface
const CARD_BORDER = '#e8e2d9' // Warm editorial hairline border
const PILL_BG = '#f5f1eb' // Eyebrow badge fill
const PILL_BORDER = '#ded7cf' // Eyebrow badge border

function getLogoDataUri(): string {
  const candidates = [
    path.join(process.cwd(), 'public', 'apple-icon.png'),
    path.join(process.cwd(), 'public', 'favicon-mark.png'),
  ]
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) {
        const buf = fs.readFileSync(candidate)
        return `data:image/png;base64,${buf.toString('base64')}`
      }
    } catch {
      // Continue to next candidate or fallback
    }
  }
  return BRAND_LOGO_DATA_URI
}

function clamp(value: string, maxLength: number): string {
  const trimmed = value.trim()
  return trimmed.length <= maxLength ? trimmed : `${trimmed.slice(0, maxLength - 1).trimEnd()}…`
}

function getTitleFontSize(length: number): number {
  if (length <= 40) return 64
  if (length <= 70) return 56
  return 48
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const rawTitle = searchParams.get('title') ?? company.name
  const title = clamp(rawTitle, 100)
  const rawDesc = searchParams.get('description')
  // For short titles (<= 45 chars), a concise subtitle can be displayed.
  // For long article titles, omit description to ensure maximum title size and negative space.
  const subtitle =
    title.length <= 45 && rawDesc ? clamp(rawDesc, 85) : undefined

  const rawEyebrow = searchParams.get('eyebrow')
  const eyebrow = rawEyebrow
    ? clamp(rawEyebrow, 30)
    : (rawTitle === company.name ? 'STUDIO' : 'INSIGHT')
  const titleFontSize = getTitleFontSize(title.length)
  const logoSrc = getLogoDataUri()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: CANVAS_BG,
          backgroundImage:
            'radial-gradient(circle at 95% 8%, rgba(81, 40, 62, 0.08) 0%, transparent 45%), radial-gradient(circle at 5% 92%, rgba(9, 105, 218, 0.06) 0%, transparent 40%)',
          padding: '32px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Inset Editorial Card */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: CARD_BG,
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: 24,
            padding: '52px 64px',
            boxShadow: '0 8px 30px rgba(26, 22, 30, 0.04)',
          }}
        >
          {/* Top Bar: Brand identity + Category Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {/* Brand Logo & Wordmark */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={logoSrc}
                alt="HA"
                width={54}
                height={54}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  border: `1px solid ${CARD_BORDER}`,
                  marginRight: 16,
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: BRAND_INK,
                      letterSpacing: -0.5,
                      marginRight: 6,
                    }}
                  >
                    HA
                  </span>
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: BRAND_MUTED,
                      letterSpacing: -0.5,
                    }}
                  >
                    Web Studio
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: BRAND_BRONZE_GOLD,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    marginTop: 2,
                  }}
                >
                  Digital Engineering
                </span>
              </div>
            </div>

            {/* Category / Eyebrow Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 22px',
                borderRadius: 999,
                backgroundColor: PILL_BG,
                border: `1px solid ${PILL_BORDER}`,
                fontSize: 14,
                fontWeight: 700,
                color: BRAND_PRIMARY,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </div>
          </div>

          {/* Center: Main Headline Area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
              maxWidth: 1008,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: titleFontSize,
                fontWeight: 700,
                lineHeight: 1.16,
                color: BRAND_INK,
                letterSpacing: -1.5,
              }}
            >
              {title}
            </div>

            {subtitle ? (
              <div
                style={{
                  display: 'flex',
                  marginTop: 20,
                  fontSize: 24,
                  lineHeight: 1.4,
                  color: BRAND_MUTED,
                  letterSpacing: -0.3,
                }}
              >
                {subtitle}
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  width: 64,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: BRAND_PRIMARY,
                  marginTop: 24,
                }}
              />
            )}
          </div>

          {/* Bottom Bar: Studio URL, Founder Attribution & Motif */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #f0eae1',
              paddingTop: 24,
              width: '100%',
            }}
          >
            {/* Left: Domain & Founder Identity */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#10b981',
                  marginRight: 10,
                }}
              />
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#3f3a41',
                  letterSpacing: 0.3,
                }}
              >
                hawebstudio.com
              </span>
              <span
                style={{
                  marginLeft: 12,
                  marginRight: 12,
                  fontSize: 18,
                  color: '#b5adb6',
                }}
              >
                ·
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: BRAND_MUTED,
                }}
              >
                M.A. Malik · Founder & Principal
              </span>
            </div>

            {/* Right: Studio 3-Color Dot Motif */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: BRAND_PRIMARY,
                  marginRight: 6,
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: BRAND_GOLD_MOTIF,
                  marginRight: 6,
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: BRAND_BLUE,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        'Cache-Control':
          'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800, no-transform',
      },
    },
  )
}
