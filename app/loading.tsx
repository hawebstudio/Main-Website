import { Container } from '@/components/primitives/container'

export default function Loading() {
  return (
    <main className="flex min-h-dvh items-center justify-center py-24">
      <Container size="sm" className="w-full">
        <div className="glass-strong rounded-[2rem] p-8 md:p-12">
          <div className="space-y-4">
            <div className="h-4 w-28 rounded-full bg-muted/70" />
            <div className="h-12 w-3/4 rounded-2xl bg-muted/70" />
            <div className="h-4 w-full rounded-full bg-muted/50" />
            <div className="h-4 w-5/6 rounded-full bg-muted/50" />
            <div className="grid gap-3 pt-6 sm:grid-cols-2">
              <div className="h-24 rounded-2xl bg-muted/50" />
              <div className="h-24 rounded-2xl bg-muted/50" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}