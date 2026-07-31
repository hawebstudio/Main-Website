import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text } from '@/components/primitives/typography'
import { MagazineFeatured, MagazineGrid, MagazineLayout } from '@/components/layouts/magazine-layout'
import { CaseStudyCard } from '@/components/cards/domain-cards'
import type { WithContent } from '@/lib/content/source'
import type { CaseStudy } from '@/lib/content/types'

export function CaseStudiesResultsSection({ items }: { items: WithContent<CaseStudy>[] }) {
  const [featured, ...rest] = items

  return (
    <Section spacing="md">
      <Container>
        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/60 bg-background/30 p-10 text-center">
            <Heading level={3}>No case studies match these filters</Heading>
            <Text tone="muted" className="mx-auto mt-3 max-w-2xl">
              Try a broader filter set, or reset filters to view all implementation stories.
            </Text>
          </div>
        ) : (
          <MagazineLayout>
            {featured ? (
              <MagazineFeatured>
                <div className="mx-auto mb-12 max-w-4xl">
                  <CaseStudyCard caseStudy={featured} />
                </div>
              </MagazineFeatured>
            ) : null}
            {rest.length > 0 ? (
              <MagazineGrid gridCols={2}>
                {rest.map((item) => (
                  <CaseStudyCard key={item.slug} caseStudy={item} />
                ))}
              </MagazineGrid>
            ) : null}
          </MagazineLayout>
        )}
      </Container>
    </Section>
  )
}
