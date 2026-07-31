import { siteConfig } from '@/config/site'
import { absoluteUrl } from '../urls'

export interface DynamicOgImageInput {
  title: string
  description?: string
  eyebrow?: string
}

/**
 * Builds the URL for the runtime-generated OG/Twitter image at /api/og,
 * used whenever a page doesn't supply its own cover image. Query params
 * are consumed by the ImageResponse route handler to render a branded
 * 1200x630 image per page — no static asset required.
 */
export function dynamicOgImageUrl(input: DynamicOgImageInput): string {
  const params = new URLSearchParams({ title: input.title })
  if (input.description) params.set('description', input.description)
  if (input.eyebrow) params.set('eyebrow', input.eyebrow)
  return absoluteUrl(`/api/og?${params.toString()}`)
}

export function openGraphImage(path?: string) {
  return {
    url: path ?? siteConfig.ogImage,
    width: 1200,
    height: 630,
  }
}
