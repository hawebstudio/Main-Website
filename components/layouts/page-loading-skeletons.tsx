import { Container } from '@/components/primitives/container'
import { Skeleton } from '@/components/ui/skeleton'

/* ============================================================
   Page-level loading skeletons.
   Each variant mirrors the approximate layout of a real page
   so the transition feels seamless rather than jarring.
   ============================================================ */

/**
 * Hero skeleton — the tall intro block with breadcrumbs, heading,
 * and subtitle placeholder. Used by most content pages.
 */
export function HeroSkeleton() {
  return (
    <header className="relative overflow-hidden -mt-18 pb-12 pt-12 md:pb-20 md:pt-16">
      <div className="pt-18 w-full">
        <Container className="flex flex-col gap-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-12 rounded-full" />
            <Skeleton className="h-3.5 w-3 rounded-full" />
            <Skeleton className="h-3.5 w-20 rounded-full" />
          </div>
          {/* Eyebrow */}
          <Skeleton className="h-4 w-24 rounded-full" />
          {/* Heading */}
          <Skeleton className="h-10 w-3/4 max-w-xl rounded-xl md:h-14" />
          {/* Subtitle */}
          <div className="flex flex-col gap-2 max-w-lg">
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-5/6 rounded-full" />
          </div>
        </Container>
      </div>
    </header>
  )
}

/**
 * Section skeleton — a generic content block with heading + grid cards.
 */
export function SectionSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="flex flex-col gap-8">
          {/* Section heading */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-3.5 w-20 rounded-full" />
            <Skeleton className="h-8 w-2/3 max-w-md rounded-lg" />
          </div>
          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: cards }).map((_, i) => (
              <div key={i} className="glass flex flex-col gap-4 rounded-2xl p-6">
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-5 w-2/3 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

/**
 * CTA skeleton — the bottom call-to-action block.
 */
export function CtaSkeleton() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="glass-strong flex flex-col items-center gap-6 rounded-3xl px-6 py-16 text-center md:py-20">
          <Skeleton className="h-10 w-2/3 max-w-md rounded-xl" />
          <Skeleton className="h-4 w-1/2 max-w-sm rounded-full" />
          <div className="flex gap-3">
            <Skeleton className="h-11 w-32 rounded-xl" />
            <Skeleton className="h-11 w-32 rounded-xl" />
          </div>
        </div>
      </Container>
    </section>
  )
}

/**
 * Full page skeleton — hero + 2 sections + CTA.
 * Default fallback for any route without a custom loading.tsx.
 */
export function FullPageSkeleton() {
  return (
    <article role="status" aria-label="Loading page">
      <HeroSkeleton />
      <SectionSkeleton cards={3} />
      <SectionSkeleton cards={2} />
      <CtaSkeleton />
      <span className="sr-only">Loading…</span>
    </article>
  )
}

/**
 * Detail page skeleton — hero + long-form content + sidebar.
 * Used by service detail, problem detail, case study detail, etc.
 */
export function DetailPageSkeleton() {
  return (
    <article role="status" aria-label="Loading page">
      <HeroSkeleton />
      <section className="py-10 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
            {/* Main content */}
            <div className="flex flex-col gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full rounded-full" />
              ))}
              <Skeleton className="h-4 w-3/4 rounded-full" />
              <div className="my-4" />
              <Skeleton className="h-7 w-1/2 rounded-lg" />
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={`b-${i}`} className="h-4 w-full rounded-full" />
              ))}
            </div>
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col gap-6">
              <div className="glass flex flex-col gap-4 rounded-2xl p-6">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-3/4 rounded-full" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <div className="glass flex flex-col gap-4 rounded-2xl p-6">
                <Skeleton className="h-5 w-20 rounded-md" />
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-5/6 rounded-full" />
              </div>
            </aside>
          </div>
        </Container>
      </section>
      <CtaSkeleton />
      <span className="sr-only">Loading…</span>
    </article>
  )
}
