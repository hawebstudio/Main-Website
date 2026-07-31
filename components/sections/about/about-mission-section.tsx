import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text } from '@/components/primitives/typography'
import { SplitLayout } from '@/components/layouts/split-layout'

export function AboutMissionSection() {
  return (
    <Section spacing="lg">
      <Container>
        <SplitLayout>
          <AboutTextBlock
            eyebrow="Our Mission"
            title="Building for the long term."
            description="We build digital infrastructure that scales with your business: fast, accessible, SEO-ready websites that keep generating leads and customers long after launch. We don't just deliver a project and walk away; we stay on as your technical partner for redesigns, maintenance, and whatever comes next."
          />
          <AboutTextBlock
            eyebrow="Our Approach"
            title="Quality over quantity."
            description="We take on a limited number of projects at a time so every client gets our full attention. That means direct access to the people building your site, clear communication throughout, and strict standards for performance, accessibility, and code quality on every project we ship."
          />
        </SplitLayout>
      </Container>
    </Section>
  )
}

function AboutTextBlock({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-6">
      <span className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</span>
      <Heading level={2} size="lg">
        {title}
      </Heading>
      <Text size="lg" tone="muted">
        {description}
      </Text>
    </div>
  )
}
