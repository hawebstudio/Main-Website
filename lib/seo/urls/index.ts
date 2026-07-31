import { siteConfig } from '@/config/site'

export function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}

export function absoluteUrl(path: string): string {
  return new URL(normalizePath(path), siteConfig.url).toString()
}

export function stripTrailingSlash(url: string): string {
  return url.length > 1 ? url.replace(/\/+$/, '') : url
}
