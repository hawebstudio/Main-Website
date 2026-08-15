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
    // NOTE: intentionally no `overflow-hidden` here. Every background
    // passed in already self-clips (each one wraps its content in its own
    // `absolute inset-0 overflow-hidden` div — see hero-backgrounds.tsx and
    // the inline backgrounds in components like services-hero.tsx). If this
    // <header> also clips, it cuts off the background layer's upward
    // extension below, right back to the bug this is fixing.
    <header className={cn('relative isolate py-12 md:py-16', className)} {...props}>
      {background ? (
        // The background is intentionally NOT a plain inset-0 layer.
        // <main> reserves pt-18 (4.5rem) above every page for the fixed
        // nav, which pushes this <header> (and therefore an inset-0
        // background) down below the nav — leaving a flat, background-less
        // strip behind the floating pill. Extending this layer upward by
        // the same 4.5rem (and growing its height to match) lets the hero
        // visuals show through behind the translucent header instead of
        // stopping short of it.
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-18 -z-10 h-[calc(100%+4.5rem)] overflow-hidden"
        >
          {background}
        </div>
      ) : null}
      <Container className="flex flex-col gap-6">{children}</Container>
    </header>
  )
}
