import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text } from '@/components/primitives/typography'
import { aboutFaqs } from '@/lib/data/about-faqs'

export function AboutFaqSection() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">FAQ</span>
          <Heading level={2} size="xl">
            Common questions about HA Web Studio
          </Heading>
        </div>
        <dl className="mx-auto mt-12 flex max-w-3xl flex-col gap-10">
          {aboutFaqs.map((faq) => (
            <div key={faq.question} className="flex flex-col gap-2">
              <dt>
                <Heading level={3} size="md">
                  {faq.question}
                </Heading>
              </dt>
              <dd>
                <Text size="lg" tone="muted">
                  {faq.answer}
                </Text>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
