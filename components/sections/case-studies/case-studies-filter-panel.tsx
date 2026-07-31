import Link from 'next/link'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { contentCategories } from '@/lib/content/taxonomy'
import { routes } from '@/config/routes'
import type { WithContent } from '@/lib/content/source'
import type { Service } from '@/lib/content/types'
import { cn } from '@/lib/utils'
import {
  buildCaseStudyFilterHref,
  caseStudyTypeOptions,
  type CaseStudyFilters,
} from './hub-utils'

interface CaseStudiesFilterPanelProps {
  filters: CaseStudyFilters
  selected: {
    category?: string
    type?: string
    service?: string
  }
  availableServices: WithContent<Service>[]
  resultCount: number
}

export function CaseStudiesFilterPanel({
  filters,
  selected,
  availableServices,
  resultCount,
}: CaseStudiesFilterPanelProps) {
  return (
    <Section spacing="sm" className="border-b border-border/50">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 space-y-4">
            <FilterRow
              label="Category"
              filterKey="category"
              filters={filters}
              selectedValue={selected.category}
              options={contentCategories.caseStudies.map((item) => ({ value: item.slug, label: item.name }))}
            />
            <FilterRow
              label="Type"
              filterKey="type"
              filters={filters}
              selectedValue={selected.type}
              options={[...caseStudyTypeOptions]}
            />
            {availableServices.length > 0 ? (
              <FilterRow
                label="Service"
                filterKey="service"
                filters={filters}
                selectedValue={selected.service}
                options={availableServices.map((item) => ({ value: item.slug, label: item.title }))}
              />
            ) : null}
          </div>

          <div className="flex shrink-0 items-center gap-3 text-sm">
            <span className="text-muted-foreground">{resultCount} results</span>
            {(selected.category || selected.type || selected.service) && (
              <Link href={routes.caseStudies.index()} className="font-medium text-primary hover:underline">
                Clear filters
              </Link>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function FilterRow({
  label,
  filterKey,
  filters,
  selectedValue,
  options,
}: {
  label: string
  filterKey: string
  filters: CaseStudyFilters
  selectedValue?: string
  options: Array<{ value: string; label: string }>
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <span className="w-16 shrink-0 text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <FilterPill href={buildCaseStudyFilterHref(filters, filterKey)} label="All" active={!selectedValue} />
        {options.map((item) => (
          <FilterPill
            key={item.value}
            href={buildCaseStudyFilterHref(filters, filterKey, item.value)}
            label={item.label}
            active={selectedValue === item.value}
          />
        ))}
      </div>
    </div>
  )
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
