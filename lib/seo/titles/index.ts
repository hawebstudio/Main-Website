import { siteConfig } from '@/config/site'

export function pageTitle(title: string): string {
  return title === siteConfig.name ? title : `${title} - ${siteConfig.name}`
}
