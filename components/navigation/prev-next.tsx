import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PrevNextLink {
  label: string
  href: string
}

interface PrevNextProps {
  previous?: PrevNextLink
  next?: PrevNextLink
  className?: string
}

/**
 * PrevNext — previous/next article navigation for editorial content.
 */
export function PrevNext({ previous, next, className }: PrevNextProps) {
  if (!previous && !next) return null

  return (
    <nav
      aria-label="Adjacent content"
      className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)}
    >
      {previous ? (
        <Link
          href={previous.href}
          className="glass group flex flex-col gap-1 rounded-2xl p-5 transition-colors hover:bg-accent"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Previous
          </span>
          <span className="text-sm font-medium text-foreground">{previous.label}</span>
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="glass group flex flex-col items-end gap-1 rounded-2xl p-5 text-right transition-colors hover:bg-accent"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Next
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium text-foreground">{next.label}</span>
        </Link>
      ) : null}
    </nav>
  )
}
