import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text } from '@/components/primitives/typography'

const proofItems = [
  {
    title: 'Engineering Thinking Included',
    description: 'Entries include investigation, rejected options, trade-offs, and implementation reasoning.',
  },
  {
    title: 'Real Work Only',
    description: 'If details are private or unavailable, the case study says so directly.',
  },
  {
    title: 'Decision Pathways',
    description: 'Readers can move from case studies to relevant services, solutions, and project discussions.',
  },
]

export function CaseStudiesProofSection() {
  return (
    <Section spacing="sm">
      <Container>
        <div className="grid gap-6 xl:grid-cols-3">
          {proofItems.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-border/50 bg-background/35 p-6">
              <Heading level={3} size="sm">
                {item.title}
              </Heading>
              <Text tone="muted" size="sm" className="mt-3 leading-relaxed">
                {item.description}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
