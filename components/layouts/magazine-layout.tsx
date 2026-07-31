import { cn } from '@/lib/utils'

interface MagazineLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of grid items below the featured area */
  gridCols?: 2 | 3
}

const gridColClasses = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
}

/**
 * MagazineLayout — featured hero card plus a grid of smaller cards.
 * Pass the featured item as the first child and the rest as siblings.
 *
 * Usage:
 * ```tsx
 * <MagazineLayout>
 *   <MagazineFeatured>Featured content</MagazineFeatured>
 *   <MagazineGrid>
 *     <Card /><Card /><Card />
 *   </MagazineGrid>
 * </MagazineLayout>
 * ```
 */
export function MagazineLayout({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-8', className)} {...props} />
  )
}

/**
 * MagazineFeatured — the hero slot in a magazine layout.
 */
export function MagazineFeatured({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('w-full', className)} {...props} />
  )
}

/**
 * MagazineGrid — the grid of remaining items.
 */
export function MagazineGrid({
  gridCols = 3,
  className,
  ...props
}: MagazineLayoutProps) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-6', gridColClasses[gridCols], className)}
      {...props}
    />
  )
}
