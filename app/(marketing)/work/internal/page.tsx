import type { Metadata } from 'next'
import Link from 'next/link'
import { Cog, ArrowRight } from 'lucide-react'
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
  title: 'Internal Projects',
  description: 'Internal systems track showing operations tooling and execution infrastructure built by HA Web Studio.',
  path: '/work/internal',
})

export default async function InternalWorkPage() {
  const allProjects = await projects.getByCategory('internal')

  const sortedProjects = [...allProjects].sort((a, b) => {
    return (b.year || 0) - (a.year || 0)
  })

  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Work', href: routes.work.index() },
    { label: 'Internal', href: routes.work.internal() },
  ]

  return (
    <article className="pb-4 md:pb-8">
      <HeroWrapper
        className="py-14 md:py-18"
        background={<WorkSubpageHeroBackground />}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-6 relative z-20">
          <Breadcrumbs items={breadcrumbItems} className="mb-0" />
          <Eyebrow>Work track: internal</Eyebrow>
          <Heading level={1} size="display" className="max-w-4xl text-balance leading-[0.9] tracking-tight">
            Systems we build to run better delivery.
          </Heading>
          <Text size="lg" tone="muted" className="max-w-3xl text-pretty leading-relaxed">
            Internal projects focus on automation, operations, and quality control that improve client execution speed and consistency.
          </Text>
          <div className="flex flex-wrap gap-3">
            <Link href={routes.work.index()} className={buttonVariants({ size: 'lg', variant: 'outline', className: 'bg-transparent' })}>
              Back to Work Hub
            </Link>
            <Link href={routes.contact('start-project')} className={buttonVariants({ size: 'lg' })}>
              Discuss Your Project
            </Link>
          </div>
        </div>
      </HeroWrapper>

      <Section spacing="sm" className="border-y border-border/50 bg-background/70">
        <Container>
          <WorkTabs />

          <div className="mt-6 rounded-[2rem] border border-border/50 bg-background/35 p-6 md:p-8">
            <div className="flex items-start gap-3">
              <Cog className="size-5 text-primary" />
              <div>
                <Heading level={2} size="sm">
                  Operational evidence
                </Heading>
                <Text tone="muted" className="mt-2 leading-relaxed">
                  Internal builds show how we standardize execution, reduce manual overhead, and maintain delivery quality across projects.
                </Text>
              </div>
            </div>
          </div>

          {sortedProjects.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-background/30 py-24 text-center">
              <Heading level={3}>No projects yet</Heading>
              <Text tone="muted" className="mt-2">Internal platform entries will appear here as they are documented.</Text>
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
              These systems are not productized templates. They are operational assets built to improve project execution reliability.
            </Text>
            <Link href={routes.services.index()} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Map to relevant services <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Need operational leverage in your delivery?"
        description="We can adapt proven internal patterns to your workflows without adding unnecessary complexity."
        primaryCta={{ label: 'Discuss Your Project', href: routes.contact('start-project') }}
        secondaryCta={{ label: 'View Services', href: routes.services.index() }}
      />
    </article>
  )
}
