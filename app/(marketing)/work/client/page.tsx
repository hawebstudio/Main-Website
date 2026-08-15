import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { createMetadata } from '@/lib/seo/metadata'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { CtaSection } from '@/components/sections/cta-section'
import { WorkTabs } from '@/components/navigation/work-tabs'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { ProjectCard } from '@/components/cards/domain-cards'
import { projects } from '@/lib/content/source'
import { routes } from '@/config/routes'
import { buttonVariants } from '@/components/ui/button'
import { WorkSubpageHeroBackground } from '@/components/sections/hero-backgrounds'

export const metadata: Metadata = createMetadata({
  title: 'Client Work',
  description: 'Public client evidence track for HA Web Studio. No placeholder projects or fabricated metrics.',
  path: '/work/client',
})

export default async function ClientWorkPage() {
  const allProjects = await projects.getByCategory('client')

  const sortedProjects = [...allProjects].sort((a, b) => {
    return (b.year || 0) - (a.year || 0)
  })

  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Work', href: routes.work.index() },
    { label: 'Client', href: routes.work.client() },
  ]

  return (
    <article className="pb-4 md:pb-8">
      <HeroWrapper
        className="py-14 md:py-18"
        background={<WorkSubpageHeroBackground />}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-6 relative z-20">
          <Breadcrumbs items={breadcrumbItems} className="mb-0" />
          <Eyebrow>Work track: client</Eyebrow>
          <Heading level={1} size="display" className="max-w-4xl text-balance leading-[0.9] tracking-tight">
            Public client evidence only.
          </Heading>
          <Text size="lg" tone="muted" className="max-w-3xl text-pretty leading-relaxed">
            This track is reserved for client work that can be shared responsibly. Confidential engagements are not converted into anonymous filler entries.
          </Text>
          <div className="flex flex-wrap gap-3">
            <Link href={routes.contact('start-project')} className={buttonVariants({ size: 'lg' })}>
              Discuss Your Project
            </Link>
            <Link
              href={routes.services.index()}
              className={buttonVariants({ size: 'lg', variant: 'outline', className: 'bg-transparent' })}
            >
              Explore Services
            </Link>
          </div>
        </div>
      </HeroWrapper>

      <Section spacing="sm" className="border-y border-border/50 bg-background/70">
        <Container>
          <WorkTabs />

          <div className="mt-6 rounded-[2rem] border border-border/50 bg-background/35 p-6 md:p-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="size-5 text-primary" />
              <div>
                <Heading level={2} size="sm">
                  Transparency policy
                </Heading>
                <Text tone="muted" className="mt-2 leading-relaxed">
                  We do not publish invented outcomes, fabricated timelines, or synthetic testimonials. If a project cannot be publicly disclosed, it is simply not listed here.
                </Text>
              </div>
            </div>
          </div>

          {sortedProjects.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-border/60 bg-background/30 p-10 text-center">
              <Heading level={3}>No public client entries yet</Heading>
              <Text tone="muted" className="mx-auto mt-3 max-w-2xl">
                Current client work may be under NDA or pending publication approval. We prefer this honest state over publishing made-up portfolio content.
              </Text>
              <Link href={routes.contact()} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Start a confidential conversation <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      <CtaSection
        title="Need client-grade delivery?"
        description="Share your goals and constraints, and we will map an implementation plan grounded in real delivery patterns."
        primaryCta={{ label: 'Discuss Your Project', href: routes.contact('start-project') }}
        secondaryCta={{ label: 'View Services', href: routes.services.index() }}
      />
    </article>
  )
}
