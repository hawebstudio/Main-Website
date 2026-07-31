import { CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { builtForItems } from './home-data'

export function OperatingPrinciplesSection() {
  return (
    <Section spacing="md" className="border-y border-border/50 bg-background/70">
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass-strong rounded-3xl p-6 md:col-span-2">
            <Eyebrow>Operating principles</Eyebrow>
            <Heading level={2} size="xl" className="mt-3 max-w-2xl">
              Performance, SEO, and accessibility aren&rsquo;t add-ons. They&rsquo;re the spec.
            </Heading>
            <Text size="lg" tone="muted" className="mt-4 max-w-2xl">
              Every project is measured against Core Web Vitals, built with semantic and
              accessible markup, and structured with technical SEO and AI-readable data from the
              first commit &mdash; not patched in after launch when it&rsquo;s expensive to fix.
            </Text>
          </div>
          <div className="glass rounded-3xl p-6">
            <Eyebrow>Built for</Eyebrow>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {builtForItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="size-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}
