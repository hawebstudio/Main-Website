import Link from 'next/link'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { contentCategories } from '@/lib/content/taxonomy'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'

interface InsightsFilterPanelProps {
  selectedTopic?: string
  resultCount: number
}

export function InsightsFilterPanel({ selectedTopic, resultCount }: InsightsFilterPanelProps) {
  return (
    <Section spacing="sm" className="border-b border-border/50">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="shrink-0 text-xs font-medium text-muted-foreground">Topic</span>
            <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <FilterPill href={routes.insights.index()} label="All" active={!selectedTopic} />
              {contentCategories.insights.map((category) => (
                <FilterPill
                  key={category.slug}
                  href={buildInsightFilterHref(category.slug)}
                  label={category.name}
                  active={selectedTopic === category.slug}
                />
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 text-sm">
            <span className="text-muted-foreground">{resultCount} articles</span>
            {selectedTopic ? (
              <Link href={routes.insights.index()} className="font-medium text-primary hover:underline">
                Clear filter
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function buildInsightFilterHref(topic: string) {
  return `${routes.insights.index()}?topic=${topic}`
}

function FilterPill({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary',
      )}
    >
      {label}
    </Link>
  )
}
