# Content System Documentation

## Overview

HA Web Studio uses a flexible, provider-agnostic content system that supports multiple content sources including Git-based MDX files, headless CMS APIs, and future integrations like Sanity, Payload, or Notion.

## Architecture

### Content Providers

The content system is built around a provider abstraction layer defined in `lib/content/providers/`. This allows switching between content sources without changing page components.

#### Supported Providers

- **git**: Local MDX files (default)
- **decap**: Decap CMS (Git-based editorial UI)
- **sanity**: Sanity headless CMS
- **contentlayer**: Contentlayer compile-time content
- **payload**: Payload CMS
- **notion**: Notion as content source
- **headless-api**: Generic headless CMS REST/GraphQL API

#### Provider Configuration

Configure the active provider in `config/content.ts`:

```typescript
export const contentProviderConfig: ContentProviderConfig = {
  type: (process.env.CONTENT_PROVIDER as ContentProviderType) ?? 'git',
  apiUrl: process.env.CONTENT_API_URL,
  apiTokenEnvVar: 'CONTENT_API_TOKEN',
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET ?? 'production',
  databaseId: process.env.NOTION_DATABASE_ID,
}
```

Set the `CONTENT_PROVIDER` environment variable to switch providers.

### Content Collections

Content is organized into collections, each with a specific type:

- **services**: Service pages (TypeScript-based)
- **projects**: Portfolio projects (TypeScript-based)
- **caseStudies**: Client success stories (MDX)
- **technologies**: Technology guides (MDX)
- **insights**: Editorial articles (MDX)
- **problems**: Business problem guides (MDX)

### Content Types

All content types are defined in `lib/content/types.ts`:

```typescript
export interface ContentEntry extends EditorialMetadata {
  slug: string
  title: string
  description: string
  seo?: SeoMetadata
  publishedAt?: string
  updatedAt?: string
  tags?: Tag[]
  cover?: ImageAsset
}
```

Domain-specific types extend `ContentEntry`:
- `Service`, `Project`, `CaseStudy`, `Technology`, `Insight`, `Problem`

### Content Schemas

Zod schemas in `lib/content/schemas.ts` validate content at runtime:

```typescript
export const contentEntrySchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be kebab-case'),
  title: z.string().min(1),
  description: z.string().min(1),
  // ... other fields
})
```

## Content Loading

Pages consume content through the collection API in `lib/content/source.ts`:

```typescript
import { insights } from '@/lib/content/source'

// Get all published insights
const allInsights = await insights.getAll()

// Get a specific insight by slug
const insight = await insights.getBySlug('my-insight')

// Get insights by status
const draftInsights = await insights.getByStatus('draft')
```

The collection API automatically:
- Filters draft content in production
- Validates content against schemas
- Resolves provider-specific data formats

## Editorial Workflow

### Content Status

Content can be in one of four states:

- **draft**: Work in progress, not visible
- **review**: Ready for review
- **published**: Live and visible
- **archived**: Removed from public view

### Publishing Process

1. **Create Content**
   - Use editorial templates from `lib/content/editorial/templates.ts`
   - Follow frontmatter requirements
   - Set `status: 'draft'`

2. **Review**
   - Set `status: 'review'`
   - Run governance checks
   - Fix any issues

3. **Publish**
   - Set `status: 'published'`
   - Automation triggers:
     - Sitemap regeneration
     - RSS/Atom feed updates
     - Search index refresh
     - ISR revalidation
     - IndexNow submission

### Editorial Templates

Templates are defined in `lib/content/editorial/templates.ts`:

```typescript
export const contentTemplates: Record<ContentTemplateType, ContentTemplate> = {
  insight: {
    type: 'insight',
    collection: 'insights',
    directory: 'content/insights',
    label: 'New Insight',
    requiredFields: [
      { key: 'title', label: 'Title', required: true, type: 'string' },
      { key: 'description', label: 'Description', required: true, type: 'text' },
      // ...
    ],
    // ...
  },
  // ... other templates
}
```

## Content Governance

### Validation Rules

Governance rules in `lib/content/governance/validation.ts` ensure content quality:

- Required metadata (title, description, slug)
- Author for published insights
- Reading time for insights
- Published/updated dates
- SEO title/description length
- Alt text for images
- H1 heading in content
- Minimum word count (250)
- Internal links
- Content freshness

### Running Governance Checks

```typescript
import { validateForPublishing } from '@/lib/content/governance/validation'

const result = validateForPublishing(content, 'published')

if (!result.passed) {
  console.error('Governance failed:', result.issues)
}
```

### Enforcement

Governance enforcement is controlled by `ENFORCE_CONTENT_GOVERNANCE` environment variable. When enabled, content with governance errors cannot be published.

## Automation

### Event-Driven Workflows

