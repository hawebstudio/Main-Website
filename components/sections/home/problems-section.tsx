import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { HighlightCard } from '@/components/cards/highlight-card'
import { SplitLayout } from '@/components/layouts/split-layout'
import { problemHighlights, problemTags } from './home-data'

export function ProblemsSection() {
  return (
    <Section spacing="xl">
      <Container>
        <SplitLayout ratio="1:2" align="center">
          <div className="flex flex-col gap-6">
            <Eyebrow>Why sites underperform</Eyebrow>
            <Heading level={2} size="xl">
              A site should make the next step easier.
            </Heading>
            <Text size="lg" tone="muted">
              Sometimes the problem is the message. Sometimes it’s the page structure, the performance, or the tools behind the scenes. We look at the whole journey before deciding what actually needs to change.
            </Text>
            <Text size="base" tone="muted">
              Here are three common places to start.
            </Text>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              {problemTags.map((tag) => (
                <span key={tag} className="rounded-full border border-border/60 px-4 py-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {problemHighlights.map(({ Icon, ...problem }) => (
              <HighlightCard key={problem.highlight} {...problem} icon={<Icon className="size-4" />} />
            ))}
          </div>
        </SplitLayout>
      </Container>
    </Section>
  )
}
