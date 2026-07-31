import { cn } from '@/lib/utils'

interface SplitLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column ratio on desktop */
  ratio?: '1:1' | '1:2' | '2:1'
  /** Reverse visual order on desktop (content stays DOM-first for a11y) */
  reverse?: boolean
  /** Vertically align columns */
  align?: 'start' | 'center'
}

const ratioClasses: Record<NonNullable<SplitLayoutProps['ratio']>, string> = {
  '1:1': 'lg:grid-cols-2',
  '1:2': 'lg:grid-cols-[1fr_2fr]',
  '2:1': 'lg:grid-cols-[2fr_1fr]',
}

/**
 * SplitLayout — two-column layout that stacks on mobile.
 * Pass exactly two children.
 */
export function SplitLayout({
  ratio = '1:1',
  reverse = false,
  align = 'start',
  className,
  children,
  ...props
}: SplitLayoutProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-8 lg:gap-12',
        ratioClasses[ratio],
        align === 'center' && 'items-center',
        reverse && 'lg:[&>*:first-child]:order-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
