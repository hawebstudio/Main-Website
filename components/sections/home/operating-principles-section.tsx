import { Check } from 'lucide-react'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { builtForItems } from './home-data'

export function OperatingPrinciplesSection() {
  return (
    <Section spacing="xl">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="flex flex-col items-start">
            <Eyebrow>Our point of view</Eyebrow>
            <Heading level={2} size="xl" className="mt-5 max-w-xl text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[0.98] tracking-[-0.05em]">
              Your website is part of the work. <span className="font-serif font-normal italic text-primary">Not the whole story.</span>
            </Heading>
          </div>
          <div className="flex flex-col justify-between gap-8 border-l border-foreground/15 pl-5 sm:pl-8">
            <Text size="lg" tone="muted" className="max-w-2xl text-pretty">
              The site has to explain what you do, help the right person trust it, and make the next step obvious. We bring content, interface design, and engineering into the same conversation so those parts work together.
            </Text>
            <div className="grid gap-4 border-t border-foreground/15 pt-5 sm:grid-cols-2">
              {builtForItems.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
