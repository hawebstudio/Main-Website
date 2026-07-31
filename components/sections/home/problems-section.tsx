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
              A good-looking website isn&rsquo;t the same thing as a working one.
            </Heading>
            <Text size="lg" tone="muted">
              Most underperforming sites aren&rsquo;t broken &mdash; they&rsquo;re unfocused.
              Design, content, and code were built by different people at different times, with
              no shared story to carry the visitor toward a decision. The result: real traffic
              that never turns into real business.
            </Text>
            <Text size="base" tone="muted">
              These are the three failure points we see most often, and the ones our services are
              built to close.
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
