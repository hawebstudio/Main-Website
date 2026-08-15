import { CtaSection } from '@/components/sections/cta-section'
import { CTAS } from '@/lib/data/ctas'
import { routes } from '@/config/routes'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { ProblemsHero } from './problems-hero'
import { SolutionComparisonSection } from './solution-comparison-section'
import { SolutionPathsSection } from './solution-paths-section'

const breadcrumbItems = [
  { label: 'Home', href: routes.home() },
  { label: 'Problems', href: routes.problems.index() },
]

export function ProblemsPageContent() {
  return (
    <article className="pb-24">
      <ProblemsHero breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="mb-4" />} />
      <SolutionPathsSection />
      <SolutionComparisonSection />
      <CtaSection
        title="Need help choosing the right solution?"
        description="Tell us the challenge and we will recommend the most effective path before you commit to a scope."
        primaryCta={{ label: 'Discuss Your Project', href: CTAS.startProject.href }}
        secondaryCta={CTAS.requestAudit}
      />
    </article>
  )
}
