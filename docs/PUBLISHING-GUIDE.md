# Publishing Guide

## Quick Start

To publish new content on HA Web Studio, follow this guide.

## Prerequisites

- Access to the GitHub repository
- Understanding of Markdown/MDX
- Familiarity with the content types

## Content Types

Choose the appropriate content type for your content:

- **Insight**: Editorial article, blog post, or thought leadership piece
- **Case Study**: Client success story with business and technical narrative
- **Technology**: Technology guide, recommendation, or comparison
- **Problem**: Business problem guide with symptoms, causes, and solutions
- **Project**: Portfolio project entry (TypeScript-based)

## Creating New Content

### Step 1: Choose a Template

Each content type has a template with required fields:

```typescript
import { getTemplate } from '@/lib/content/editorial/templates'

const template = getTemplate('insight')
console.log(template.requiredFields)
console.log(template.frontmatterTemplate)
```

### Step 2: Create the Content File

For MDX-based content (insights, case studies, technologies, problems):

1. Navigate to the appropriate directory:
   - Insights: `content/insights/`
   - Case Studies: `content/case-studies/`
   - Technologies: `content/technologies/`
   - Problems: `content/problems/`

2. Create a new `.mdx` file with a kebab-case filename (this becomes the slug):
   ```
   content/insights/my-new-insight.mdx
   ```

3. Add frontmatter based on the template:
   ```yaml
   ---
   slug: my-new-insight
   title: My New Insight
   description: A brief description of the insight
   status: draft
   author:
     name: Your Name
     role: Your Role
   category:
     slug: engineering
     name: Engineering
   publishedAt: null
   updatedAt: null
   readingTime: null
   version: 1
   featured: false
   keyTakeaways: []
   relatedServiceSlugs: []
   relatedTechnologySlugs: []
   relatedArticleSlugs: []
   tags: []
   ---
   ```

4. Add your content body:
   ```mdx
   # My New Insight
   
   Brief introduction that hooks the reader.
   
   ## Key Point One
   
   Main content here.
   
   ## Key Point Two
   
   Supporting details and examples.
   
   ## Conclusion
   
   Summary and next steps.
   ```

For TypeScript-based content (services, projects):

1. Edit the appropriate file:
   - Services: `content/services/index.ts`
   - Projects: `content/work/index.ts`

2. Add a new entry following the existing pattern.

### Step 3: Fill Required Fields

Each content type has required fields. Check the template for the complete list.

**Common required fields:**
- `slug`: URL-friendly identifier (kebab-case)
- `title`: Content title
- `description`: Short description for SEO
- `status`: Content workflow status

**Insight-specific:**
- `author`: Author information
- `category`: Content category

**Case Study-specific:**
- `client`: Client name
- `challenge`: Problem statement
- `solution`: Solution description

### Step 4: Add Optional Metadata

Enhance your content with optional metadata:

```yaml
# Cover image
cover:
  src: /assets/hero/insights/my-insight.jpg
  alt: Description of the image
  width: 1920
  height: 1080

# SEO metadata
seo:
  title: Custom SEO title (overrides title)
  description: Custom SEO description (overrides description)
  canonical: https://example.com/canonical-url
  ogImage: /assets/og/insights/my-insight.png

# Tags
tags:
  - slug: react
    name: React
  - slug: nextjs
    name: Next.js

# Related content
relatedServiceSlugs:
  - web-development
relatedTechnologySlugs:
  - nextjs
  - typescript
relatedArticleSlugs:
  - another-insight
```

### Step 5: Write the Content

Follow best practices:

- Start with an H1 heading
- Use descriptive headings (H2, H3)
- Include internal links to related content
- Add alt text to all images
- Keep paragraphs concise
- Use bullet points for lists
- Include code blocks with syntax highlighting
- Add a conclusion with next steps

### Step 6: Run Content Audit

Before publishing, run the content audit:

```bash
pnpm content-audit
```

This checks for:
- Missing required fields
- Duplicate titles/descriptions
- Missing authors (for insights)
- Missing reading time (for insights)
- Thin content (under 250 words)

### Step 7: Run Governance Checks

The publishing system automatically runs governance checks:

- Required metadata
- Internal links
- Image alt text
- H1 heading
- Minimum word count
- SEO title/description length
- Content freshness

Fix any issues before proceeding.

### Step 8: Set Status to Review

When ready for review, change the status:

```yaml
status: review
```

### Step 9: Request Review

Submit a pull request with your changes. The reviewer will:

- Check content quality
- Verify governance checks pass
- Test links and images
- Review SEO metadata
- Approve or request changes

