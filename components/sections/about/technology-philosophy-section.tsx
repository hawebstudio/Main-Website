import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text } from '@/components/primitives/typography'
import { HighlightCard } from '@/components/cards/highlight-card'

const technologyPrinciples = [
  {
    title: 'Server Components by Default',
    description:
      'We use the Next.js App Router and React Server Components to deliver fast initial load times and strong SEO out of the box.',
    highlight: 'Performance',
  },
  {
    title: 'Semantic & Accessible',
    description:
      "Every site adheres to semantic HTML standards and WCAG guidelines, so it's usable for everyone, not just the majority of visitors.",
    highlight: 'Inclusivity',
  },
  {
    title: 'Headless Architecture',
    description:
      'Separating the frontend from the backend CMS or ecommerce engine keeps your site flexible, secure, and easier to migrate later.',
    highlight: 'Scalability',
  },
  {
    title: 'Design Systems',
    description:
      'We build comprehensive design systems instead of disjointed pages, so your entire digital presence stays visually consistent.',
    highlight: 'Consistency',
  },
  {
    title: 'Structured Data by Default',
    description:
      'Schema.org markup is implemented on every build, helping both traditional search engines and AI answer engines understand your content correctly.',
    highlight: 'AEO & GEO',
  },
  {
    title: 'Measured, Not Assumed',
    description:
      'Every site is audited with Lighthouse and Core Web Vitals before launch, so performance claims are backed by numbers, not guesswork.',
    highlight: 'Accountability',
  },
]

export function TechnologyPhilosophySection() {
  return (
    <Section spacing="xl" className="bg-muted/30">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-12 text-center">
          <div className="flex flex-col gap-4">
            <Heading level={2} size="xl">
              Technology Philosophy
            </Heading>
            <Text size="lg" tone="muted">
              We choose the right tool for the job, prioritizing performance, search visibility,
              and long-term maintainability over what&rsquo;s trendy.
            </Text>
          </div>
          <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2">
            {technologyPrinciples.map((principle) => (
              <HighlightCard key={principle.title} {...principle} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
