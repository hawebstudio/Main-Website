import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { EditorialCard } from '@/components/cards/editorial-card'
import { InsightCard } from '@/components/cards/domain-cards'
import { MagazineLayout, MagazineFeatured, MagazineGrid } from '@/components/layouts/magazine-layout'
import type { CaseStudy, Insight } from '@/lib/content/types'
import type { WithContent } from '@/lib/content/source'
import { SectionHeading } from './section-heading'

interface InsightsSectionProps {
  insights: WithContent<Insight>[]
  caseStudies: WithContent<CaseStudy>[]
}

export function InsightsSection({ insights, caseStudies }: InsightsSectionProps) {
  return (
    <Section spacing="xl">
      <Container>
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Insights"
            title="Guides and case studies on web development, SEO, and AI search."
            href="/insights"
            ctaLabel="View all insights"
          />

          {insights.length > 0 || caseStudies.length > 0 ? (
            <MagazineLayout>
              {insights[0] ? (
                <MagazineFeatured>
                  <div className="mx-auto max-w-4xl">
                    <InsightCard insight={insights[0]} />
                  </div>
                </MagazineFeatured>
              ) : null}
              <MagazineGrid gridCols={3}>
                {insights.slice(1).map((insight) => (
                  <InsightCard key={insight.slug} insight={insight} />
                ))}
                {caseStudies.map((caseStudy) => (
                  <EditorialCard
                    key={caseStudy.slug}
                    title={caseStudy.title}
                    description={caseStudy.description}
                    href={`/case-studies/${caseStudy.slug}`}
                    tag="Case Study"
                  />
                ))}
              </MagazineGrid>
            </MagazineLayout>
          ) : (
            <div className="rounded-3xl border border-dashed border-border/60 bg-muted/20 p-10 text-center text-muted-foreground">
              Insights will be added as the content library grows.
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
