import { ContentCard } from '@/components/cards/content-card'
import { routes } from '@/config/routes'
import { buildWhatsAppUrl, serviceWhatsAppMessage } from '@/lib/whatsapp'
import type {
  Service,
  Project,
  CaseStudy,
  Technology,
  Insight,
  Problem,
} from '@/lib/content/types'

 

export function ServiceCard({ service }: { service: Service }) {
  return (
    <ContentCard
      href={routes.services.detail(service.slug)}
      title={service.title}
      description={service.description}
      cover={service.cover}
      tags={service.tags?.map((tag) => tag.name)}
      whatsappHref={buildWhatsAppUrl(serviceWhatsAppMessage(service.title))}
    />
  )
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <ContentCard
      href={routes.work.detail(project.slug)}
      title={project.title}
      description={project.description}
      eyebrow={project.client ?? project.category}
      cover={project.cover}
      tags={project.technologies}
      meta={project.year ? String(project.year) : undefined}
    />
  )
}

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const typeLabel =
    caseStudy.caseStudyType === 'client'
      ? 'Client Case Study'
      : caseStudy.caseStudyType === 'internal'
        ? 'Internal Case Study'
        : caseStudy.caseStudyType === 'personal-engineering'
          ? 'Personal Engineering'
          : 'Technical Investigation'

  return (
    <ContentCard
      href={routes.caseStudies.detail(caseStudy.slug)}
      title={caseStudy.title}
      description={caseStudy.description}
      eyebrow={caseStudy.client ?? `${typeLabel} • ${caseStudy.category}`}
      cover={caseStudy.cover}
      tags={caseStudy.tags?.map((tag) => tag.name) ?? caseStudy.technologiesUsed}
      meta={caseStudy.year ? String(caseStudy.year) : undefined}
    />
  )
}

export function TechnologyCard({ technology }: { technology: Technology }) {
  return (
    <ContentCard
      href={routes.technologies.detail(technology.category ?? technology.slug, technology.category ? technology.slug : undefined)}
      title={technology.title}
      description={technology.description}
      eyebrow={technology.category}
      cover={technology.logo}
    />
  )
}

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <ContentCard
      href={routes.insights.detail(insight.slug)}
      title={insight.title}
      description={insight.description}
      eyebrow={insight.category?.name}
      cover={insight.cover}
      meta={insight.readingTime ? `${insight.readingTime} min read` : undefined}
    />
  )
}

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <ContentCard
      href={routes.problems.detail(problem.slug)}
      title={problem.title}
      description={problem.description}
      tags={problem.tags?.map((tag) => tag.name)}
    />
  )
}
