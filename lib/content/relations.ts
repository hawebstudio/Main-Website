import {
  services,
  projects,
  technologies,
  caseStudies,
  insights,
  problems,
  type WithContent
} from './source'
import type {
  Service,
  Project,
  Technology,
  CaseStudy,
  Insight,
  Problem
} from './types'
 
export async function getRelatedServices(slugs?: string[]): Promise<WithContent<Service>[]> {
  if (!slugs || slugs.length === 0) return []
  const all = await services.getAll()
  return all.filter(s => slugs.includes(s.slug))
}

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  return [...new Map(items.map((item) => [item.slug, item])).values()]
}

export function mergeRelationSlugs(...values: Array<string[] | undefined>): string[] {
  return [...new Set(values.flatMap((value) => value ?? []))]
}

export async function getRelatedProjects(slugs?: string[]): Promise<WithContent<Project>[]> {
  if (!slugs || slugs.length === 0) return []
  const all = await projects.getAll()
  return all.filter(p => slugs.includes(p.slug))
}

export async function getRelatedTechnologies(slugs?: string[]): Promise<WithContent<Technology>[]> {
  if (!slugs || slugs.length === 0) return []
  const all = await technologies.getAll()
  return all.filter(t => slugs.includes(t.slug))
}

export async function getRelatedCaseStudies(slugs?: string[]): Promise<WithContent<CaseStudy>[]> {
  if (!slugs || slugs.length === 0) return []
  const all = await caseStudies.getAll()
  return all.filter(c => slugs.includes(c.slug))
}

export async function getRelatedInsights(slugs?: string[]): Promise<WithContent<Insight>[]> {
  if (!slugs || slugs.length === 0) return []
  const all = await insights.getAll()
  return all.filter(i => slugs.includes(i.slug))
}

export async function getRelatedProblems(slugs?: string[]): Promise<WithContent<Problem>[]> {
  if (!slugs || slugs.length === 0) return []
  const all = await problems.getAll()
  return all.filter(p => slugs.includes(p.slug))
}
 

export async function getProjectsUsingTechnology(technologySlug: string): Promise<WithContent<Project>[]> {
  const all = await projects.getAll()
  return all.filter(p => p.technologies?.includes(technologySlug) || p.relatedTechnologySlugs?.includes(technologySlug))
}

export async function getServicesUsingTechnology(technologySlug: string): Promise<WithContent<Service>[]> {
  const all = await services.getAll()
  const normalizedSlug = technologySlug.toLowerCase()
  return all.filter((service) =>
    service.recommendedTechnologies?.some((technology) => {
      const normalizedTechnology = technology.toLowerCase()
      return normalizedTechnology === normalizedSlug || normalizedTechnology.replace(/[^a-z0-9]+/g, '-') === normalizedSlug
    }),
  )
}

export async function getProjectsForServices(serviceSlugs: string[]): Promise<WithContent<Project>[]> {
  if (serviceSlugs.length === 0) return []
  const all = await projects.getAll()
  return all.filter((project) =>
    project.relatedServiceSlugs?.some((slug) => serviceSlugs.includes(slug)),
  )
}

export async function getProjectsForService(serviceSlug: string): Promise<WithContent<Project>[]> {
  return getProjectsForServices([serviceSlug])
}

export async function getCaseStudiesForServices(serviceSlugs: string[]): Promise<WithContent<CaseStudy>[]> {
  if (serviceSlugs.length === 0) return []
  const all = await caseStudies.getAll()
  return all.filter((caseStudy) =>
    caseStudy.relatedServiceSlugs?.some((slug) => serviceSlugs.includes(slug)),
  )
}

export async function getCaseStudiesForService(serviceSlug: string): Promise<WithContent<CaseStudy>[]> {
  return getCaseStudiesForServices([serviceSlug])
}

export async function getInsightsForServices(serviceSlugs: string[]): Promise<WithContent<Insight>[]> {
  if (serviceSlugs.length === 0) return []
  const all = await insights.getAll()
  return all.filter((insight) =>
    insight.relatedServiceSlugs?.some((slug) => serviceSlugs.includes(slug)),
  )
}

export async function getInsightsForService(serviceSlug: string): Promise<WithContent<Insight>[]> {
  return getInsightsForServices([serviceSlug])
}

export async function getTechnologiesForServices(serviceSlugs: string[]): Promise<WithContent<Technology>[]> {
  if (serviceSlugs.length === 0) return []
  const all = await technologies.getAll()
  return all.filter((technology) =>
    mergeRelationSlugs(technology.relatedServiceSlugs, technology.relatedServices).some((slug) =>
      serviceSlugs.includes(slug),
    ),
  )
}

export async function getTechnologiesForService(serviceSlug: string): Promise<WithContent<Technology>[]> {
  return getTechnologiesForServices([serviceSlug])
}

export async function getServiceSiblings(service: Service): Promise<WithContent<Service>[]> {
  const explicit = await getRelatedServices(service.relatedServices)
  const all = await services.getAll()
  const family = service.family
    ? all.filter((item) => item.family === service.family && item.slug !== service.slug)
    : []

  return uniqueBySlug([...explicit, ...family]).filter((item) => item.slug !== service.slug)
}

export async function getCaseStudiesForProject(projectSlug: string): Promise<WithContent<CaseStudy>[]> {
  const all = await caseStudies.getAll()
  return all.filter(
    (c) => c.relatedProjectSlug === projectSlug || c.relatedProjectSlugs?.includes(projectSlug),
  )
}

export async function getProblemsForService(serviceSlug: string): Promise<WithContent<Problem>[]> {
  const all = await problems.getAll()
  return all.filter(p => p.relatedServiceSlugs?.includes(serviceSlug))
}
