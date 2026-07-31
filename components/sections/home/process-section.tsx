import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { SplitLayout } from '@/components/layouts/split-layout'
import { processSteps } from './home-data'

export function ProcessSection() {
  return (
    <Section spacing="lg" className="border-y border-border/50 bg-muted/20">
      <Container>
        <SplitLayout ratio="1:2" align="center">
          <div className="flex flex-col gap-4">
            <Eyebrow>How we work</Eyebrow>
            <Heading level={2} size="xl">
              A consulting process, not just a build queue.
            </Heading>
            <Text size="lg" tone="muted" className="max-w-2xl">
              Every engagement follows the same four stages, from positioning through launch and
              beyond, so you always know what&rsquo;s happening, why, and what it&rsquo;s in
              service of.
            </Text>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {processSteps.map((step, index) => (
              <div key={step.title} className="glass rounded-3xl p-6 transition-colors hover:bg-accent/50">
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
