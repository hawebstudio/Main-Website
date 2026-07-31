import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Lightbulb } from 'lucide-react'
import { createMetadata } from '@/lib/seo/metadata'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { CtaSection } from '@/components/sections/cta-section'
import { WorkTabs } from '@/components/navigation/work-tabs'
import { ProjectCard } from '@/components/cards/domain-cards'
import { projects } from '@/lib/content/source'
import { routes } from '@/config/routes'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = createMetadata({
  title: 'Personal Work',
  description: 'Personal project evidence track focused on capability, architecture, and experimentation quality.',
  path: '/work/personal',
})

export default async function PersonalWorkPage() {
  const allProjects = await projects.getByCategory('personal')

  const sortedProjects = [...allProjects].sort((a, b) => {
    return (b.year || 0) - (a.year || 0)
  })

  return (
    <article className="pb-24">
      <HeroWrapper
        className="py-14 md:py-18"
        background={
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_44%)]" />
            <div className="absolute left-1/2 top-0 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          </div>
        }
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <Eyebrow>Work track: personal</Eyebrow>
          <Heading level={1} size="display" className="max-w-4xl text-balance leading-[0.9] tracking-tight">
            Personal builds that prove implementation depth.
          </Heading>
          <Text size="lg" tone="muted" className="max-w-3xl text-pretty leading-relaxed">
            Personal projects demonstrate end-to-end decision making, architecture choices, and product discipline in contexts where we can publish more technical detail.
          </Text>
          <div className="flex flex-wrap gap-3">
            <Link href={routes.work.index()} className={buttonVariants({ size: 'lg', variant: 'outline', className: 'bg-transparent' })}>
              Back to Work Hub
            </Link>
            <Link href={routes.services.index()} className={buttonVariants({ size: 'lg' })}>
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
              <Lightbulb className="size-5 text-primary" />
              <div>
                <Heading level={2} size="sm">
                  Why this track matters
                </Heading>
                <Text tone="muted" className="mt-2 leading-relaxed">
                  Personal work often carries higher technical visibility than client work and gives a clearer window into implementation quality, iteration rhythm, and engineering standards.
                </Text>
              </div>
            </div>
          </div>

          {sortedProjects.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-background/30 py-24 text-center">
              <Heading level={3}>No projects yet</Heading>
              <Text tone="muted" className="mt-2">New personal projects will appear here as they are documented.</Text>
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
              Looking for commercial relevance? Use project pages to trace links into related services and solutions.
            </Text>
            <Link href={routes.problems.index()} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Explore solution pathways <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Want this technical depth in your project?"
        description="We can translate these implementation patterns into business-ready delivery for your specific context."
        primaryCta={{ label: 'Discuss Your Project', href: routes.contact() }}
        secondaryCta={{ label: 'View Services', href: routes.services.index() }}
      />
    </article>
  )
}
