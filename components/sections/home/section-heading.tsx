import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Heading, Eyebrow } from '@/components/primitives/typography'
import { buttonVariants } from '@/components/ui/button'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  href?: string
  ctaLabel?: string
}

export function SectionHeading({ eyebrow, title, href, ctaLabel }: SectionHeadingProps) {
  return (
    <div className="editorial-section-heading flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
      <div className="section-intro max-w-3xl flex flex-col gap-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading level={2} size="xl">
          {title}
        </Heading>
      </div>
      {href && ctaLabel ? (
        <Link href={href} className={buttonVariants({ variant: 'ghost', className: 'inline-flex shrink-0 rounded-full border border-border/70 px-4 sm:border-transparent sm:px-3' })}>
          {ctaLabel} <ArrowRight className="ml-2 size-4" />
        </Link>
      ) : null}
    </div>
  )
}
