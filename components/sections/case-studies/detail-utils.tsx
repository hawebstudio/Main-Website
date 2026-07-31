import { Heading } from '@/components/primitives/typography'
import type { TocItem } from '@/components/sections/table-of-contents'
import type { CaseStudy } from '@/lib/content/types'
import type { WithContent } from '@/lib/content/source'

export type CaseStudyEntry = WithContent<CaseStudy>

export function toArray(value?: string | string[]): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export function toLabel(value: string): string {
  return value
    .split('-')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ')
}

export function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const items: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = createHeadingId(text)
    items.push({ level, text, id })
  }

  return items
}

export function createHeadingComponents() {
  return {
    h2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = typeof children === 'string' ? children : ''
      const id = createHeadingId(text)
      return (
        <Heading level={2} size="lg" id={id} className={`mt-12 scroll-m-24 border-b border-border pb-2 ${className || ''}`} {...props}>
          {children}
        </Heading>
      )
    },
    h3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = typeof children === 'string' ? children : ''
      const id = createHeadingId(text)
      return (
        <Heading level={3} size="md" id={id} className={`mt-8 scroll-m-24 ${className || ''}`} {...props}>
          {children}
        </Heading>
      )
    },
  }
}

export function estimateReadingTime(caseStudy: CaseStudyEntry) {
  const sections = [
    caseStudy.summary,
    caseStudy.background,
    caseStudy.businessContext,
    caseStudy.challenge,
    caseStudy.investigation,
    caseStudy.solution,
    caseStudy.architecture,
    caseStudy.implementation,
    caseStudy.technicalDetails,
    caseStudy.lessons,
    caseStudy.content,
  ]
    .filter(Boolean)
    .join(' ')

  const words = sections.trim().split(/\s+/).filter(Boolean).length
  return Math.max(2, Math.ceil(words / 220))
}

function createHeadingId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
