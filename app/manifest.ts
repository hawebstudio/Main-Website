import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { branding } from '@/lib/business'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: branding.colors.accent[0].value,
    theme_color: branding.colors.primary[0].value,
    icons: [
      {
        src: branding.logos.mark,
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: branding.logos.apple,
        sizes: '1167x1167',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}