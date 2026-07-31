import type { CollectionName } from '@/lib/content/source'
import { company } from '@/lib/business/company'

export type ContentTemplateType =
  | 'insight'
  | 'case-study'
  | 'technology'
  | 'problem'
  | 'project'

export interface ContentTemplateField {
  key: string
  label: string
  required: boolean
  type: 'string' | 'text' | 'number' | 'boolean' | 'array' | 'object' | 'date'
  description?: string
  default?: unknown
}

export interface ContentTemplate {
  type: ContentTemplateType
  collection: CollectionName
  directory: string
  label: string
  description: string
  requiredFields: ContentTemplateField[]
  optionalFields: ContentTemplateField[]
  bodySections: string[]
  frontmatterTemplate: Record<string, unknown>
  bodyTemplate: string
}

export const contentTemplates: Record<ContentTemplateType, ContentTemplate> = {
  insight: {
    type: 'insight',
    collection: 'insights',
    directory: 'content/insights',
    label: 'New Insight',
    description: 'Editorial article for the insights section',
    requiredFields: [
      { key: 'title', label: 'Title', required: true, type: 'string' },
      { key: 'description', label: 'Description', required: true, type: 'text' },
      { key: 'author', label: 'Author', required: true, type: 'object' },
      { key: 'category', label: 'Category', required: true, type: 'object' },
    ],
    optionalFields: [
      { key: 'keyTakeaways', label: 'Key Takeaways', required: false, type: 'array' },
      { key: 'estimatedSkillLevel', label: 'Skill Level', required: false, type: 'string' },
      { key: 'relatedServiceSlugs', label: 'Related Services', required: false, type: 'array' },
      { key: 'relatedTechnologySlugs', label: 'Related Technologies', required: false, type: 'array' },
      { key: 'tags', label: 'Tags', required: false, type: 'array' },
      { key: 'cover', label: 'Cover Image', required: false, type: 'object' },
    ],
    bodySections: ['Introduction', 'Main Content', 'Conclusion'],
    frontmatterTemplate: {
      status: 'draft',
      title: '',
      description: '',
      author: { name: company.name },
      category: { slug: 'engineering', name: 'Engineering' },
      publishedAt: null,
      updatedAt: null,
      readingTime: null,
      version: 1,
      featured: false,
      keyTakeaways: [],
      relatedServiceSlugs: [],
      relatedTechnologySlugs: [],
      relatedArticleSlugs: [],
      tags: [],
    },
    bodyTemplate: `# Article Title

Brief introduction that hooks the reader and states the problem or topic.

## Key Point One

Main content here.

## Key Point Two

Supporting details and examples.

## Conclusion

Summary and next steps for the reader.
`,
  },

  'case-study': {
    type: 'case-study',
    collection: 'caseStudies',
    directory: 'content/case-studies',
    label: 'New Case Study',
    description: 'Implementation story with business and engineering narrative',
    requiredFields: [
      { key: 'title', label: 'Title', required: true, type: 'string' },
      { key: 'description', label: 'Description', required: true, type: 'text' },
      { key: 'caseStudyType', label: 'Case Study Type', required: true, type: 'string' },
      { key: 'category', label: 'Category', required: true, type: 'string' },
      { key: 'challenge', label: 'Challenge', required: true, type: 'text' },
      { key: 'solution', label: 'Solution', required: true, type: 'text' },
    ],
    optionalFields: [
      { key: 'client', label: 'Client (if public)', required: false, type: 'string' },
      { key: 'projectLabel', label: 'Project Label', required: false, type: 'string' },
      { key: 'businessGoal', label: 'Business Goal', required: false, type: 'text' },
      { key: 'technologiesUsed', label: 'Technologies Used', required: false, type: 'array' },
      { key: 'industry', label: 'Industry', required: false, type: 'string' },
      { key: 'outcomes', label: 'Outcomes', required: false, type: 'array' },
      { key: 'metricsNote', label: 'Metrics Note', required: false, type: 'text' },
      { key: 'relatedServiceSlugs', label: 'Related Services', required: false, type: 'array' },
      { key: 'relatedSolutionLinks', label: 'Related Solutions', required: false, type: 'array' },
      { key: 'relatedTechnologySlugs', label: 'Technologies', required: false, type: 'array' },
      { key: 'relatedProjectSlugs', label: 'Related Projects', required: false, type: 'array' },
      { key: 'relatedInsightSlugs', label: 'Related Insights', required: false, type: 'array' },
    ],
    bodySections: ['Background', 'Challenge', 'Investigation', 'Solution', 'Implementation', 'Lessons Learned'],
    frontmatterTemplate: {
      status: 'draft',
      title: '',
      description: '',
      caseStudyType: 'technical-investigation',
      category: 'architecture',
      implementationStatus: 'in-progress',
      client: '',
      projectLabel: '',
      industry: '',
      businessGoal: '',
      technologiesUsed: [],
      challenge: '',
      solution: '',
      outcomes: [],
      metricsNote: 'No public metrics are available.',
      businessContext: '',
      investigation: '',
      architecture: '',
      implementation: '',
      implementationSteps: [],
      businessImpact: '',
      technicalImpact: '',
      lessonsLearned: [],
      tradeOffs: [],
      whatToDoDifferently: [],
      relatedServiceSlugs: [],
      relatedSolutionLinks: [],
      relatedTechnologySlugs: [],
      relatedProjectSlugs: [],
      relatedInsightSlugs: [],
      version: 1,
    },
    bodyTemplate: `# Case Study Title

## Background

Describe the starting situation and why the project mattered.

## The Challenge

Explain constraints, risks, and requirements.

## Investigation

Document options considered and why they were selected or rejected.

## Solution

Describe architecture and major implementation decisions.

## Implementation

Include milestones, workflows, and practical execution details.

## Lessons Learned

Capture mistakes, trade-offs, and what you would do differently.
`,
  },

  technology: {
    type: 'technology',
    collection: 'technologies',
    directory: 'content/technologies',
    label: 'New Technology',
    description: 'Technology guide and recommendation page',
    requiredFields: [
      { key: 'title', label: 'Title', required: true, type: 'string' },
      { key: 'description', label: 'Description', required: true, type: 'text' },
      { key: 'category', label: 'Category', required: true, type: 'string' },
    ],
    optionalFields: [
      { key: 'website', label: 'Website', required: false, type: 'string' },
      { key: 'useCases', label: 'Use Cases', required: false, type: 'array' },
      { key: 'bestFor', label: 'Best For', required: false, type: 'text' },
      { key: 'faqs', label: 'FAQs', required: false, type: 'array' },
      { key: 'relatedServiceSlugs', label: 'Related Services', required: false, type: 'array' },
    ],
    bodySections: ['Overview', 'When to Use', 'Common Mistakes', 'Alternatives'],
    frontmatterTemplate: {
      status: 'draft',
      title: '',
      description: '',
      category: '',
      website: '',
      useCases: [],
      bestFor: '',
      whenRecommended: '',
      whenNotRecommended: '',
      commonMistakes: [],
      faqs: [],
      relatedServiceSlugs: [],
      relatedProjectSlugs: [],
      relatedInsightSlugs: [],
      version: 1,
    },
    bodyTemplate: `# Technology Name

## Overview

What is this technology and why does it matter?

## When We Recommend It

Ideal use cases and project types.

## When We Don't Recommend It

Honest limitations and alternatives.

## Common Mistakes

Pitfalls to avoid.
`,
  },

  problem: {
    type: 'problem',
    collection: 'problems',
    directory: 'content/problems',
    label: 'New Problem Page',
    description: 'Business problem guide with symptoms, causes, and solutions',
    requiredFields: [
      { key: 'title', label: 'Title', required: true, type: 'string' },
      { key: 'description', label: 'Description', required: true, type: 'text' },
    ],
    optionalFields: [
      { key: 'symptoms', label: 'Symptoms', required: false, type: 'array' },
      { key: 'possibleCauses', label: 'Possible Causes', required: false, type: 'array' },
      { key: 'approach', label: 'Approach', required: false, type: 'text' },
      { key: 'faqs', label: 'FAQs', required: false, type: 'array' },
      { key: 'relatedServiceSlugs', label: 'Related Services', required: false, type: 'array' },
    ],
    bodySections: ['Symptoms', 'Diagnosis', 'Solutions', 'Before Hiring'],
    frontmatterTemplate: {
      status: 'draft',
      title: '',
      description: '',
      symptoms: [],
      possibleCauses: [],
      approach: '',
      potentialSolutions: [],
      howToDiagnose: '',
      beforeHiring: '',
      commonMisconceptions: [],
      relatedServiceSlugs: [],
      relatedTechnologySlugs: [],
      relatedCaseStudySlugs: [],
      faqs: [],
      version: 1,
    },
    bodyTemplate: `# Problem Title

## Symptoms

How do you know you have this problem?

## Possible Causes

Common root causes.

## How to Diagnose

Steps to identify the real issue.

## Potential Solutions

Options ranked by effort and impact.

## Before You Hire

What to try internally first.
`,
  },

  project: {
    type: 'project',
    collection: 'projects',
    directory: 'content/work',
    label: 'New Project',
    description: 'Portfolio project entry (TypeScript-based)',
    requiredFields: [
      { key: 'title', label: 'Title', required: true, type: 'string' },
      { key: 'description', label: 'Description', required: true, type: 'text' },
      { key: 'category', label: 'Category', required: true, type: 'string' },
    ],
    optionalFields: [
      { key: 'client', label: 'Client', required: false, type: 'string' },
      { key: 'year', label: 'Year', required: false, type: 'number' },
      { key: 'technologies', label: 'Technologies', required: false, type: 'array' },
      { key: 'gallery', label: 'Gallery', required: false, type: 'array' },
      { key: 'featured', label: 'Featured', required: false, type: 'boolean' },
    ],
    bodySections: ['Context', 'Challenge', 'Architecture', 'Lessons'],
    frontmatterTemplate: {
      status: 'draft',
      title: '',
      description: '',
      category: 'client',
      client: '',
      year: new Date().getFullYear(),
      technologies: [],
      featured: false,
      context: '',
      challenge: '',
      responsibilities: [],
      architecture: '',
      implementation: '',
      lessonsLearned: '',
      relatedServiceSlugs: [],
      relatedTechnologySlugs: [],
      relatedCaseStudySlugs: [],
      version: 1,
    },
    bodyTemplate: '',
  },
}

export function getTemplate(type: ContentTemplateType): ContentTemplate {
  return contentTemplates[type]
}

export function listTemplates(): ContentTemplate[] {
  return Object.values(contentTemplates)
}
