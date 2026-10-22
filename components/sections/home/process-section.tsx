import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { SplitLayout } from '@/components/layouts/split-layout'
import { processSteps } from './home-data'

export function ProcessSection() {
  return (
    <Section spacing="lg" className="border-y border-foreground/15 bg-surface-1/65">
      <Container>
        <SplitLayout ratio="1:2" align="center">
          <div className="flex flex-col gap-4">
            <Eyebrow>How we work</Eyebrow>
            <Heading level={2} size="xl">
              Small, visible decisions. Fewer surprises.
            </Heading>
            <Text size="lg" tone="muted" className="max-w-2xl">
              You’ll know what we are deciding, what is ready to review, and what we need from you next.
            </Text>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {processSteps.map((step, index) => (
              <div key={step.title} className="border-t border-foreground/15 bg-transparent px-1 py-5 transition-colors">
                <div className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary">0{index + 1}</div>
                <Heading level={3} size="sm">
                  {step.title}
                </Heading>
                <Text tone="muted" size="sm" className="mt-2">
                  {step.description}
                </Text>
              </div>
            ))}
          </div>
        </SplitLayout>
      </Container>
    </Section>
  )
}
