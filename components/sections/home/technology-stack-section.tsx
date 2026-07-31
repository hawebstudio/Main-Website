import Link from 'next/link'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Text } from '@/components/primitives/typography'
import { routes } from '@/config/routes'
import type { Technology } from '@/lib/content/types'
import type { WithContent } from '@/lib/content/source'
import { SectionHeading } from './section-heading'

interface TechnologyStackSectionProps {
  technologies: WithContent<Technology>[]
}

export function TechnologyStackSection({ technologies }: TechnologyStackSectionProps) {
  if (technologies.length === 0) return null

  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Technology"
            title="Built on a modern, proven stack, not whatever is trending."
            href={routes.technologies.index()}
            ctaLabel="Explore our stack"
          />
          <Text size="lg" tone="muted" className="max-w-2xl">
            Every technology choice is made for the project, not the other way around. Here&rsquo;s
            some of what we build with most often.
          </Text>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <Link
                key={tech.slug}
                href={routes.technologies.detail(tech.category ?? '', tech.slug)}
                className="rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {tech.title}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
