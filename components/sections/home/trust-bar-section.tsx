import { Award, Clock3, Gauge, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Container } from '@/components/primitives/container'
import { Text } from '@/components/primitives/typography'
import { trustStats } from './home-data'

const statIcons: Record<(typeof trustStats)[number]['icon'], LucideIcon> = {
  gauge: Gauge,
  sparkles: Sparkles,
  clock: Clock3,
  award: Award,
}

export function TrustBarSection() {
  return (
    <section aria-label="How we approach projects" className="border-y border-foreground/15 bg-surface-1/70">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-y divide-foreground/15 md:grid-cols-4 md:divide-y-0">
          {trustStats.map((stat) => {
            const Icon = statIcons[stat.icon]
            return (
              <div key={stat.value} className="flex min-h-32 flex-col items-start justify-between gap-5 px-4 py-5 first:pl-0 sm:px-6 sm:py-7 md:first:pl-0">
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</span>
                  <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                </div>
                <Text size="lg" className="text-xl font-medium tracking-tight sm:text-2xl">{stat.value}</Text>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
