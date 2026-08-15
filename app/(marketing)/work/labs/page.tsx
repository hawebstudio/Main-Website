import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FlaskConical } from 'lucide-react'
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
  title: 'Labs',
  description: 'Experimental labs track showing prototypes and technical explorations with explicit non-production framing.',
  path: '/work/labs',
})

export default async function LabsWorkPage() {
  const allProjects = await projects.getByCategory('labs')

  const sortedProjects = [...allProjects].sort((a, b) => {
    return (b.year || 0) - (a.year || 0)
  })

  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Work', href: routes.work.index() },
    { label: 'Labs', href: routes.work.labs() },
  ]

  return (
    <article className="pb-4 md:pb-8">
      <HeroWrapper
        className="py-14 md:py-18"
        background={<WorkSubpageHeroBackground />}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-6 relative z-20">
          <Breadcrumbs items={breadcrumbItems} className="mb-0" />
          <Eyebrow>Work track: labs</Eyebrow>
          <Heading level={1} size="display" className="max-w-4xl text-balance leading-[0.9] tracking-tight">
            Experiments before production decisions.
          </Heading>
          <Text size="lg" tone="muted" className="max-w-3xl text-pretty leading-relaxed">
            Labs entries are intentionally marked as exploratory. They test motion, interaction, and engineering patterns before any production recommendation.
          </Text>
          <div className="flex flex-wrap gap-3">
            <Link href={routes.work.index()} className={buttonVariants({ size: 'lg', variant: 'outline', className: 'bg-transparent' })}>
              Back to Work Hub
            </Link>
            <Link href={routes.problems.index()} className={buttonVariants({ size: 'lg' })}>
              Explore Solutions
            </Link>
          </div>
        </div>
      </HeroWrapper>

      <Section spacing="sm" className="border-y border-border/50 bg-background/70">
        <Container>
          <WorkTabs />

          <div className="mt-6 rounded-[2rem] border border-border/50 bg-background/35 p-6 md:p-8">
            <div className="flex items-start gap-3">
              <FlaskConical className="size-5 text-primary" />
              <div>
                <Heading level={2} size="sm">
                  Experimental boundary
                </Heading>
                <Text tone="muted" className="mt-2 leading-relaxed">
                  Labs are not presented as finished client outcomes. They exist to reduce uncertainty before implementation choices move into delivery tracks.
                </Text>
              </div>
            </div>
          </div>

          {sortedProjects.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-background/30 py-24 text-center">
              <Heading level={3}>No projects yet</Heading>
              <Text tone="muted" className="mt-2">New lab experiments will appear here as they are documented.</Text>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-border/60 bg-background/30 p-5">
            <Text tone="muted" size="sm" className="leading-relaxed">
              When an experiment matures, it is either promoted into a delivery-relevant project or retired with lessons documented.
            </Text>
            <Link href={routes.work.personal()} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Compare with personal track <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Need innovation without guesswork?"
        description="We can prototype selectively, validate quickly, and only promote what proves useful in your business context."
        primaryCta={{ label: 'Discuss Your Project', href: routes.contact('start-project') }}
        secondaryCta={{ label: 'View Services', href: routes.services.index() }}
      />
    </article>
  )
}
