import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text } from '@/components/primitives/typography'
import { HighlightCard } from '@/components/cards/highlight-card'

const standards = [
  {
    title: 'Performance first',
    description:
      'Every site is built and measured against Core Web Vitals, not just how it looks in a design review.',
    highlight: 'Speed',
  },
  {
    title: 'Business before technology',
    description:
      'We choose the stack that fits your goals and budget, never technology for its own sake.',
    highlight: 'Strategy',
  },
  {
    title: 'SEO built-in, not bolted on',
    description:
      'Technical SEO, structured data, and clean information architecture are part of the build, not a later add-on.',
    highlight: 'Visibility',
  },
  {
    title: 'Accessibility matters',
    description:
      'Semantic markup and WCAG-conscious design mean your site works for every visitor, including those using assistive technology.',
    highlight: 'Inclusivity',
  },
  {
    title: 'AI-ready websites',
    description:
      'Clear content structure and schema markup help your business get cited correctly by AI search tools, not just ranked by traditional search.',
    highlight: 'AI Search',
  },
  {
    title: 'Long-term maintainability',
    description:
      'Clean, well-documented code and sensible architecture mean your site is cheap and safe to extend years from now.',
    highlight: 'Longevity',
  },
]

export function AboutStandardsSection() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Standards
          </span>
          <Heading level={2} size="xl">
            What every project is held to.
          </Heading>
          <Text size="lg" tone="muted">
            These aren&rsquo;t aspirations, they&rsquo;re the checklist every project is measured
            against before launch.
          </Text>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 text-left md:grid-cols-2 lg:grid-cols-3">
          {standards.map((standard) => (
            <HighlightCard key={standard.title} {...standard} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
