import type { ContentStatus } from '@/lib/content/types'
import type { ContentTemplateType } from './templates'
import { getTemplate } from './templates'
import { generateSlug, calculateReadingTime, nowIso, nextVersion } from './utils'
import { validateForPublishing, type GovernanceResult } from '@/lib/content/governance/validation'
import { runPublishWorkflow } from '@/lib/automation'

export type PublishAction = 'submit-for-review' | 'publish' | 'archive' | 'return-to-draft'

export interface PublishInput {
  type: ContentTemplateType
  title: string
  description: string
  content?: string
  slug?: string
  status?: ContentStatus
  metadata?: Record<string, unknown>
  action?: PublishAction
}

export interface PublishResult {
  success: boolean
  slug: string
  status: ContentStatus
  readingTime?: number
  relatedContent?: string[]
  governance: GovernanceResult
  automation?: Awaited<ReturnType<typeof runPublishWorkflow>>
  errors: string[]
}

const statusTransitions: Record<PublishAction, ContentStatus> = {
  'submit-for-review': 'review',
  publish: 'published',
  archive: 'archived',
  'return-to-draft': 'draft',
}

/**
 * Prepare content metadata for a new or updated entry.
 * Does not write files — use scripts/publish.mjs for file operations.
 */
export function prepareContent(input: PublishInput): {
  frontmatter: Record<string, unknown>
  content: string
  slug: string
} {
  const template = getTemplate(input.type)
  const slug = input.slug ?? generateSlug(input.title)
  const content = input.content ?? template.bodyTemplate
  const readingTime = input.type === 'insight' ? calculateReadingTime(content) : undefined

  const frontmatter: Record<string, unknown> = {
    ...template.frontmatterTemplate,
    ...input.metadata,
    slug,
    title: input.title,
    description: input.description,
    status: input.status ?? 'draft',
    updatedAt: nowIso(),
    readingTime,
    version: nextVersion(input.metadata?.version as number | undefined),
  }

  if (input.action === 'publish' && !frontmatter.publishedAt) {
    frontmatter.publishedAt = nowIso()
  }

  if (input.action) {
    frontmatter.status = statusTransitions[input.action]
  }

  return { frontmatter, content, slug }
}

/**
 * Validate and prepare content for publishing.
 * Runs governance checks and triggers automation on successful publish.
 */
export async function publishContent(input: PublishInput): Promise<PublishResult> {
  const template = getTemplate(input.type)
  const { frontmatter, content, slug } = prepareContent(input)
  const targetStatus = (frontmatter.status as ContentStatus) ?? 'draft'
  const errors: string[] = []

  // Validate required fields from template
  for (const field of template.requiredFields) {
    const value = frontmatter[field.key]
    if (value === undefined || value === null || value === '') {
      errors.push(`Missing required field: ${field.label} (${field.key})`)
    }
  }

  const governance = validateForPublishing(
    {
      ...frontmatter,
      content,
      type: input.type,
    },
    targetStatus,
  )

  if (!governance.passed) {
    return {
      success: false,
      slug,
      status: targetStatus,
      governance,
      errors: [...errors, ...governance.issues.map((i) => i.message)],
    }
  }

  let automation: Awaited<ReturnType<typeof runPublishWorkflow>> | undefined

  if (targetStatus === 'published') {
    automation = await runPublishWorkflow({
      collection: template.collection,
      slug,
      type: input.type,
    })
  }

  return {
    success: errors.length === 0,
    slug,
    status: targetStatus,
    readingTime: frontmatter.readingTime as number | undefined,
    relatedContent: suggestRelatedContent(input.type, frontmatter),
    governance,
    automation,
    errors,
  }
}

/**
 * Suggest related content slugs based on shared tags and categories.
 */
function suggestRelatedContent(
  type: ContentTemplateType,
  frontmatter: Record<string, unknown>,
): string[] {
  const suggestions: string[] = []

  if (Array.isArray(frontmatter.relatedServiceSlugs)) {
    suggestions.push(...(frontmatter.relatedServiceSlugs as string[]))
  }
  if (Array.isArray(frontmatter.relatedTechnologySlugs)) {
    suggestions.push(...(frontmatter.relatedTechnologySlugs as string[]))
  }
  if (Array.isArray(frontmatter.relatedArticleSlugs)) {
    suggestions.push(...(frontmatter.relatedArticleSlugs as string[]))
  }

  return [...new Set(suggestions)]
}
