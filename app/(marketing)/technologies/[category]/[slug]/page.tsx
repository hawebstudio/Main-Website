import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { technologies } from '@/lib/content/source'
import {
  getRelatedCaseStudies,
  getRelatedInsights,
  getRelatedProjects,
  getRelatedServices,
  getRelatedTechnologies,
  getProjectsUsingTechnology,
  mergeRelationSlugs,
} from '@/lib/content/relations'
import { createMetadata } from '@/lib/seo/metadata'
import { faqJsonLd, technologyJsonLd } from '@/lib/seo/json-ld'
import { routes } from '@/config/routes'
import { CTAS } from '@/lib/data/ctas'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { JsonLd } from '@/components/seo/json-ld'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { CtaSection } from '@/components/sections/cta-section'
import { SocialShareSection } from '@/components/sections/social-share-section'
import { absoluteUrl } from '@/lib/seo/metadata'
import { mdxComponents } from '@/lib/content/mdx-components'
import { mdxOptions } from '@/lib/content/mdx-options'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, ExternalLink } from 'lucide-react'
import { TechnologyDetailHeroBackground } from '@/components/sections/hero-backgrounds'

interface TechnologyPageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const entries = await technologies.getAll()
  return entries
    .filter((entry) => entry.category)
    .map((entry) => ({ category: entry.category as string, slug: entry.slug }))
}

export async function generateMetadata({ params }: TechnologyPageProps): Promise<Metadata> {
  const { category, slug } = await params
  const tech = await technologies.getByCategoryAndSlug(category, slug)
  if (!tech) return {}

  return createMetadata({
    title: tech.seoTitle ?? `${tech.title} Development & Consulting`,
    description: tech.seoDescription ?? tech.description,
    path: routes.technologies.detail(category, slug),
    ogImage: tech.logo?.src,
  })
}

