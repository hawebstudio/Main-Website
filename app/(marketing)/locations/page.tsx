import type { Metadata } from 'next'
import { MapPin, CheckCircle2 } from 'lucide-react'
import { createMetadata } from '@/lib/seo/metadata'
import { collectionPageJsonLd } from '@/lib/seo/json-ld'
import { JsonLd } from '@/components/seo/json-ld'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { routes } from '@/config/routes'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { CtaSection } from '@/components/sections/cta-section'
import { ContentCard } from '@/components/cards/content-card'
import { LocationsHeroBackground } from '@/components/sections/hero-backgrounds'
import { publishedLocations, getPublishedRegions, getPublishedCities } from '@/lib/business/locations/data'

export const metadata: Metadata = createMetadata({
  title: 'Locations We Serve',
  description:
    'HA Web Studio is a remote-first web design and development studio working with businesses across India, currently serving Delhi NCR — Delhi, Noida, Gurugram, Ghaziabad, and Faridabad.',
  path: routes.locations.index(),
})

export default function LocationsPage() {
  const regions = getPublishedRegions()
  const indexableLocations = publishedLocations.filter((location) => location.indexable)
  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Locations', href: routes.locations.index() },
  ]

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          title: 'Locations We Serve',
          description:
            'HA Web Studio is a remote-first web design and development studio currently serving Delhi NCR.',
          path: routes.locations.index(),
          items: indexableLocations.map((location) => ({
            title: location.name,
            path: routes.locations.detail(location.slug),
          })),
        })}
      />

      <HeroWrapper background={<LocationsHeroBackground />}>
        <Breadcrumbs items={breadcrumbItems} className="relative z-20 mb-4" />
        <div className="relative z-20 space-y-4">
          <Eyebrow>Locations</Eyebrow>
          <Heading level={1} size="display">
            Web Design &amp; Development, Wherever Your Business Is
          </Heading>
          <Text size="lg" tone="muted" className="max-w-2xl">
            HA Web Studio is a remote-first studio — there&apos;s no physical branch tied to any
            city below. These pages exist because they reflect where a meaningful share of current
            client conversations start, not because we claim a local office in every market.
          </Text>
        </div>
      </HeroWrapper>

      <Section spacing="sm">
        <Container>
          <div className="flex flex-col gap-16">
            {regions.map((region) => {
              const regionCities = getPublishedCities(region.slug)
              return (
                <div key={region.slug} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3 border-b border-border pb-4">
                    <div className="flex items-center gap-2 text-primary">
                      <MapPin className="size-4" aria-hidden="true" />
                      <Text size="sm" tone="primary" className="font-medium">
                        Region
                      </Text>
                    </div>
                    <a href={routes.locations.detail(region.slug)} className="group w-fit">
                      <Heading level={2} size="lg" className="group-hover:text-primary">
                        {region.name}
                      </Heading>
                    </a>
                    <Text tone="muted" className="max-w-3xl">
                      {region.intro}
                    </Text>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {regionCities.map((city) => (
                      <ContentCard
                        key={city.slug}
                        href={routes.locations.detail(city.slug)}
                        title={city.name}
                        description={city.intro}
                        eyebrow={city.state}
                      />
                    ))}
                  </div>
                </div>
              )
            })}

            <div className="glass flex flex-col gap-4 rounded-2xl p-6 md:flex-row md:items-start md:gap-6">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div className="flex flex-col gap-2">
                <Heading level={3} size="sm">
                  Not seeing your city?
                </Heading>
                <Text tone="muted" className="max-w-2xl">
                  Delhi NCR is our current published local focus, but HA Web Studio works remotely
                  with businesses anywhere in India — and internationally. We add a dedicated
                  location page only once we have genuine, city-specific context worth publishing,
                  rather than swapping a city name into templated copy.
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Ready to start a project?"
        description="Tell us about your business and where you're based — we'll take it from there."
      />
    </>
  )
}
