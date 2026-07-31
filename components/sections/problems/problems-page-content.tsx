import { CtaSection } from '@/components/sections/cta-section'
import { CTAS } from '@/lib/data/ctas'
import { ProblemsHero } from './problems-hero'
import { SolutionComparisonSection } from './solution-comparison-section'
import { SolutionPathsSection } from './solution-paths-section'

export function ProblemsPageContent() {
  return (
    <article className="pb-24">
      <ProblemsHero />
      <SolutionPathsSection />
      <SolutionComparisonSection />
      <CtaSection
        title="Need help choosing the right solution?"
        description="Tell us the challenge and we will recommend the most effective path before you commit to a scope."
        primaryCta={{ label: 'Discuss Your Project', href: CTAS.startProject.href }}
        secondaryCta={{ label: 'Request Website Audit', href: CTAS.requestAudit.href }}
      />
    </article>
  )
}
