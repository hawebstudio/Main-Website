import { editorialConfig } from '@/config/content'

/**
 * Generate a URL-safe kebab-case slug from a title or raw string.
 */
export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Calculate reading time in minutes from markdown/MDX content.
 */
export function calculateReadingTime(content: string, wpm = editorialConfig.wordsPerMinute): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / wpm))
}

/**
 * Generate an ISO date string for the current moment.
 */
export function nowIso(): string {
  return new Date().toISOString()
}

/**
 * Increment version number for content revisions.
 */
export function nextVersion(current?: number): number {
  return (current ?? 0) + 1
}

/**
 * Strip markdown syntax for word counting and excerpt generation.
 */
export function stripMarkdown(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/[*_~]/g, '')
    .replace(/<[^>]+>/g, '')
    .trim()
}

/**
 * Extract internal links from MDX/markdown content.
 */
export function extractInternalLinks(content: string): string[] {
  const links: string[] = []
  const markdownLinkPattern = /\[([^\]]*)\]\((\/[^)]+)\)/g
  const htmlLinkPattern = /href="(\/[^"]+)"/g

  let match: RegExpExecArray | null
  while ((match = markdownLinkPattern.exec(content)) !== null) {
    links.push(match[2])
  }
  while ((match = htmlLinkPattern.exec(content)) !== null) {
    links.push(match[1])
  }

  return [...new Set(links)]
}

/**
 * Extract image references from MDX/markdown content.
 */
export function extractImages(content: string): Array<{ src: string; alt: string }> {
  const images: Array<{ src: string; alt: string }> = []
  const pattern = /!\[([^\]]*)\]\(([^)]+)\)/g

  let match: RegExpExecArray | null
  while ((match = pattern.exec(content)) !== null) {
    images.push({ alt: match[1], src: match[2] })
  }

  return images
}
