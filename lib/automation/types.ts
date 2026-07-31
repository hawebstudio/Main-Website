export type AutomationFrequency = 'daily' | 'weekly' | 'monthly'

export interface FeedEntry {
  title: string
  url: string
  description?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
}

export interface SitemapEntry {
  url: string
  lastModified?: string | Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

export interface RobotsRule {
  userAgent: string | string[]
  allow?: string | string[]
  disallow?: string | string[]
}

export interface LlmResource {
  title: string
  url: string
  description?: string
}

export interface AutomationTask {
  id: string
  name: string
  status: 'queued' | 'skipped'
  reason?: string
}

export interface PublishWorkflowInput {
  collection: string
  slug: string
  type: string
}
