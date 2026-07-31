import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { buttonVariants } from '@/components/ui/button'
import { routes } from '@/config/routes'
import { CTAS } from '@/lib/data/ctas'
import { cn } from '@/lib/utils'
import { solutionSections, styleMap, type SolutionSection } from './problems-data'

export function SolutionPathsSection() {
  return (
    <Section spacing="lg" className="border-y border-border/50 bg-background/70">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="max-w-3xl">
            <Eyebrow>Solutions</Eyebrow>
            <Heading level={2} size="xl" className="mt-3">
              Consultation-style solution paths for common business challenges.
            </Heading>
            <Text size="lg" tone="muted" className="mt-4">
              Each block below translates a business problem into recommended services, expected outcomes, and the next best action.
            </Text>
          </div>

          <div className="grid gap-5 xl:grid-cols-12">
            {solutionSections.map((solution, index) => (
              <SolutionPathCard key={solution.slug} solution={solution} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function SolutionPathCard({ solution, index }: { solution: SolutionSection; index: number }) {
  const treatment = styleMap[solution.style]
  const Icon = treatment.icon

  return (
    <section
      id={solution.slug}
      className={cn(
        'glass-strong relative overflow-hidden rounded-[2rem] border border-border/50 p-6',
        treatment.panel,
        index % 3 === 0 ? 'xl:col-span-7' : index % 3 === 1 ? 'xl:col-span-5' : 'xl:col-span-12',
      )}
    >
      <div className="relative z-10 flex flex-col gap-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl border border-border/60 bg-background/70">
              <Icon className={cn('size-5', treatment.accent)} />
            </span>
            <Eyebrow>Solution</Eyebrow>
          </div>
          <Heading level={3} size="lg" className="mt-4">
            {solution.title}
          </Heading>
          <Text size="lg" tone="muted" className="mt-3 max-w-3xl leading-relaxed">
            {solution.intro}
          </Text>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {solution.idealFor?.length ? <ListPanel title="Ideal for" items={solution.idealFor} /> : null}
          <ListPanel title="Common challenges" items={solution.challenges} />
          <LinkPanel title="Recommended services" items={solution.recommendedServices} />
          <ListPanel title="What you will get" items={solution.outcomes} />
        </div>

        <RelatedPathway links={solution.related} />

        <div>
          <Link href={solution.cta.href} className={buttonVariants({ className: 'rounded-full px-5' })}>
            {solution.cta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}

function ListPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-background/35 p-5 md:col-span-2 xl:col-span-1">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-foreground">
            <span className="mt-1 size-1.5 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function LinkPanel({ title, items }: { title: string; items: Array<{ label: string; href: string }> }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-background/35 p-5 md:col-span-2 xl:col-span-1">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{title}</div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RelatedPathway({ links }: { links: Array<{ label: string; href: string }> }) {
  const pathway = [
    ...links,
    { label: 'Contact', href: routes.contact() },
    { label: 'Book Consultation', href: CTAS.startProject.href },
  ]

  return (
    <div className="rounded-3xl border border-border/60 bg-background/30 p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Related content pathway</div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {pathway.map((item, index) => (
          <span key={`${item.href}-${item.label}`} className="inline-flex items-center gap-2">
            <Link href={item.href} className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5 text-foreground transition-colors hover:border-primary/40 hover:text-primary">
              {item.label}
            </Link>
            {index < pathway.length - 1 ? (
              <ArrowRight className="size-3" aria-hidden="true" />
            ) : null}
          </span>
        ))}
      </div>
    </div>
  )
}
