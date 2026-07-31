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
    <div className="flex items-end justify-between gap-6">
      <div className="flex flex-col gap-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading level={2} size="xl">
          {title}
        </Heading>
      </div>
      {href && ctaLabel ? (
        <Link href={href} className={buttonVariants({ variant: 'ghost', className: 'hidden md:flex' })}>
          {ctaLabel} <ArrowRight className="ml-2 size-4" />
        </Link>
      ) : null}
    </div>
  )
}
