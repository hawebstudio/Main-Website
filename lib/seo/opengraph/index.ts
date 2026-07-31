import { siteConfig } from '@/config/site'
import { openGraphImage } from '../images'

export function openGraphDefaults(input: { title: string; description: string; url: string; image?: string; article?: boolean }) {
  return {
    type: input.article ? 'article' : 'website',
    url: input.url,
    title: input.title,
    description: input.description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ ...openGraphImage(input.image), alt: input.title }],
  }
}
