import type { Metadata } from 'next'

export interface PageMetadataInput {
  title: string
  description: string
  path: string
  ogImage?: string
  /** Section label shown on the dynamic OG image (e.g. "Service", "Insight"). Auto-derived from `path` when omitted. */
  eyebrow?: string
  noIndex?: boolean
  article?: {
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    tags?: string[]
  }
}

export type AppMetadata = Metadata
export type JsonLdObject = Record<string, unknown>

export interface SeoValidationResult {
  valid: boolean
  issues: string[]
  warnings: string[]
}
