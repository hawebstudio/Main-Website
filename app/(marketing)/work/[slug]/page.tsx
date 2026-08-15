import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/lib/content/source'
import {
  getRelatedCaseStudies,
  getRelatedInsights,
  getRelatedServices,
  getRelatedTechnologies,
} from '@/lib/content/relations'
import { createMetadata } from '@/lib/seo/metadata'
import { routes } from '@/config/routes'
import { CTAS } from '@/lib/data/ctas'
import { projectJsonLd } from '@/lib/seo/json-ld'
import { absoluteUrl } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { SocialShareSection } from '@/components/sections/social-share-section'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { CtaSection } from '@/components/sections/cta-section'
import { ProjectDetailHero } from '@/components/sections/work/project-detail-hero'
import { ProjectGallerySection } from '@/components/sections/work/project-gallery-section'
import { ProjectFeaturesSection } from '@/components/sections/work/project-features-section'
import { ProjectGoalsSection } from '@/components/sections/work/project-goals-section'
import { ProjectOverviewSection } from '@/components/sections/work/project-overview-section'
import { ProjectRelatedSection } from '@/components/sections/work/project-related-section'
import { ProjectTransparencyNote } from '@/components/sections/work/project-transparency-note'


interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await projects.getSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await projects.getBySlug(slug)
  if (!project) return {}

  return createMetadata({
    title: project.seo?.title ?? project.title,
    description: project.seo?.description ?? project.description,
    path: routes.work.detail(slug),
    ogImage: project.cover?.src,
  })
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await projects.getBySlug(slug)
  if (!project) notFound()

  const relatedTech = await getRelatedTechnologies(project.relatedTechnologySlugs)
  const relatedServices = await getRelatedServices(project.relatedServiceSlugs)
  const relatedCaseStudies = await getRelatedCaseStudies(project.relatedCaseStudySlugs)
  const relatedInsights = await getRelatedInsights(project.relatedInsightSlugs)

  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Work', href: routes.work.index() },
    { label: project.title, href: routes.work.detail(project.slug) },
  ]

  const jsonLd = [
    projectJsonLd({
      title: project.title,
      description: project.description,
      path: routes.work.detail(project.slug),
      client: project.client,
    }),
  ]

  return (
    <article className="pb-4 md:pb-8">
      <JsonLd data={jsonLd} />
      <ProjectDetailHero project={project} breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="pb-4" />} />
      <ProjectOverviewSection project={project} />
      <ProjectGallerySection project={project} />
      <ProjectGoalsSection project={project} />
      <ProjectFeaturesSection project={project} />
      <ProjectRelatedSection
        project={project}
        relatedServices={relatedServices}
        relatedTechnologies={relatedTech}
        relatedCaseStudies={relatedCaseStudies}
        relatedInsights={relatedInsights}
      />
      <ProjectTransparencyNote />
      <SocialShareSection
        title={project.title}
        description={project.description}
        url={absoluteUrl(routes.work.detail(project.slug))}
      />
      <CtaSection
        title="Need a similar outcome?"
        description="Tell us your current challenge and we will map a practical path using the most relevant services and implementation approach."
        primaryCta={{ label: 'Discuss Your Project', href: routes.contact('start-project') }}
        secondaryCta={CTAS.requestAudit}
      />
    </article>
  )
}
