import { cn } from '@/lib/utils'

type GridCols = 1 | 2 | 3 | 4

const colClasses: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

type GridGap = 'sm' | 'md' | 'lg'

const gapClasses: Record<GridGap, string> = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
}

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridCols
  gap?: GridGap
}

/**
 * Grid — responsive card grid. Mobile-first: always collapses to a
 * single column on small screens.
 */
export function Grid({ cols = 3, gap = 'md', className, ...props }: GridProps) {
  return <div className={cn('grid', colClasses[cols], gapClasses[gap], className)} {...props} />
}
