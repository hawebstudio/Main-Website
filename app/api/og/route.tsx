import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { company } from '@/lib/business'

export const runtime = 'edge'

const WIDTH = 1200
const HEIGHT = 630

const BRAND_PRIMARY = '#0969DA'
const BRAND_INK = '#0a0a0c'
const BRAND_SURFACE = '#f7f7f8'

function clamp(value: string, maxLength: number): string {
  const trimmed = value.trim()
  return trimmed.length <= maxLength ? trimmed : `${trimmed.slice(0, maxLength - 1).trimEnd()}…`
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = clamp(searchParams.get('title') ?? company.name, 90)
  const description = searchParams.get('description')
    ? clamp(searchParams.get('description') as string, 160)
    : undefined
  const eyebrow = searchParams.get('eyebrow') ? clamp(searchParams.get('eyebrow') as string, 40) : undefined

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: BRAND_INK,
          backgroundImage:
            'radial-gradient(circle at 82% 18%, rgba(9,105,218,0.35), rgba(9,105,218,0) 55%), radial-gradient(circle at 8% 92%, rgba(9,105,218,0.18), rgba(9,105,218,0) 45%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Header: wordmark */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: BRAND_PRIMARY,
              marginRight: 16,
              fontSize: 22,
              fontWeight: 700,
              color: BRAND_SURFACE,
            }}
          >
            HA
          </div>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 600, color: BRAND_SURFACE, letterSpacing: -0.5 }}>
            {company.name}
          </div>
        </div>

        {/* Body: eyebrow, title, description */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 980 }}>
          {eyebrow ? (
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                fontWeight: 600,
                color: BRAND_PRIMARY,
                textTransform: 'uppercase',
                letterSpacing: 2,
                marginBottom: 20,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 55 ? 56 : 68,
              fontWeight: 700,
              lineHeight: 1.15,
              color: BRAND_SURFACE,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                display: 'flex',
                marginTop: 24,
                fontSize: 28,
                lineHeight: 1.5,
                color: 'rgba(247,247,248,0.72)',
              }}
            >
              {description}
            </div>
          ) : null}
        </div>

        {/* Footer: domain + accent rule */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 22, color: 'rgba(247,247,248,0.6)' }}>hawebstudio.com</div>
          <div style={{ display: 'flex', width: 120, height: 6, borderRadius: 3, backgroundColor: BRAND_PRIMARY }} />
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        'Cache-Control': 'public, immutable, no-transform, max-age=86400, stale-while-revalidate=604800',
      },
    },
  )
}
