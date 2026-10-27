import { NextResponse } from 'next/server'
import { siteConfig } from '@/config/site'
import { submitToIndexNow } from '@/lib/seo/indexnow'
import { INDEXNOW_MAX_URLS, normalizeIndexNowUrls } from '@/lib/seo/indexnow-urls'

/**
 * Protected endpoint for submitting URLs to IndexNow (Bing + other
 * participating engines) after publishing or updating content. Reuses
 * REVALIDATE_SECRET as a bearer token so no extra secret is needed.
 *
 * POST /api/indexnow
 * Authorization: Bearer <REVALIDATE_SECRET>
 * Body: { "urls": ["https://hawebstudio.com/work/example"] }
 *   or   { "paths": ["/work/example"] }
 */
const ORIGIN = new URL(siteConfig.url).origin

function toAbsoluteUrl(path: unknown): string | null {
  if (typeof path !== 'string') return null
  try {
    const parsed = new URL(path, siteConfig.url)
    return parsed.origin === ORIGIN ? parsed.toString() : null
  } catch {
    return null
  }
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  const authHeader = request.headers.get('authorization')

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { urls?: unknown; paths?: unknown }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const requested = [
    ...(Array.isArray(body.urls) ? body.urls : []),
    ...(Array.isArray(body.paths) ? body.paths.map(toAbsoluteUrl) : []),
  ]
  const urls = normalizeIndexNowUrls(requested, ORIGIN)

  if (urls.length === 0) {
    return NextResponse.json(
      { error: `Provide "urls" or "paths" for at least one URL on ${ORIGIN}` },
      { status: 400 },
    )
  }

  if (urls.length > INDEXNOW_MAX_URLS) {
    return NextResponse.json(
      {
        error: `IndexNow accepts at most ${INDEXNOW_MAX_URLS} URLs per request (received ${urls.length}); submit in batches`,
      },
      { status: 400 },
    )
  }

  try {
    const result = await submitToIndexNow(urls)
    return NextResponse.json(
      { ...result, requested: requested.length, skipped: requested.length - urls.length },
      { status: result.ok ? 200 : 502 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'IndexNow submission failed' },
      { status: 500 },
    )
  }
}
