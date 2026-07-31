import Link from 'next/link'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { buttonVariants } from '@/components/ui/button'
import { CTAS } from '@/lib/data/ctas'
import { heroBadges, heroPrinciples } from './home-data'

export function HeroSection() {
  return (
    <HeroWrapper
      className="py-12 md:py-16"
      background={
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_24%),radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.05),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_44%)]" />
          <div className="absolute left-1/2 top-10 h-80 w-176 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
        </div>
      }
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center lg:gap-14">
        <div className="flex max-w-4xl flex-col items-center gap-6 pt-8 md:pt-12">
          <Eyebrow>Web design & engineering studio &middot; Available for select projects</Eyebrow>
          <Heading level={1} size="display" className="max-w-5xl text-balance leading-[0.88] tracking-tight">
            Websites engineered to rank, convert, and hold up under growth.
          </Heading>
          <Text size="lg" tone="muted" className="max-w-2xl text-pretty leading-relaxed">
            HA Web Studio builds sites for businesses that are tired of paying for design that
            doesn&rsquo;t perform. We pair positioning and UX strategy with production-grade
            engineering, so the result ranks in search, reads well to AI, and gives visitors a
            clear reason to act.
          </Text>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={CTAS.startProject.href} className={buttonVariants({ size: 'lg' })}>
              {CTAS.startProject.label}
            </Link>
            <Link
              href={CTAS.requestAudit.href}
              className={buttonVariants({ size: 'lg', variant: 'outline', className: 'bg-transparent' })}
            >
              {CTAS.requestAudit.label}
            </Link>
          </div>
          <Text size="sm" tone="muted">
            No obligation. We&rsquo;ll tell you honestly if a rebuild is what you actually need.
          </Text>
        </div>

        <div className="w-full max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {heroPrinciples.map((principle) => (
              <div key={principle.eyebrow} className="glass-strong rounded-[2rem] border border-border/50 p-6 text-left">
                <Eyebrow>{principle.eyebrow}</Eyebrow>
                <Heading level={2} size="sm" className="mt-3">
                  {principle.title}
                </Heading>
                <Text tone="muted" size="sm" className="mt-3 max-w-sm leading-relaxed">
                  {principle.description}
                </Text>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground md:mt-6">
            {heroBadges.map((badge, index) => (
              <span
                key={badge}
                className="motion-safe:animate-[badge-slide_8s_ease-in-out_infinite] rounded-full border border-border/60 bg-background/45 px-3 py-1.5"
                style={{ animationDelay: `${index * 0.35}s` }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </HeroWrapper>
  )
}
