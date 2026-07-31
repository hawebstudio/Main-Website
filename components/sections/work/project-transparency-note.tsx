import { ShieldCheck } from 'lucide-react'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text } from '@/components/primitives/typography'

export function ProjectTransparencyNote() {
  return (
    <Section spacing="md">
      <Container>
        <div className="rounded-[2rem] border border-border/50 bg-background/35 p-6 md:p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="size-5 text-primary" />
            <div>
              <Heading level={3} size="sm">
                Transparency note
              </Heading>
              <Text tone="muted" className="mt-2 leading-relaxed">
                This page intentionally avoids fabricated metrics, testimonials, and timeline claims. If data is private or unavailable, it is not guessed.
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
