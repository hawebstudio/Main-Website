import { cn } from '@/lib/utils'

/**
 * BentoGrid — asymmetric feature grid.
 * Children control their own span via <BentoItem span={...}>.
 */
export function BentoGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[minmax(10rem,auto)]', className)}
      {...props}
    />
  )
}

type BentoSpan = 2 | 3 | 4 | 6

const spanClasses: Record<BentoSpan, string> = {
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  6: 'md:col-span-6',
}

interface BentoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: BentoSpan
  rowSpan?: 1 | 2
}

export function BentoItem({ span = 3, rowSpan = 1, className, ...props }: BentoItemProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-6',
        spanClasses[span],
        rowSpan === 2 && 'md:row-span-2',
        className,
      )}
      {...props}
    />
  )
}
