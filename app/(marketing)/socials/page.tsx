import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo/metadata'
import { Container } from '@/components/primitives/container'
import { Heading, Text } from '@/components/primitives/typography'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { SocialProfilesGrid } from '@/components/sections/socials/social-profiles-grid'
import { JsonLd } from '@/components/seo/json-ld'
import { webPageJsonLd, breadcrumbJsonLd } from '@/lib/seo/json-ld'
import { company, socialProfiles } from '@/lib/business/company'
import { routes } from '@/config/routes'

export const metadata: Metadata = createMetadata({
  title: 'Socials',
  description: `Follow and connect with ${company.name} across Instagram, Facebook, LinkedIn, X, GitHub, and more.`,
  path: routes.socials(),
})

const jsonLdData = [
  webPageJsonLd({
    title: `Socials | ${company.name}`,
    description: `Follow and connect with ${company.name} across Instagram, Facebook, LinkedIn, X, GitHub, and more.`,
    path: routes.socials(),
  }),
  breadcrumbJsonLd([
    { label: 'Home', href: routes.home() },
    { label: 'Socials', href: routes.socials() },
  ]),
]

export default function SocialsPage() {
  return (
    <>
      <JsonLd data={jsonLdData} />
      <HeroWrapper>
        <div className="flex max-w-2xl flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Connect
          </span>
          <Heading level={1} size="display">
            Find {company.name} everywhere.
          </Heading>
          <Text size="lg" tone="muted">
            Follow along for project updates, behind-the-scenes builds, and studio news across
            every platform we&apos;re active on.
          </Text>
        </div>
      </HeroWrapper>

      <section className="pb-24">
        <Container size="lg">
          <SocialProfilesGrid profiles={socialProfiles} />
        </Container>
      </section>
    </>
  )
}
