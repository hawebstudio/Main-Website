import { siteConfig } from '@/config/site'

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

export function createIndexNowPayload(urls: string[]) {
  const key = process.env.INDEXNOW_KEY

  if (!key) return null

  return {
    host: new URL(siteConfig.url).host,
    key,
    keyLocation: `${siteConfig.url}/${key}.txt`,
    urlList: urls,
  }
}

export interface IndexNowSubmissionResult {
  ok: boolean
  status: number
  submitted: number
}

/**
 * Submits a batch of URLs to IndexNow. A single submission propagates to
 * every participating search engine (Bing, Yandex, Seznam.cz, Naver, etc.),
 * so there's no need for separate per-engine API calls.
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowSubmissionResult> {
  const payload = createIndexNowPayload(urls)

  if (!payload) {
    throw new Error('INDEXNOW_KEY is not configured')
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  return {
    ok: response.ok,
    status: response.status,
    submitted: response.ok ? payload.urlList.length : 0,
  }
}