### Step 10: Publish

After approval, change the status to publish:

```yaml
status: published
publishedAt: 2024-01-15T10:00:00Z
updatedAt: 2024-01-15T10:00:00Z
```

The system will automatically:

- Generate sitemap
- Generate RSS/Atom feeds
- Refresh search index
- Revalidate pages
- Submit to IndexNow (if enabled)
- Log analytics event

## Updating Existing Content

### Step 1: Edit the Content File

Make your changes to the content file.

### Step 2: Update Metadata

```yaml
updatedAt: 2024-01-16T14:30:00Z
version: 2
```

### Step 3: Run Audits

```bash
pnpm content-audit
```

### Step 4: Publish Changes

Commit and push your changes. The automation will handle the rest.

## Archiving Content

To remove content from public view:

```yaml
status: archived
```

The content will be:
- Removed from public listings
- Excluded from sitemap
- Excluded from search index
- Still accessible via direct URL (for internal reference)

## Content Best Practices

### Writing

- **Headings**: Use H1 for the main title, H2 for sections, H3 for subsections
- **Links**: Link to related content using internal links
- **Images**: Always include alt text
- **Code**: Use code blocks with language specification
- **Length**: Aim for 500-1500 words for insights
- **Tone**: Professional, informative, and actionable

### SEO

- **Titles**: Under 70 characters, include keywords
- **Descriptions**: Under 200 characters, summarize content
- **Keywords**: Naturally include relevant terms
- **Structure**: Use proper heading hierarchy
- **Links**: Link to relevant internal pages

### Accessibility

- **Alt Text**: Describe images for screen readers
- **Headings**: Use semantic heading structure
- **Links**: Use descriptive link text
- **Contrast**: Ensure sufficient color contrast
- **Language**: Use clear, simple language

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

### Build Errors

- Check syntax is valid MDX
- Verify frontmatter is valid YAML
- Ensure all imports are correct
- Run type check: `pnpm type-check`

## Automation

The publishing system automates many tasks:

### Automatic on Publish

- Sitemap regeneration
- RSS/Atom feed generation
- Search index refresh
- ISR revalidation
- IndexNow submission
- Analytics logging

### Manual Triggers

If automation fails, you can manually trigger:

```bash
# Rebuild search index
pnpm build

# Revalidate pages (if REVALIDATE_SECRET is set)
curl -X POST https://your-domain.com/api/revalidate \
  -H "Authorization: Bearer $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"paths": ["/", "/insights"]}'
```

## Content Templates

### Insight Template

```yaml
---
slug: your-insight-slug
title: Your Insight Title
description: A compelling description
status: draft
author:
  name: Author Name
  role: Author Role
category:
  slug: category-slug
  name: Category Name
publishedAt: null
updatedAt: null
readingTime: null
version: 1
featured: false
keyTakeaways:
  - Key takeaway one
  - Key takeaway two
relatedServiceSlugs: []
relatedTechnologySlugs: []
relatedArticleSlugs: []
tags: []
cover:
  src: /assets/hero/insights/your-insight.jpg
  alt: Image description
---

# Your Insight Title

Introduction paragraph.

## Section One

Content here.

## Section Two

More content.

## Conclusion

Summary and next steps.
```

### Case Study Template

```yaml
---
slug: your-case-study-slug
title: Your Case Study Title
description: A brief description
status: draft
client: Client Name
industry: Industry
challenge: The challenge
solution: The solution
publishedAt: null
updatedAt: null
version: 1
relatedTechnologySlugs: []
relatedProjectSlug: null
---

# Case Study Title

## Business Context

Describe the client's situation.

## The Challenge

What problem needed solving?

## Our Approach

How we investigated and decided on a solution.

## Implementation

Technical and process details.

## Results & Impact

Measurable outcomes.
```

### Technology Template

```yaml
---
slug: technology-slug
title: Technology Name
description: Description
status: draft
category: Category
website: https://example.com
publishedAt: null
updatedAt: null
version: 1
relatedServiceSlugs: []
relatedProjectSlugs: []
relatedInsightSlugs: []
---

# Technology Name

## Overview

What is this technology?

## When We Recommend It

Ideal use cases.

## When We Don't Recommend It

Limitations and alternatives.

## Common Mistakes

Pitfalls to avoid.
```

## Getting Help

- Review the content system documentation: `docs/CONTENT-SYSTEM.md`
- Check governance rules: `lib/content/governance/validation.ts`
- Review templates: `lib/content/editorial/templates.ts`
- Run content audit: `pnpm content-audit`
- Contact the development team for assistance
