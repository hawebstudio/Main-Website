import Link from 'next/link'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Eyebrow } from '@/components/primitives/typography'
import { CaseStudyCard, InsightCard, ServiceCard, TechnologyCard } from '@/components/cards/domain-cards'
import type { WithContent } from '@/lib/content/source'
import type { CaseStudy, Insight, Project, Service, Technology } from '@/lib/content/types'

interface ProjectRelatedSectionProps {
  project: WithContent<Project>
  relatedServices: WithContent<Service>[]
  relatedTechnologies: WithContent<Technology>[]
  relatedCaseStudies: WithContent<CaseStudy>[]
  relatedInsights: WithContent<Insight>[]
}

export function ProjectRelatedSection({
  project,
  relatedServices,
  relatedTechnologies,
  relatedCaseStudies,
  relatedInsights,
}: ProjectRelatedSectionProps) {
  return (
    <Section spacing="lg" className="bg-muted/20">
      <Container>
        <div className="grid gap-6 xl:grid-cols-12">
          <div className="rounded-[2rem] border border-border/50 bg-background/35 p-5 xl:col-span-6">
            <Eyebrow>Services connected</Eyebrow>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {relatedServices.length > 0 ? (
                relatedServices.map((service) => <ServiceCard key={service.slug} service={service} />)
              ) : (
                <EmptyState className="md:col-span-2">No direct service mapping is published yet.</EmptyState>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/50 bg-background/35 p-5 xl:col-span-6">
            <Eyebrow>Solutions connected</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.relatedSolutionLinks?.length ? (
                project.relatedSolutionLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))
              ) : (
                <span className="rounded-full border border-dashed border-border/60 bg-background/30 px-3 py-1.5 text-sm text-muted-foreground">
                  Solution links will be added when problem mapping is finalized.
                </span>
              )}
            </div>
          </div>

          <RelatedColumn title="Technologies connected" emptyText="Dedicated technology pages are limited right now.">
            {relatedTechnologies.map((technology) => <TechnologyCard key={technology.slug} technology={technology} />)}
          </RelatedColumn>
          <RelatedColumn title="Case studies connected" emptyText="No public case study is attached to this project yet.">
            {relatedCaseStudies.map((caseStudy) => <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />)}
          </RelatedColumn>
          <RelatedColumn title="Insights connected" emptyText="Related insight articles are not linked yet.">
            {relatedInsights.map((insight) => <InsightCard key={insight.slug} insight={insight} />)}
          </RelatedColumn>
        </div>
      </Container>
    </Section>
  )
}

function RelatedColumn({ title, emptyText, children }: { title: string; emptyText: string; children: React.ReactNode }) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : Boolean(children)

  return (
    <div className="rounded-[2rem] border border-border/50 bg-background/35 p-5 xl:col-span-4">
      <Eyebrow>{title}</Eyebrow>
      <div className="mt-4 grid gap-3">{hasChildren ? children : <EmptyState>{emptyText}</EmptyState>}</div>
    </div>
  )
}

function EmptyState({ children, className }: { children: string; className?: string }) {
  return (
    <div className={`rounded-2xl border border-dashed border-border/60 bg-background/30 p-4 text-sm text-muted-foreground ${className || ''}`}>
      {children}
    </div>
  )
}
