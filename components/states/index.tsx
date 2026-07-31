import { Heading, Text } from '@/components/primitives/typography'
import { Skeleton } from '@/components/ui/skeleton'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------
   State components — empty, loading, error.
   Every listing page uses these instead of ad-hoc markup.
   ------------------------------------------------------------ */

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: { label: string; href: string }
}

export function EmptyState({ title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'glass flex flex-col items-center gap-3 rounded-2xl px-6 py-16 text-center',
        className,
      )}
      {...props}
    >
      <Heading level={2} size="sm">
        {title}
      </Heading>
      {description ? (
        <Text tone="muted" className="max-w-md">
          {description}
        </Text>
      ) : null}
      {action ? (
        <Link href={action.href} className={buttonVariants({ variant: 'outline', className: 'mt-2 bg-transparent' })}>
          {action.label}
        </Link>
      ) : null}
    </div>
  )
}

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of skeleton cards to render */
  count?: number
}

export function LoadingState({ count = 6, className, ...props }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className={cn('grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3', className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="glass flex flex-col gap-4 rounded-2xl p-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  )
}

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'glass flex flex-col items-center gap-3 rounded-2xl px-6 py-16 text-center',
        className,
      )}
      {...props}
    >
      <Heading level={2} size="sm">
        {title}
      </Heading>
      <Text tone="muted" className="max-w-md">
        {description}
      </Text>
      {onRetry ? (
        <Button onClick={onRetry} variant="outline" className="mt-2 bg-transparent">
          Try again
        </Button>
      ) : null}
    </div>
  )
}
