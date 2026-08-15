import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { createMetadata } from '@/lib/seo/metadata'
import { webPageJsonLd, faqJsonLd } from '@/lib/seo/json-ld'
import { JsonLd } from '@/components/seo/json-ld'
import { routes } from '@/config/routes'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { CtaSection } from '@/components/sections/cta-section'
import { ContentCard } from '@/components/cards/content-card'
import { LocationsHeroBackground } from '@/components/sections/hero-backgrounds'
import {
  publishedLocations,
  getPublishedLocation,
  getRelatedLocations,
} from '@/lib/business/locations/data'
import { serviceFamilies } from '@/content/services'

interface LocationPageProps {
  params: Promise<{ slug: string }>
}

// Only the locations explicitly published above are routable. Every other
// researched candidate (see lib/business/locations/data/candidates.ts) has
// no route and will 404 rather than accidentally becoming indexable.
export const dynamicParams = false

export async function generateStaticParams() {
  return publishedLocations.map((location) => ({ slug: location.slug }))
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params
  const location = getPublishedLocation(slug)
  if (!location) return {}

  return createMetadata({
    title: location.seoTitle,
    description: location.seoDescription,
    path: routes.locations.detail(location.slug),
    noIndex: !location.indexable,
  })
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params
  const location = getPublishedLocation(slug)
  if (!location) notFound()

  const region = location.regionSlug ? getPublishedLocation(location.regionSlug) : undefined
  const relatedLocations = getRelatedLocations(location)
  const relatedFamilies = serviceFamilies.filter((family) =>
    location.relatedServiceFamilySlugs.includes(family.slug),
  )

  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Locations', href: routes.locations.index() },
    ...(region ? [{ label: region.name, href: routes.locations.detail(region.slug) }] : []),
    { label: location.name, href: routes.locations.detail(location.slug) },
  ]

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: location.seoTitle,
            description: location.seoDescription,
            path: routes.locations.detail(location.slug),
            type: 'WebPage',
          }),
          faqJsonLd(location.faqs),
        ]}
      />

      <HeroWrapper className="pt-8" background={<LocationsHeroBackground />}>
        <div className="relative z-20 space-y-4">
          <Breadcrumbs items={breadcrumbItems} className="pb-4" />
          <Eyebrow>{location.type === 'region' ? 'Region' : location.state}</Eyebrow>
          <Heading level={1} size="display">
            {location.h1}
          </Heading>
          <Text size="lg" tone="muted" className="max-w-2xl">
            {location.intro}
          </Text>
        </div>
      </HeroWrapper>

      <Section spacing="md">
        <Container>
          <div className="flex flex-col gap-16">
            {/* Services */}
            <div className="flex flex-col gap-4">
              <Heading level={2} size="lg">
                Services Available in {location.name}
              </Heading>
              <Text tone="muted" className="max-w-3xl">
                {location.servicesIntro}
              </Text>
            </div>

            {/* Business context */}
            <div className="flex flex-col gap-4">
              <Heading level={2} size="lg">
                {location.type === 'region'
                  ? `The ${location.name} Business Landscape`
                  : `Why Businesses in ${location.name} May Need a Modern Website`}
              </Heading>
              <Text tone="muted" className="max-w-3xl">
                {location.businessContext}
              </Text>
              <Text tone="muted" className="max-w-3xl">
                {location.whyModernWebsite}
              </Text>
            </div>

            {/* Industries */}
            {location.industries.length > 0 && (
              <div className="flex flex-col gap-4">
                <Heading level={2} size="lg">
                  Industries We Work With in {location.name}
                </Heading>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {location.industries.map((industry) => (
                    <div key={industry} className="glass flex items-center gap-3 rounded-xl p-4">
                      <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      <Text size="sm">{industry}</Text>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery model */}
            <div className="flex flex-col gap-4">
              <Heading level={2} size="lg">
                How HA Web Studio Works With {location.name} Businesses
              </Heading>
              <Text tone="muted" className="max-w-3xl">
                {location.deliveryModel}
              </Text>
            </div>

            {/* Related services */}
            {relatedFamilies.length > 0 && (
              <div className="flex flex-col gap-4">
                <Heading level={2} size="lg">
                  Related Services
                </Heading>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedFamilies.map((family) => (
                    <ContentCard
                      key={family.slug}
                      href={routes.services.family(family.slug)}
                      title={family.title}
                      description={family.description}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Related locations */}
            {relatedLocations.length > 0 && (
              <div className="flex flex-col gap-4">
                <Heading level={2} size="lg">
                  {location.type === 'region' ? 'Cities in This Region' : 'Related Locations'}
                </Heading>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedLocations.map((related) => (
                    <ContentCard
                      key={related.slug}
                      href={routes.locations.detail(related.slug)}
                      title={related.name}
                      description={related.intro}
                      eyebrow={related.state}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {location.faqs.length > 0 && (
              <div className="flex flex-col gap-6">
                <Heading level={2} size="lg">
                  Frequently Asked Questions
                </Heading>
                <div className="flex flex-col gap-6">
                  {location.faqs.map((faq) => (
                    <div key={faq.question} className="flex flex-col gap-2 border-b border-border pb-6 last:border-0 last:pb-0">
                      <Heading level={3} size="sm">
                        {faq.question}
                      </Heading>
                      <Text tone="muted">{faq.answer}</Text>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <CtaSection
        title={`Start a Website Project in ${location.name}`}
        description="Tell us about your business — we'll follow up to scope the right approach."
        primaryCta={{ label: 'Discuss Your Project', href: routes.contact('start-project') }}
      />
    </>
  )
}
