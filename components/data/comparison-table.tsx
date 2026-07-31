import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Heading } from '@/components/primitives/typography'

/* ---------- Types ---------- */

export interface ComparisonFeature {
  name: string
  /** Map of column key → boolean (supported) or string (custom value) */
  values: Record<string, boolean | string>
}

export interface ComparisonColumn {
  key: string
  label: string
  highlighted?: boolean
}

interface ComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: ComparisonColumn[]
  features: ComparisonFeature[]
  /** Optional section title */
  title?: string
}

/**
 * ComparisonTable — feature comparison grid for service tiers,
 * tech stacks, or plan comparisons. Responsive: horizontally
 * scrollable on mobile.
 */
export function ComparisonTable({
  columns,
  features,
  title,
  className,
  ...props
}: ComparisonTableProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      {title ? <Heading level={3} size="md">{title}</Heading> : null}
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground" />
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-center font-semibold',
                    col.highlighted && 'bg-primary/5 text-primary',
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={feature.name}
                className={cn(
                  'border-b border-border last:border-0',
                  index % 2 === 0 && 'bg-muted/30',
                )}
              >
                <td className="px-4 py-3 font-medium">{feature.name}</td>
                {columns.map((col) => {
                  const value = feature.values[col.key]
                  return (
                    <td
                      key={col.key}
                      className={cn(
                        'px-4 py-3 text-center',
                        col.highlighted && 'bg-primary/5',
                      )}
                    >
                      {typeof value === 'boolean' ? (
                        value ? (
                          <Check className="mx-auto size-4 text-primary" aria-label="Included" />
                        ) : (
                          <Minus className="mx-auto size-4 text-muted-foreground" aria-label="Not included" />
                        )
                      ) : (
                        <span>{value}</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
