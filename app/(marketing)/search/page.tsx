import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SiteSearch } from '@/components/search/site-search'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { Container } from '@/components/primitives/container'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text } from '@/components/primitives/typography'
import { createMetadata } from '@/lib/seo/metadata'
import type { SearchDocumentType } from '@/lib/search'
import { routes } from '@/config/routes'
import { SearchHeroBackground } from '@/components/sections/hero-backgrounds'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    type?: string
  }>
}

const searchTypes: SearchDocumentType[] = ['service', 'work', 'case-study', 'problem', 'insight', 'technology']

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams
  // The bare /search page is a legitimate, useful feature page and stays
  // indexable. Once a query is present it becomes an internal search
  // results page — Google's Search Essentials guidance recommends keeping
  // those out of the index (thin, near-duplicate, query-string-driven
  // content), so noindex any URL that carries a q= param.
  const isResultsView = Boolean(params.q)

  return createMetadata({
    title: 'Search',
    description: 'Search HA Web Studio services, work, case studies, insights, technologies, and business problems.',
    path: routes.search(),
    noIndex: isResultsView,
  })
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q ?? ''
  const type = searchTypes.includes(params.type as SearchDocumentType) ? (params.type as SearchDocumentType) : 'all'
  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Search', href: routes.search() },
  ]

  return (
    <article className="pb-4 md:pb-8">
      <HeroWrapper className="pb-14 pt-8 md:pb-18" background={<SearchHeroBackground />}>
        <div className="mx-auto max-w-4xl relative z-20">
          <Breadcrumbs items={breadcrumbItems} className="pb-4" />
          <Heading level={1} size="display" className="text-balance leading-[0.9] tracking-tight">
            Search HA Web Studio
          </Heading>
          <Text size="lg" tone="muted" className="mt-5 max-w-2xl leading-relaxed">
            Find services, technologies, case studies, insights, and project examples from one fast, keyboard-friendly search experience.
          </Text>
        </div>
      </HeroWrapper>

      <Container>
        <Suspense fallback={<div className="rounded-2xl border border-border/60 p-6 text-sm text-muted-foreground">Loading search...</div>}>
          <SiteSearch
            variant="page"
            placeholder="Search services, technologies, case studies..."
            initialQuery={query}
            initialType={type}
            enableShortcut
          />
        </Suspense>
      </Container>
    </article>
  )
}
