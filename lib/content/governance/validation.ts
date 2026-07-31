import type { ContentStatus } from '@/lib/content/types'
import type { ContentTemplateType } from '@/lib/content/editorial/templates'
import { editorialConfig } from '@/config/content'
import { extractInternalLinks, extractImages } from '@/lib/content/editorial/utils'

export type GovernanceSeverity = 'error' | 'warning'

export interface GovernanceIssue {
  rule: string
  message: string
  severity: GovernanceSeverity
  field?: string
}

export interface GovernanceResult {
  passed: boolean
  issues: GovernanceIssue[]
  warnings: GovernanceIssue[]
}

export interface GovernanceInput {
  slug?: string
  title?: string
  description?: string
  status?: ContentStatus
  draft?: boolean
  author?: { name?: string }
  reviewer?: { name?: string }
  publishedAt?: string
  updatedAt?: string
  version?: number
  readingTime?: number
  seo?: { title?: string; description?: string; canonical?: string; ogImage?: string }
  cover?: { src?: string; alt?: string }
  content?: string
  type?: ContentTemplateType
  [key: string]: unknown
}

type GovernanceRule = {
  id: string
  severity: GovernanceSeverity
  check: (input: GovernanceInput, status: ContentStatus) => GovernanceIssue | null
}

const rules: GovernanceRule[] = [
  {
    id: 'required-slug',
    severity: 'error',
    check: (input) => (!input.slug ? { rule: 'required-slug', message: 'Slug is required', severity: 'error', field: 'slug' } : null),
  },
  {
    id: 'required-title',
    severity: 'error',
    check: (input) => (!input.title ? { rule: 'required-title', message: 'Title is required', severity: 'error', field: 'title' } : null),
  },
  {
    id: 'required-description',
    severity: 'error',
    check: (input) =>
      !input.description
        ? { rule: 'required-description', message: 'Description is required', severity: 'error', field: 'description' }
        : null,
  },
  {
    id: 'required-author-insight',
    severity: 'error',
    check: (input, status) => {
      if (input.type !== 'insight' || status !== 'published') return null
      return !input.author?.name
        ? { rule: 'required-author-insight', message: 'Author is required for published insights', severity: 'error', field: 'author' }
        : null
    },
  },
  {
    id: 'required-reading-time',
    severity: 'warning',
    check: (input, status) => {
      if (input.type !== 'insight' || status !== 'published') return null
      return !input.readingTime
        ? { rule: 'required-reading-time', message: 'Reading time should be set for insights', severity: 'warning', field: 'readingTime' }
        : null
    },
  },
  {
    id: 'required-published-date',
    severity: 'error',
    check: (input, status) =>
      status === 'published' && !input.publishedAt
        ? { rule: 'required-published-date', message: 'Published date is required for published content', severity: 'error', field: 'publishedAt' }
        : null,
  },
  {
    id: 'required-updated-date',
    severity: 'warning',
    check: (input, status) =>
      status === 'published' && !input.updatedAt
        ? { rule: 'required-updated-date', message: 'Updated date should be set', severity: 'warning', field: 'updatedAt' }
        : null,
  },
  {
    id: 'seo-title-length',
    severity: 'warning',
    check: (input) => {
      const title = input.seo?.title ?? input.title
      if (!title) return null
      return title.length > 70
        ? { rule: 'seo-title-length', message: `SEO title exceeds 70 characters (${title.length})`, severity: 'warning', field: 'seo.title' }
        : null
    },
  },
  {
    id: 'seo-description-length',
    severity: 'warning',
    check: (input) => {
      const desc = input.seo?.description ?? input.description
      if (!desc) return null
      return desc.length > 200
        ? { rule: 'seo-description-length', message: `Description exceeds 200 characters (${desc.length})`, severity: 'warning', field: 'seo.description' }
        : null
    },
  },
  {
    id: 'cover-alt-text',
    severity: 'error',
    check: (input, status) => {
      if (status !== 'published' || !input.cover?.src) return null
      return !input.cover.alt
        ? { rule: 'cover-alt-text', message: 'Cover image requires alt text', severity: 'error', field: 'cover.alt' }
        : null
    },
  },
  {
    id: 'image-alt-text',
    severity: 'error',
    check: (input, status) => {
      if (status !== 'published' || !input.content) return null
      const images = extractImages(input.content)
      const missing = images.filter((img) => !img.alt.trim())
      return missing.length > 0
        ? { rule: 'image-alt-text', message: `${missing.length} inline image(s) missing alt text`, severity: 'error', field: 'content' }
        : null
    },
  },
  {
    id: 'content-h1',
    severity: 'warning',
    check: (input, status) => {
      if (status !== 'published' || !input.content) return null
      return !/^#\s+/m.test(input.content)
        ? { rule: 'content-h1', message: 'Content body should include an H1 heading', severity: 'warning', field: 'content' }
        : null
    },
  },
  {
    id: 'thin-content',
    severity: 'warning',
    check: (input, status) => {
      if (status !== 'published' || !input.content) return null
      const words = input.content.trim().split(/\s+/).filter(Boolean).length
      return words < 250
        ? { rule: 'thin-content', message: `Content has only ${words} words (minimum 250 recommended)`, severity: 'warning', field: 'content' }
        : null
    },
  },
  {
    id: 'internal-links',
    severity: 'warning',
    check: (input, status) => {
      if (status !== 'published' || !input.content) return null
      const links = extractInternalLinks(input.content)
      return links.length === 0
        ? { rule: 'internal-links', message: 'No internal links found — add cross-references', severity: 'warning', field: 'content' }
        : null
    },
  },
  {
    id: 'content-freshness',
    severity: 'warning',
    check: (input, status) => {
      if (status !== 'published' || !input.updatedAt) return null
      const daysSinceUpdate = (Date.now() - new Date(input.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
      return daysSinceUpdate > editorialConfig.freshnessThresholdDays
        ? { rule: 'content-freshness', message: `Content not updated in ${Math.floor(daysSinceUpdate)} days`, severity: 'warning', field: 'updatedAt' }
        : null
    },
  },
]

/**
 * Run all governance rules against content.
 * Errors block publishing when enforcement is enabled.
 */
export function validateForPublishing(input: GovernanceInput, targetStatus: ContentStatus): GovernanceResult {
  const issues: GovernanceIssue[] = []
  const warnings: GovernanceIssue[] = []

  for (const rule of rules) {
    const result = rule.check(input, targetStatus)
    if (!result) continue
    if (result.severity === 'error') issues.push(result)
    else warnings.push(result)
  }

  const passed = issues.length === 0

  return { passed, issues, warnings }
}

/**
 * Check if content can transition to a target status.
 */
export function canTransition(
  currentStatus: ContentStatus,
  targetStatus: ContentStatus,
  input: GovernanceInput,
): { allowed: boolean; result: GovernanceResult } {
  const validTransitions: Record<ContentStatus, ContentStatus[]> = {
    draft: ['review', 'published', 'archived'],
    review: ['draft', 'published', 'archived'],
    published: ['archived', 'draft'],
    archived: ['draft'],
  }

  const allowed = validTransitions[currentStatus]?.includes(targetStatus) ?? false
  if (!allowed) {
    return {
      allowed: false,
      result: {
        passed: false,
        issues: [{ rule: 'invalid-transition', message: `Cannot transition from ${currentStatus} to ${targetStatus}`, severity: 'error' }],
        warnings: [],
      },
    }
  }

  if (targetStatus === 'published') {
    const result = validateForPublishing(input, targetStatus)
    return { allowed: result.passed, result }
  }

  return { allowed: true, result: { passed: true, issues: [], warnings: [] } }
}
