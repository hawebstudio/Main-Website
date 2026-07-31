import { NextResponse } from 'next/server'

/**
 * Serves the IndexNow verification file at /<INDEXNOW_KEY>.txt (see the
 * rewrite in next.config.mjs). The file must respond with the raw key as
 * plain text so Bing/other engines can confirm ownership.
 */
export const dynamic = 'force-static'

export async function GET() {
  const key = process.env.INDEXNOW_KEY

  if (!key) {
    return new NextResponse('IndexNow key is not configured', { status: 404 })
  }

  return new NextResponse(key, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
