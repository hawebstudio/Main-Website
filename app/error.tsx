'use client'

import Link from 'next/link'
import { Container } from '@/components/primitives/container'
import { Heading, Text } from '@/components/primitives/typography'
import { Button, buttonVariants } from '@/components/ui/button'

/**
 * Global error boundary — catches unhandled errors in any route
 * segment. Client component required by Next.js.
 */
export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_40%)]" />
      <Container size="sm" className="relative z-10">
        <div className="glass-strong flex flex-col gap-6 rounded-[2rem] p-8 text-center md:p-12">
          <span className="font-mono text-8xl font-bold text-destructive" aria-hidden="true">
            500
          </span>
          <Heading level={1} size="lg">
            Something went wrong
          </Heading>
          <Text tone="muted" className="mx-auto max-w-md">
            An unexpected error occurred. Please try again, or return to the home page if the problem persists.
          </Text>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={reset}>Try again</Button>
            <Link href="/" className={buttonVariants({ variant: 'outline', className: 'bg-transparent' })}>
              Return home
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
