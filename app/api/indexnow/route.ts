import { NextResponse } from 'next/server'
import { siteConfig } from '@/config/site'
import { submitToIndexNow } from '@/lib/seo/indexnow'

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
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  const authHeader = request.headers.get('authorization')

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { urls?: string[]; paths?: string[] }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const urls = body.urls ?? body.paths?.map((path) => new URL(path, siteConfig.url).toString()) ?? []

  if (urls.length === 0) {
    return NextResponse.json({ error: 'Provide "urls" or "paths"' }, { status: 400 })
  }

  try {
    const result = await submitToIndexNow(urls)
    return NextResponse.json(result, { status: result.ok ? 200 : 502 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'IndexNow submission failed' },
      { status: 500 },
    )
  }
}
