import { siteConfig } from '@/config/site'

export function twitterCard(input: { title: string; description: string; image?: string }) {
  return {
    card: 'summary_large_image' as const,
    title: input.title,
    description: input.description,
    images: [input.image ?? siteConfig.ogImage],
    creator: siteConfig.twitter,
  }
}
