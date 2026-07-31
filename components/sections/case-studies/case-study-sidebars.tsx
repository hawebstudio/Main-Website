import Link from 'next/link'
import { Link2, ShieldCheck } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { CaseStudyCard, InsightCard, ProjectCard, ServiceCard, TechnologyCard } from '@/components/cards/domain-cards'
import { TableOfContents, type TocItem } from '@/components/sections/table-of-contents'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { routes } from '@/config/routes'
import type { CaseStudyEntry } from './detail-utils'
import type { WithContent } from '@/lib/content/source'
import type { CaseStudy, Insight, Project, Service, Technology } from '@/lib/content/types'

export function CaseStudyOverviewSidebar({ caseStudy, tocItems }: { caseStudy: CaseStudyEntry; tocItems: TocItem[] }) {
  return (
    <aside className="hidden lg:col-span-3 lg:flex lg:flex-col lg:gap-10">
      <div className="sticky top-24 flex flex-col gap-10">
        <div className="rounded-2xl border border-border/60 bg-background/35 p-4">
          <Eyebrow className="mb-3">Overview</Eyebrow>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {caseStudy.projectLabel ? <li>{caseStudy.projectLabel}</li> : null}
            {caseStudy.client ? <li>Client: {caseStudy.client}</li> : null}
            {caseStudy.businessGoal ? <li>Goal: {caseStudy.businessGoal}</li> : null}
          </ul>
        </div>
        <TableOfContents items={tocItems} />
        <div className="rounded-2xl border border-border/60 bg-background/35 p-4 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2 text-primary">
            <ShieldCheck className="size-4" /> Transparency rule
          </div>
          <p className="mt-2 leading-relaxed">This study avoids fabricated metrics, testimonials, and hidden assumptions.</p>
        </div>
      </div>
    </aside>
  )
}

interface CaseStudyRelatedSidebarProps {
  caseStudy: CaseStudyEntry
  relatedServices: WithContent<Service>[]
  relatedTech: WithContent<Technology>[]
  relatedProjects: WithContent<Project>[]
  relatedInsights: WithContent<Insight>[]
}

export function CaseStudyRelatedSidebar({
  caseStudy,
  relatedServices,
  relatedTech,
  relatedProjects,
  relatedInsights,
}: CaseStudyRelatedSidebarProps) {
  return (
    <aside className="flex flex-col gap-8 lg:col-span-3">
      <div className="sticky top-24 flex flex-col gap-8">
        {relatedServices.length > 0 ? (
          <RelatedBlock title="Related services">
            {relatedServices.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </RelatedBlock>
        ) : null}
        {caseStudy.relatedSolutionLinks?.length ? (
          <div>
            <Eyebrow className="mb-4">Related solutions</Eyebrow>
            <div className="flex flex-wrap gap-2">
              {caseStudy.relatedSolutionLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        {relatedProjects.length > 0 ? (
          <RelatedBlock title="Related work">
            {relatedProjects.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </RelatedBlock>
        ) : null}
        {relatedTech.length > 0 ? (
          <RelatedBlock title="Related technologies">
            {relatedTech.map((item) => (
              <TechnologyCard key={item.slug} technology={item} />
            ))}
          </RelatedBlock>
        ) : null}
        {relatedInsights.length > 0 ? (
          <RelatedBlock title="Related insights">
            {relatedInsights.map((item) => (
              <InsightCard key={item.slug} insight={item} />
            ))}
          </RelatedBlock>
        ) : null}

        <div className="rounded-2xl border border-border/60 bg-background/35 p-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Link2 className="size-4" /> Evidence note
          </div>
          <Text size="sm" tone="muted" className="mt-2 leading-relaxed">
            This case study documents real implementation work and explicitly flags unknown or private details.
          </Text>
        </div>

        <Link href={routes.caseStudies.index()} className={buttonVariants({ variant: 'outline', className: 'bg-transparent' })}>
          Browse All Case Studies
        </Link>
      </div>
    </aside>
  )
}

export function MoreCaseStudiesSection({ items }: { items: WithContent<CaseStudy>[] }) {
  if (items.length === 0) return null

  return (
    <div className="rounded-3xl border border-border/50 bg-background/30 p-6">
      <Eyebrow className="mb-4">More implementation stories</Eyebrow>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <CaseStudyCard key={item.slug} caseStudy={item} />
        ))}
      </div>
    </div>
  )
}

function RelatedBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Eyebrow className="mb-4">{title}</Eyebrow>
      <div className="grid gap-3">{children}</div>
    </div>
  )
}
