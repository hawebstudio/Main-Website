import { cn } from '@/lib/utils'

interface LandingLayoutProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional decorative background layer */
  background?: React.ReactNode
}

/**
 * LandingLayout — full-bleed landing page shell. Unlike ArticleLayout,
 * this has no container constraint on the hero area so sections can
 * span edge-to-edge. Individual sections manage their own Container.
 *
 * Usage:
 * ```tsx
 * <LandingLayout>
 *   <HeroWrapper>...</HeroWrapper>
 *   <Section><Container>...</Container></Section>
 *   <CtaSection />
 * </LandingLayout>
 * ```
 */
export function LandingLayout({
  background,
  className,
  children,
  ...props
}: LandingLayoutProps) {
  return (
    <div className={cn('relative flex flex-col', className)} {...props}>
      {background ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {background}
        </div>
      ) : null}
      {children}
    </div>
  )
}
