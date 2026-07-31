import { Container } from '@/components/primitives/container'
import { cn } from '@/lib/utils'

interface HeroWrapperProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional decorative background layer (rendered behind content) */
  background?: React.ReactNode
}

/**
 * HeroWrapper — structural shell for page heroes. Phase 2 pages drop
 * their hero content in; the wrapper owns spacing and background
 * layering so every hero stays consistent.
 */
export function HeroWrapper({ background, className, children, ...props }: HeroWrapperProps) {
  return (
    <header className={cn('relative overflow-hidden', className)} {...props}>
      {background ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {background}
        </div>
      ) : null}
      <Container className="flex flex-col gap-6 py-12 md:py-16">{children}</Container>
    </header>
  )
}
