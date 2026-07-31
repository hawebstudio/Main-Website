import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpenText, Search } from 'lucide-react'
import { createMetadata } from '@/lib/seo/metadata'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text } from '@/components/primitives/typography'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { CtaSection } from '@/components/sections/cta-section'
import { MagazineLayout, MagazineFeatured, MagazineGrid } from '@/components/layouts/magazine-layout'
import { InsightCard } from '@/components/cards/domain-cards'
import { InsightsFilterPanel } from '@/components/sections/insights/insights-filter-panel'
import { insights } from '@/lib/content/source'
import { buttonVariants } from '@/components/ui/button'
import { routes } from '@/config/routes'

interface InsightsPageProps {
  searchParams: Promise<{ topic?: string | string[] }>
}

export const metadata: Metadata = createMetadata({
  title: 'Insights',
  description:
    'Thoughts on performance, development, SEO, and the future of web experiences.',
  path: '/insights',
})

function getSingleValue(value?: string | string[]): string | undefined {
  if (Array.isArray(value)) return value[0]
  return value
}

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const filters = await searchParams
  const selectedTopic = getSingleValue(filters.topic)
  const allInsights = await insights.getAll()

  const filteredInsights = selectedTopic
    ? allInsights.filter((insight) => insight.category?.slug === selectedTopic)
    : allInsights

  const sortedInsights = [...filteredInsights].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')
  })

  const featuredInsight = sortedInsights.find((insight) => insight.featured)
  const gridInsights = featuredInsight
    ? sortedInsights.filter((insight) => insight.slug !== featuredInsight.slug)
    : sortedInsights

  return (
    <>
      <HeroWrapper>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end">
          <div className="flex flex-col gap-6">
            <Heading level={1} size="display">
              Insights
            </Heading>
            <Text size="lg" tone="muted" className="max-w-xl">
              Thoughts on performance, development, SEO, and the future of web experiences.
            </Text>
            <div className="flex flex-wrap gap-3">
              <Link href={routes.contact()} className={buttonVariants()}>
                Talk to the studio
              </Link>
              <Link href={routes.services.index()} className={buttonVariants({ variant: 'outline', className: 'bg-transparent' })}>
                See how we work
              </Link>
            </div>
          </div>
          <div className="glass-strong grid gap-4 rounded-[2rem] p-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
              <BookOpenText className="size-5 text-primary" />
              <div className="mt-3 text-2xl font-semibold tracking-tight">Editorial depth</div>
              <Text size="sm" tone="muted" className="mt-2">
                Articles are structured to be read, scanned, and linked.
              </Text>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
              <Search className="size-5 text-primary" />
              <div className="mt-3 text-2xl font-semibold tracking-tight">Searchable by design</div>
              <Text size="sm" tone="muted" className="mt-2">
                Content is prepared for discovery across internal and external search.
              </Text>
            </div>
          </div>
        </div>
      </HeroWrapper>

      <InsightsFilterPanel selectedTopic={selectedTopic} resultCount={sortedInsights.length} />

      <Section spacing="sm">
        <Container>
          {sortedInsights.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed bg-secondary/10 py-24 text-center">
              <Heading level={3}>
                {selectedTopic ? 'No articles match this topic' : 'No articles yet'}
              </Heading>
              <Text tone="muted" className="mt-2">
                {selectedTopic ? 'Try another topic or view all insights.' : "We're busy writing some new content."}
              </Text>
              {selectedTopic ? (
                <Link href={routes.insights.index()} className={buttonVariants({ variant: 'outline', className: 'mt-6 bg-transparent' })}>
                  View all insights
                </Link>
              ) : null}
            </div>
          ) : (
            <MagazineLayout>
              {featuredInsight ? (
                <MagazineFeatured>
                  <div className="mx-auto mb-12 max-w-4xl">
                    <InsightCard insight={featuredInsight} />
                  </div>
                </MagazineFeatured>
              ) : null}

              {gridInsights.length > 0 ? (
                <MagazineGrid gridCols={3}>
                  {gridInsights.map((insight) => (
                    <div key={insight.slug} className="flex flex-col">
                      <InsightCard insight={insight} />
                    </div>
                  ))}
                </MagazineGrid>
              ) : null}
            </MagazineLayout>
          )}
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}
