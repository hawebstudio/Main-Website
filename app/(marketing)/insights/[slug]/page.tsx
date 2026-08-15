import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { insights } from '@/lib/content/source'
import { getRelatedServices, getRelatedTechnologies, getRelatedInsights, getRelatedProblems, getRelatedCaseStudies } from '@/lib/content/relations'
import { createMetadata } from '@/lib/seo/metadata'
import { blogPostingJsonLd, faqJsonLd } from '@/lib/seo/json-ld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { routes } from '@/config/routes'
import { CTAS } from '@/lib/data/ctas'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { JsonLd } from '@/components/seo/json-ld'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { CtaSection } from '@/components/sections/cta-section'
import { mdxComponents } from '@/lib/content/mdx-components'
import { mdxOptions } from '@/lib/content/mdx-options'
import { ReadingProgress } from '@/components/sections/reading-progress'
import { TableOfContents, type TocItem } from '@/components/sections/table-of-contents'
import { AuthorCard } from '@/components/sections/author-card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'
import { SocialShareSection } from '@/components/sections/social-share-section'
import { absoluteUrl } from '@/lib/seo/metadata'

interface InsightPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await insights.getSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params
  const insight = await insights.getBySlug(slug)
  if (!insight) return {}

  return createMetadata({
    title: insight.seo?.title ?? insight.title,
    description: insight.seo?.description ?? insight.description,
    path: routes.insights.detail(slug),
    ogImage: insight.cover?.src,
    article: {
      publishedTime: insight.publishedAt,
      modifiedTime: insight.updatedAt,
      authors: insight.author?.name ? [insight.author.name] : undefined,
      tags: insight.tags?.map((tag) => tag.name),
    },
  })
}

// Simple heading extractor for TOC
function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const items: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    items.push({ level, text, id })
  }

  return items
}

