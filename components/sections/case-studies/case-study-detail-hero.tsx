import { CalendarDays, Clock3 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text } from '@/components/primitives/typography'
import { toLabel, type CaseStudyEntry } from './detail-utils'

interface CaseStudyDetailHeroProps {
  caseStudy: CaseStudyEntry
  categoryLabel: string
  typeLabel: string
  readingTime: number
  breadcrumbs?: React.ReactNode
}

export function CaseStudyDetailHero({ caseStudy, categoryLabel, typeLabel, readingTime, breadcrumbs }: CaseStudyDetailHeroProps) {
  return (
    <HeroWrapper
      className="py-12 md:py-16"
      background={
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_44%)]" />
          <div className="absolute left-1/2 top-0 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>
      }
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        {breadcrumbs}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">{categoryLabel}</span>
          <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">{typeLabel}</span>
          {caseStudy.implementationStatus ? (
            <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">Status: {toLabel(caseStudy.implementationStatus)}</span>
          ) : null}
          {caseStudy.difficulty ? (
            <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">Difficulty: {toLabel(caseStudy.difficulty)}</span>
          ) : null}
          {caseStudy.year ? (
            <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">{caseStudy.year}</span>
          ) : null}
        </div>

        <Heading level={1} size="display" className="max-w-5xl text-balance leading-[0.9] tracking-tight">
          {caseStudy.title}
        </Heading>

        <Text size="lg" tone="muted" className="max-w-3xl text-pretty leading-relaxed">
          {caseStudy.summary ?? caseStudy.description}
        </Text>

        {caseStudy.technologiesUsed?.length ? (
          <div className="flex flex-wrap gap-2">
            {caseStudy.technologiesUsed.map((item) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Clock3 className="size-4" /> {readingTime} min read
          </span>
          {caseStudy.updatedAt ? (
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4" /> Updated {caseStudy.updatedAt}
            </span>
          ) : null}
          {caseStudy.author?.name ? <span className="inline-flex items-center gap-2">Author: {caseStudy.author.name}</span> : null}
        </div>
      </div>
    </HeroWrapper>
  )
}
