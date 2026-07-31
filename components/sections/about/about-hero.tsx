import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text } from '@/components/primitives/typography'

export function AboutHero() {
  return (
    <HeroWrapper>
      <div className="flex max-w-3xl flex-col gap-6">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          About HA Web Studio
        </span>
        <Heading level={1} size="display">
          Engineering digital experiences that matter.
        </Heading>
        <Text size="lg" tone="muted">
          HA Web Studio is a specialized digital product studio building fast, modern,
          conversion-focused websites for ambitious small businesses, startups, and ecommerce
          brands. No bloat, no generic templates &mdash; every project is purpose-built around
          your business and your customers.
        </Text>
      </div>
    </HeroWrapper>
  )
}
