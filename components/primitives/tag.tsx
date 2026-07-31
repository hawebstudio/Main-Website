import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TagProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  isActive?: boolean
}

/**
 * Tag — interactive filter/category link.
 * Used for filtering lists of content. (For non-interactive labels, use Badge or Chip).
 */
export function Tag({ href, isActive, className, children, ...props }: TagProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        isActive
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