// Create heading overrides that inject IDs for TOC
const createHeadingComponents = () => {
  return {
    h2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = typeof children === 'string' ? children : ''
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return (
        <Heading level={2} size="lg" id={id} className={`mt-12 scroll-m-24 border-b border-border pb-2 ${className || ''}`} {...props}>
          {children}
        </Heading>
      )
    },
    h3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = typeof children === 'string' ? children : ''
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return (
        <Heading level={3} size="md" id={id} className={`mt-8 scroll-m-24 ${className || ''}`} {...props}>
          {children}
        </Heading>
      )
    }
  }
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params
  const insight = await insights.getBySlug(slug)
  if (!insight) notFound()

  const relatedTech = await getRelatedTechnologies(insight.relatedTechnologySlugs)
  const relatedServices = await getRelatedServices(insight.relatedServiceSlugs)
  const relatedArticles = await getRelatedInsights(insight.relatedArticleSlugs)
  const relatedProblems = await getRelatedProblems(insight.relatedProblemSlugs)
  const relatedCaseStudies = await getRelatedCaseStudies(insight.relatedCaseStudySlugs)
  
  const tocItems = insight.content ? extractHeadings(insight.content) : []
  const customMdxComponents = { ...mdxComponents, ...createHeadingComponents() }

  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Insights', href: routes.insights.index() },
    { label: insight.title, href: routes.insights.detail(insight.slug) },
  ]

  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd({
            title: insight.title,
            description: insight.description,
            path: routes.insights.detail(insight.slug),
            publishedAt: insight.publishedAt,
            updatedAt: insight.updatedAt,
            authorName: insight.author?.name,
            image: insight.cover?.src,
          }),
          ...(insight.faqs?.length ? [faqJsonLd(insight.faqs)] : []),
        ]}
      />
      <ReadingProgress />
      <Breadcrumbs items={breadcrumbItems} className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" />
      
      <Section spacing="md">
        <Container size="md">
          {/* Article Header */}
          <div className="flex flex-col gap-6 mb-16 items-center text-center">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {insight.category?.name && <Badge variant="secondary">{insight.category.name}</Badge>}
              {insight.readingTime && (
                <span className="flex items-center gap-1"><Clock className="size-4" /> {insight.readingTime} min read</span>
              )}
              {insight.estimatedSkillLevel && (
                <span className="flex items-center gap-1 text-primary">{insight.estimatedSkillLevel}</span>
              )}
            </div>
            
            <Heading level={1} size="xl" className="text-balance">
              {insight.title}
            </Heading>
            
            <Text size="lg" tone="muted" className="max-w-2xl text-balance">
              {insight.description}
            </Text>
          </div>
        </Container>

        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
            
            {/* Left Sidebar (Author & TOC) */}
            <aside className="lg:col-span-3 hidden lg:flex flex-col gap-12">
              <div className="sticky top-24 flex flex-col gap-12">
                {insight.author && (
                  <AuthorCard author={insight.author} />
                )}
                <TableOfContents items={tocItems} />
              </div>
            </aside>
            
            {/* Main Article Content */}
            <article className="lg:col-span-6 flex flex-col gap-8">
              
              {/* Key Takeaways */}
              {insight.keyTakeaways && insight.keyTakeaways.length > 0 && (
                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col gap-4 mb-8">
                  <Heading level={2} size="sm" className="text-primary flex items-center gap-2">
                    <CheckCircle2 className="size-5" /> Key Takeaways
                  </Heading>
                  <ul className="flex flex-col gap-3">
                    {insight.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Text size="sm">{takeaway}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* MDX Body */}
              {insight.content && (
                <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-a:text-primary">
                  <MDXRemote source={insight.content} components={customMdxComponents} options={mdxOptions} />
                </div>
              )}

              {/* FAQ Accordion */}
              {insight.faqs && insight.faqs.length > 0 && (
                <div className="mt-8 border-t border-border pt-8">
                  <Heading level={2} size="lg" className="mb-6">Frequently Asked Questions</Heading>
                  <Accordion type="single" collapsible className="w-full">
                    {insight.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`} className="border-border/50">
                        <AccordionTrigger className="text-left text-base font-medium hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </article>

            {/* Right Sidebar (Related Content) */}
            <aside className="lg:col-span-3 flex flex-col gap-12">
              <div className="sticky top-24 flex flex-col gap-12">
                
                {relatedTech.length > 0 && (
                  <div>
                    <Eyebrow className="mb-4">Mentioned Tech</Eyebrow>
                    <div className="flex flex-wrap gap-2">
                      {relatedTech.map(tech => (
                        <Badge key={tech.slug} variant="secondary">{tech.title}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {relatedServices.length > 0 && (
                  <div>
                    <Eyebrow className="mb-4">Relevant Services</Eyebrow>
                    <ul className="flex flex-col gap-3">
                      {relatedServices.map(s => (
                        <li key={s.slug}>
                          <Link href={routes.services.detail(s.slug)} className="text-primary hover:underline font-medium text-sm">
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {relatedProblems.length > 0 && (
                  <div>
                    <Eyebrow className="mb-4">Related Problems</Eyebrow>
                    <ul className="flex flex-col gap-3">
                      {relatedProblems.map(p => (
                        <li key={p.slug}>
                          <Link href={routes.problems.detail(p.slug)} className="text-primary hover:underline font-medium text-sm">
                            {p.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {relatedCaseStudies.length > 0 && (
                  <div>
                    <Eyebrow className="mb-4">Case Studies</Eyebrow>
                    <ul className="flex flex-col gap-3">
                      {relatedCaseStudies.map(cs => (
                        <li key={cs.slug}>
                          <Link href={routes.caseStudies.detail(cs.slug)} className="text-primary hover:underline font-medium text-sm">
                            {cs.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {relatedArticles.length > 0 && (
                  <div>
                    <Eyebrow className="mb-4">Related Articles</Eyebrow>
                    <ul className="flex flex-col gap-4">
                      {relatedArticles.map(a => (
                        <li key={a.slug} className="flex flex-col gap-1">
                          <Link href={routes.insights.detail(a.slug)} className="text-primary hover:underline font-medium text-sm leading-tight">
                            {a.title}
                          </Link>
                          {a.readingTime && <Text size="sm" tone="muted" className="text-xs">{a.readingTime} min read</Text>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
              </div>
            </aside>
            
          </div>
        </Container>
      </Section>

      <SocialShareSection
        title={insight.title}
        description={insight.description}
        url={absoluteUrl(routes.insights.detail(insight.slug))}
      />

      <CtaSection
        title="Want to know what's holding your website back?"
        description="Get a clear picture of what to fix first, and what it would take."
        primaryCta={CTAS.requestAudit}
        secondaryCta={CTAS.viewWork}
      />
    </>
  )
}
