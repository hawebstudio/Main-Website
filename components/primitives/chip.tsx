import { cn } from '@/lib/utils'

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive'
}

const variantClasses = {
  default: 'bg-muted text-muted-foreground',
  success: 'bg-emerald-500/10 text-emerald-500',
  warning: 'bg-amber-500/10 text-amber-500',
  destructive: 'bg-destructive/10 text-destructive',
}

/**
 * Chip — small, non-interactive status or meta label.
 * (For interactive filtering, use Tag. For structural labels, use Badge).
 */
export function Chip({ variant = 'default', className, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
