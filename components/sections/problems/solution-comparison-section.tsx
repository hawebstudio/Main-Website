import Link from 'next/link'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { comparisonRows } from './problems-data'

export function SolutionComparisonSection() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="glass-strong rounded-[2rem] border border-border/50 p-6 md:p-8">
          <Eyebrow>Solution comparison</Eyebrow>
          <Heading level={2} size="xl" className="mt-3">
            Match your business goal to the right path.
          </Heading>
          <Text size="lg" tone="muted" className="mt-4 max-w-3xl">
            Use this quick map if you are still deciding which solution path fits your current priority.
          </Text>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Business goal</th>
                  <th className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Recommended solution</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.goal} className="odd:bg-background/20">
                    <td className="border-b border-border/60 px-4 py-4 text-sm text-foreground">{row.goal}</td>
                    <td className="border-b border-border/60 px-4 py-4 text-sm">
                      <Link href={row.href} className="font-medium text-primary hover:underline">
                        {row.solution}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </Section>
  )
}