Automation workflows in `lib/operations/automation/workflows.ts` respond to events:

```typescript
const workflows: Record<AutomationEvent, WorkflowStep[]> = {
  'content.published': [
    notifySitemapAndFeeds,
    refreshSearchIndex,
    revalidatePages,
    updateRelatedContent,
    notifyAnalytics,
    submitIndexNow,
  ],
  // ... other events
}
```

### Automation Tasks

Individual tasks in `lib/operations/automation/tasks.ts`:

- `revalidatePages`: Trigger ISR revalidation
- `submitIndexNow`: Submit URLs to search engines
- `refreshSearchIndex`: Regenerate search index
- `notifySitemapAndFeeds`: Queue sitemap/feed regeneration
- `notifyAnalytics`: Log analytics events
- `updateRelatedContent`: Update content relationships

### Triggering Automation

```typescript
import { runPublishWorkflow } from '@/lib/operations/automation/workflows'

await runPublishWorkflow({
  collection: 'insights',
  slug: 'my-insight',
  type: 'insight',
})
```

## Content Relations

### Related Content

Content can reference other content via slug relationships:

```yaml
relatedServiceSlugs:
  - web-development
  - consulting

relatedTechnologySlugs:
  - nextjs
  - typescript

relatedArticleSlugs:
  - another-insight
```

### Relation Resolution

The `lib/content/relations.ts` module resolves these relationships at runtime, allowing content to discover and display related items.

## Content Operations

### Adding New Content

1. Choose the appropriate content type
2. Use the corresponding template
3. Fill in required fields
4. Set status to `draft`
5. Run governance checks
6. Submit for review or publish

### Updating Content

1. Edit the content file
2. Update `updatedAt` timestamp
3. Increment `version` number
4. Run governance checks
5. Publish changes

### Archiving Content

1. Set `status: 'archived'`
2. Content is removed from public view
3. Automation triggers cleanup

## Migration Guide

### Migrating to a Headless CMS

1. Configure the new provider in `config/content.ts`
2. Set `CONTENT_PROVIDER` environment variable
3. Implement the provider adapter in `lib/content/providers/headless.ts`
4. Test with preview deployments
5. Update content in the CMS
6. Switch to production

### Migrating from Draft to Status

Legacy content uses `draft: true`. Modern content uses `status: 'draft'`. The system automatically resolves both:

```typescript
export function resolveStatus(entry: { status?: ContentStatus; draft?: boolean }): ContentStatus {
  if (entry.status) return entry.status
  if (entry.draft) return 'draft'
  return 'published'
}
```

## Best Practices

### Content Creation

- Use kebab-case for slugs
- Write descriptive titles and descriptions
- Include alt text for all images
- Add internal links to related content
- Set appropriate categories and tags
- Keep content fresh (update regularly)

### SEO

- Optimize titles (under 70 characters)
- Optimize descriptions (under 200 characters)
- Include canonical URLs when needed
- Use structured data where appropriate
- Add OG images for social sharing

### Performance

- Optimize images before upload
- Use appropriate image formats
- Limit content length for readability
- Use lazy loading for galleries
- Implement pagination for long lists

## Troubleshooting

### Content Not Appearing

- Check status is `published`
- Verify slug is correct
- Run content audit
- Check for validation errors

### Governance Failures

- Review governance issues
- Fix missing required fields
- Add alt text to images
- Include internal links
- Ensure minimum word count

### Automation Not Running

- Check environment variables
- Verify API keys are set
- Check Vercel function logs
- Test automation tasks manually

## API Reference

### Collection API

```typescript
interface ContentCollection<T> {
  getAll: () => Promise<WithContent<T>[]>
  getBySlug: (slug: string) => Promise<WithContent<T> | null>
  getSlugs: () => Promise<string[]>
  getByCategory: (categorySlug: string) => Promise<WithContent<T>[]>
  getByTag: (tagSlug: string) => Promise<WithContent<T>[]>
  getFeatured: () => Promise<WithContent<T>[]>
  getByStatus: (status: ContentStatus) => Promise<WithContent<T>[]>
}
```

### Provider API

```typescript
interface ContentProvider<T> {
  type: string
  getAll: () => Promise<Array<T & { content?: string }>>
}
```

### Governance API

```typescript
interface GovernanceResult {
  passed: boolean
  issues: GovernanceIssue[]
  warnings: GovernanceIssue[]
}

function validateForPublishing(input: GovernanceInput, targetStatus: ContentStatus): GovernanceResult
```

### Automation API

```typescript
interface AutomationWorkflowResult {
  event: AutomationEvent
  context: AutomationContext
  tasks: AutomationTaskResult[]
  success: boolean
  totalDurationMs: number
}

function runWorkflow(event: AutomationEvent, context: AutomationContext): Promise<AutomationWorkflowResult>
```
