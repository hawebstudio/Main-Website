import Link from 'next/link'
import { Container } from '@/components/primitives/container'
import { Heading, Text } from '@/components/primitives/typography'
import { buttonVariants } from '@/components/ui/button'
import { routes } from '@/config/routes'

 
export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_42%)]" />
      <Container size="sm" className="relative z-10">
        <div className="glass-strong flex flex-col items-center gap-6 rounded-[2rem] p-8 text-center md:p-12">
          <span className="font-mono text-8xl font-bold text-primary" aria-hidden="true">
            404
          </span>
          <Heading level={1} size="lg">
            Page not found
          </Heading>
          <Text tone="muted" className="max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </Text>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={routes.home()} className={buttonVariants()}>
              Return home
            </Link>
            <Link href={routes.contact()} className={buttonVariants({ variant: 'outline', className: 'bg-transparent' })}>
              Start a project
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
