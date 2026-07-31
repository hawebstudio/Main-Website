import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text } from '@/components/primitives/typography'
import type { Cta } from '@/lib/content/types'
import { cn } from '@/lib/utils'

interface CtaSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  description?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  /** Small reassurance line under the buttons (e.g. response time, no obligation) */
  note?: string
}

export function CtaSection({
  title = 'Ready to start a project?',
  description = 'Let\'s talk about how we can help your business grow.',
  primaryCta = { label: 'Get in Touch', href: '/contact' },
  secondaryCta,
  note,
  className,
  ...props
}: CtaSectionProps) {
  return (
    <Section spacing="lg" className={cn(className)} {...props}>
      <Container>
        <div className="glass-strong flex flex-col items-center gap-6 rounded-3xl px-6 py-16 text-center md:py-20">
          <Heading level={2} size="xl">
            {title}
          </Heading>
          {description ? (
            <Text size="lg" tone="muted" className="max-w-xl">
              {description}
            </Text>
          ) : null}
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link href={primaryCta.href} className={buttonVariants({ size: 'lg' })}>
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link href={secondaryCta.href} className={buttonVariants({ size: 'lg', variant: 'outline', className: 'bg-transparent' })}>
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
          {note ? (
            <Text size="sm" tone="muted">
              {note}
            </Text>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
