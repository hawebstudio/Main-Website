import Link from 'next/link'
import { ArrowRight, Sparkles, Workflow } from 'lucide-react'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text } from '@/components/primitives/typography'
import { BentoGrid, BentoItem } from '@/components/layouts/bento-grid'
import type { Service } from '@/lib/content/types'
import type { WithContent } from '@/lib/content/source'
import { capabilityExtras } from './home-data'
import { SectionHeading } from './section-heading'

interface CapabilitiesSectionProps {
  services: WithContent<Service>[]
}

const extraIcons = {
  sparkles: Sparkles,
  workflow: Workflow,
}

export function CapabilitiesSection({ services }: CapabilitiesSectionProps) {
  return (
    <Section spacing="lg" className="bg-muted/20">
      <Container>
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Capabilities"
            title="Everything that turns a website into a growth channel."
            href="/services"
            ctaLabel="View services"
          />

          <BentoGrid>
            {services.map((service, index) => (
              <BentoItem
                key={service.slug}
                span={index === 0 ? 4 : 2}
                className="group flex flex-col gap-4 transition-colors hover:bg-accent/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Service</span>
                  <span className="text-xs text-muted-foreground">0{index + 1}</span>
                </div>
                <Heading level={3} size="sm" className="group-hover:text-primary">
                  {service.title}
                </Heading>
                <Text tone="muted" size="sm" className="max-w-sm">
                  {service.description}
                </Text>
                <Link
                  href={`/services/${service.slug}`}
                  aria-label={`Learn more about ${service.title}`}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary"
                >
                  Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </BentoItem>
            ))}
            {capabilityExtras.map((extra) => {
              const Icon = extraIcons[extra.icon]

              return (
                <BentoItem key={extra.title} span={2} className="flex flex-col gap-4 bg-primary/5">
                  <Icon className="size-5 text-primary" />
                  <Heading level={3} size="sm">
                    {extra.title}
                  </Heading>
                  <Text tone="muted" size="sm">
                    {extra.description}
                  </Text>
                </BentoItem>
              )
            })}
          </BentoGrid>
        </div>
      </Container>
    </Section>
  )
}