export default async function TechnologyDetailPage({ params }: TechnologyPageProps) {
  const { category, slug } = await params
  const tech = await technologies.getByCategoryAndSlug(category, slug)
  if (!tech) notFound()

  const categoryPage = await technologies.getCategoryPage(category)
  const relatedServices = await getRelatedServices(mergeRelationSlugs(tech.relatedServiceSlugs, tech.relatedServices))
  const projectsUsingTech = await getProjectsUsingTechnology(tech.slug)
  const relatedProjects = await getRelatedProjects(mergeRelationSlugs(tech.relatedProjectSlugs, tech.relatedWorks))
  const relatedCaseStudies = await getRelatedCaseStudies(mergeRelationSlugs(tech.relatedCaseStudySlugs, tech.relatedCaseStudies))
  const relatedInsights = await getRelatedInsights(mergeRelationSlugs(tech.relatedInsightSlugs, tech.relatedInsights))
  const relatedTechnologies = await getRelatedTechnologies(tech.relatedTechnologies)
  const officialWebsite = tech.officialWebsite || tech.website

  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Technologies', href: routes.technologies.index() },
    ...(categoryPage ? [{ label: categoryPage.title, href: routes.technologies.category(categoryPage.slug) }] : []),
    { label: tech.title, href: routes.technologies.detail(category, tech.slug) },
  ]

  return (
    <>
      <JsonLd
        data={[
          technologyJsonLd({
            title: tech.title,
            description: tech.description,
            path: routes.technologies.detail(category, tech.slug),
            website: officialWebsite,
          }),
          ...(tech.faqs?.length ? [faqJsonLd(tech.faqs)] : []),
        ]}
      />
      <HeroWrapper className="pt-8" background={<TechnologyDetailHeroBackground />}>
        <div className="relative z-20 space-y-4">
          <Breadcrumbs items={breadcrumbItems} className="pb-4" />
          <Eyebrow className="mb-4">{categoryPage?.title ?? tech.category ?? 'Technology'}</Eyebrow>
          <Heading level={1} size="display">
            {tech.title}
          </Heading>
          <Text size="lg" tone="muted" className="max-w-2xl">
            {tech.description}
          </Text>
          <div className="mt-6 flex flex-wrap gap-4">
            {officialWebsite && (
              <a href={officialWebsite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                Official website <ExternalLink className="size-4" />
              </a>
            )}
            {tech.documentation && (
              <a href={tech.documentation} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                Documentation <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>
      </HeroWrapper>

      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="@container lg:col-span-8 flex flex-col gap-16">
              {tech.bestFor && (
                <div className="flex flex-col gap-4">
                  <Heading level={2} size="lg">What is it best for?</Heading>
                  <Text>{tech.bestFor}</Text>
                </div>
              )}

              {(tech.whenRecommended || tech.whenNotRecommended) && (
                <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-8">
                  {tech.whenRecommended && (
                    <div className="flex flex-col gap-4 p-8 rounded-3xl bg-primary/5 border border-primary/10">
                      <Heading level={3} size="sm" className="text-primary flex items-center gap-2">
                        <CheckCircle2 className="size-5" /> When we recommend it
                      </Heading>
                      <Text>{tech.whenRecommended}</Text>
                    </div>
                  )}
                  {tech.whenNotRecommended && (
                    <div className="flex flex-col gap-4 p-8 rounded-3xl bg-destructive/5 border border-destructive/10">
                      <Heading level={3} size="sm" className="text-destructive flex items-center gap-2">
                        <XCircle className="size-5" /> When we do not
                      </Heading>
                      <Text>{tech.whenNotRecommended}</Text>
                    </div>
                  )}
                </div>
              )}

              {tech.content && (
                <div className="prose dark:prose-invert max-w-none">
                  <MDXRemote source={tech.content} components={mdxComponents} options={mdxOptions} />
                </div>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-col gap-12">
              <div className="sticky top-24 flex flex-col gap-12">
                {tech.difficulty && (
                  <div>
                    <Eyebrow className="mb-4">Difficulty</Eyebrow>
                    <Badge variant="secondary">{tech.difficulty}</Badge>
                  </div>
                )}

                {relatedTechnologies.length > 0 && (
                  <LinkList title="Related Technologies" items={relatedTechnologies.map((item) => ({
                    href: routes.technologies.detail(item.category ?? item.slug, item.category ? item.slug : undefined),
                    label: item.title,
                  }))} />
                )}

                {[...projectsUsingTech, ...relatedProjects].length > 0 && (
                  <LinkList title={`Projects Using ${tech.title}`} items={[...projectsUsingTech, ...relatedProjects].map((item) => ({
                    href: routes.work.detail(item.slug),
                    label: item.title,
                  }))} />
                )}

                {relatedServices.length > 0 && (
                  <LinkList title="Related Services" items={relatedServices.map((item) => ({
                    href: routes.services.detail(item.slug),
                    label: item.title,
                  }))} />
                )}

                {relatedCaseStudies.length > 0 && (
                  <LinkList title="Related Case Studies" items={relatedCaseStudies.map((item) => ({
                    href: routes.caseStudies.detail(item.slug),
                    label: item.title,
                  }))} />
                )}

                {relatedInsights.length > 0 && (
                  <LinkList title="Related Insights" items={relatedInsights.map((item) => ({
                    href: routes.insights.detail(item.slug),
                    label: item.title,
                  }))} />
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SocialShareSection
        title={tech.title}
        description={tech.description}
        url={absoluteUrl(routes.technologies.detail(category, tech.slug))}
      />

      <CtaSection
        title={`Need ${tech.title} implemented correctly?`}
        description="Talk to HA Web Studio about the right setup for your business."
        primaryCta={CTAS.requestAudit}
        secondaryCta={CTAS.bookConsultation}
      />
    </>
  )
}

function LinkList({ title, items }: { title: string; items: Array<{ href: string; label: string }> }) {
  const uniqueItems = [...new Map(items.map((item) => [item.href, item])).values()]
  return (
    <div>
      <Eyebrow className="mb-4">{title}</Eyebrow>
      <ul className="flex flex-col gap-3">
        {uniqueItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="text-primary hover:underline font-medium text-sm">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
