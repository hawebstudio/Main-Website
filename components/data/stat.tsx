import { cn } from '@/lib/utils'

interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
}

/**
 * Stat — single metric display for results, KPIs, and proof points.
 */
export function Stat({ value, label, className, ...props }: StatProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      <span className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {value}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

/**
 * StatGroup — row of stats with dividers.
 */
export function StatGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-8 md:flex md:items-center md:gap-12',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
