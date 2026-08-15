import Link from 'next/link'
import { BookOpenText, Layers3, ShieldCheck } from 'lucide-react'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { buttonVariants } from '@/components/ui/button'
import { routes } from '@/config/routes'

interface CaseStudiesHubHeroProps {
  breadcrumbs?: React.ReactNode
}

export function CaseStudiesHubHero({ breadcrumbs }: CaseStudiesHubHeroProps) {
  return (
    <HeroWrapper
      className="py-14 md:py-20"
      background={
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_20%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.05),transparent_16%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_44%)]" />
          <div className="absolute left-1/2 top-0 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>
      }
    >
      {breadcrumbs}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-end">
        <div className="flex flex-col gap-7">
          <Eyebrow>Case studies hub</Eyebrow>
          <Heading level={1} size="display" className="max-w-5xl text-balance leading-[0.88] tracking-tight">
            Engineering plus business implementation stories.
          </Heading>
          <Text size="lg" tone="muted" className="max-w-3xl">
            This is not a portfolio gallery. Each case study documents problem framing, investigation, rejected options, architecture decisions, implementation, trade-offs, and lessons learned.
          </Text>
          <div className="flex flex-wrap gap-3">
            <Link href={routes.contact('start-project')} className={buttonVariants()}>
              Discuss a Similar Project
            </Link>
            <Link href={routes.work.index()} className={buttonVariants({ variant: 'outline', className: 'bg-transparent' })}>
              Explore Work Hub
            </Link>
          </div>
        </div>
        <div className="@container glass-strong grid gap-4 rounded-[2rem] p-6 @sm:grid-cols-2">
          <HeroMetric icon={<BookOpenText className="size-5 text-primary" />} title="Publication quality">
            Structured like technical publications with decision context and implementation logic.
          </HeroMetric>
          <HeroMetric icon={<ShieldCheck className="size-5 text-primary" />} title="No fabrication">
            If metrics or timelines are unavailable, they are explicitly marked as unavailable.
          </HeroMetric>
          <HeroMetric icon={<Layers3 className="size-5 text-primary" />} title="Connected evidence system" className="@sm:col-span-2">
            Every entry is connected to Services, Solutions, Work, Technologies, and Insights.
          </HeroMetric>
        </div>
      </div>
    </HeroWrapper>
  )
}

function HeroMetric({
  icon,
  title,
  children,
  className,
}: {
  icon: React.ReactNode
  title: string
  children: string
  className?: string
}) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-background/50 p-4 ${className || ''}`}>
      {icon}
      <div className="mt-3 text-2xl font-semibold tracking-tight">{title}</div>
      <Text size="sm" tone="muted" className="mt-2">
        {children}
      </Text>
    </div>
  )
}
