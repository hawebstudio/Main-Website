import { Award, Clock, Gauge, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Container } from '@/components/primitives/container'
import { Text } from '@/components/primitives/typography'
import { trustStats } from './home-data'

const statIcons: Record<(typeof trustStats)[number]['icon'], LucideIcon> = {
  gauge: Gauge,
  sparkles: Sparkles,
  clock: Clock,
  award: Award,
}

/**
 * TrustBarSection — sits directly under the hero to reduce uncertainty
 * before the visitor scrolls further: performance, search/AI readiness,
 * delivery speed, and experience, in one glanceable row.
 */
export function TrustBarSection() {
  return (
    <section aria-label="Why teams trust us" className="border-y border-border/50 bg-background/60">
      <Container>
        <div className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:py-10">
          {trustStats.map((stat) => {
            const Icon = statIcons[stat.icon]

            return (
              <div key={stat.label} className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
                <Icon className="size-4 text-primary" aria-hidden="true" />
                <span className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {stat.value}
                </span>
                <Text size="sm" tone="muted" className="leading-snug">
                  {stat.label}
                </Text>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
