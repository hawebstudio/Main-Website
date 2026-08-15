import Link from 'next/link'
import { ArrowRight, Sparkles, Target } from 'lucide-react'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { buttonVariants } from '@/components/ui/button'
import { CTAS } from '@/lib/data/ctas'
import { finderPaths } from './problems-data'

interface ProblemsHeroProps {
  breadcrumbs?: React.ReactNode
}

export function ProblemsHero({ breadcrumbs }: ProblemsHeroProps) {
  return (
    <HeroWrapper
      className="py-14 md:py-20"
      background={
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_20%),radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.05),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_44%)]" />
          <div className="absolute left-1/2 top-0 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>
      }
    >
      {breadcrumbs}
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:gap-14">
        <div className="max-w-4xl space-y-6">
          <Eyebrow>Solutions hub</Eyebrow>
          <Heading level={1} size="display" className="max-w-5xl text-balance leading-[0.88] tracking-tight">
            Tell us your challenge. We will help you solve it.
          </Heading>
          <Text size="lg" tone="muted" className="max-w-3xl text-pretty leading-relaxed">
            This is a problem-first consultation experience for business owners who know what feels broken but are not sure which service to choose yet.
          </Text>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={CTAS.startProject.href} className={buttonVariants({ size: 'lg' })}>
              Discuss Your Project
            </Link>
            <Link
              href={CTAS.requestAudit.href}
              className={buttonVariants({ size: 'lg', variant: 'outline', className: 'bg-transparent' })}
            >
              {CTAS.requestAudit.label}
            </Link>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-strong rounded-[2rem] border border-border/50 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Eyebrow>Solution finder</Eyebrow>
                <Heading level={2} size="lg" className="mt-3">
                  Choose the situation that matches your business.
                </Heading>
              </div>
              <Sparkles className="size-6 text-primary" />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {finderPaths.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-center justify-between gap-4 rounded-3xl border border-border/60 bg-background/35 px-4 py-4 transition-colors hover:border-primary/40 hover:bg-background/55"
                  >
                    <span className="flex items-center gap-3 text-base font-medium text-foreground">
                      <span className="flex size-10 items-center justify-center rounded-2xl border border-border/60 bg-background/70 text-primary transition-transform group-hover:-translate-y-0.5">
                        <Icon className="size-4" />
                      </span>
                      {item.label}
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <HeroStat eyebrow="Commercial clarity" title="Problem to outcome path.">
              Every solution maps challenge, likely causes, recommended services, and expected business outcomes.
            </HeroStat>
            <HeroStat eyebrow="SEO + AI Search" title="Structured for retrieval.">
              Sections are designed to answer what the problem is, what causes it, and which services solve it.
            </HeroStat>
          </div>
        </div>
      </div>
    </HeroWrapper>
  )
}

function HeroStat({ eyebrow, title, children }: { eyebrow: string; title: string; children: string }) {
  return (
    <div className="glass rounded-[2rem] border border-border/50 p-6">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading level={3} size="sm" className="mt-3">
        {title}
      </Heading>
      <Text tone="muted" size="sm" className="mt-3 leading-relaxed">
        {children}
      </Text>
    </div>
  )
}
