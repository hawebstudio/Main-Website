import { MDXRemote } from 'next-mdx-remote/rsc'
import { AlertTriangle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Heading, Text } from '@/components/primitives/typography'
import { Timeline } from '@/components/data/timeline'
import { mdxComponents } from '@/lib/content/mdx-components'
import { mdxOptions } from '@/lib/content/mdx-options'
import { createHeadingComponents, toLabel, type CaseStudyEntry } from './detail-utils'

interface CaseStudyMainArticleProps {
  caseStudy: CaseStudyEntry
  constraints: string[]
  tradeOffs: string[]
  timelineEvents: Array<{ title: string; description: string }>
}

export function CaseStudyMainArticle({ caseStudy, constraints, tradeOffs, timelineEvents }: CaseStudyMainArticleProps) {
  const customMdxComponents = { ...mdxComponents, ...createHeadingComponents() }

  return (
    <article className="flex flex-col gap-12 lg:col-span-6">
      {(caseStudy.background || caseStudy.businessContext) ? (
        <ArticlePanel title="Background">
          <Text className="mt-4 leading-relaxed">{caseStudy.background ?? caseStudy.businessContext}</Text>
        </ArticlePanel>
      ) : null}

      {(caseStudy.challenge || constraints.length || caseStudy.risks?.length || caseStudy.requirements?.length) ? (
        <ArticlePanel title="Challenge">
          {caseStudy.challenge ? <Text className="mt-4 leading-relaxed">{caseStudy.challenge}</Text> : null}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <CompactList title="Constraints" items={constraints} />
            <CompactList title="Risks" items={caseStudy.risks ?? []} />
            <CompactList title="Requirements" items={caseStudy.requirements ?? []} />
          </div>
        </ArticlePanel>
      ) : null}

      {(caseStudy.investigation || caseStudy.optionsConsidered?.length || caseStudy.decisionMaking) ? (
        <ArticlePanel title="Investigation">
          {caseStudy.investigation ? <Text className="mt-4 leading-relaxed">{caseStudy.investigation}</Text> : null}
          {caseStudy.decisionMaking ? <Text className="mt-4 leading-relaxed">{caseStudy.decisionMaking}</Text> : null}
          {caseStudy.optionsConsidered?.length ? (
            <div className="mt-6 space-y-3">
              {caseStudy.optionsConsidered.map((item) => (
                <div key={item.option} className="rounded-2xl border border-border/60 bg-background/45 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-sm font-semibold text-foreground">{item.option}</div>
                    <Badge variant={item.decision === 'selected' ? 'default' : 'secondary'}>{toLabel(item.decision)}</Badge>
                  </div>
                  <Text size="sm" tone="muted" className="mt-2 leading-relaxed">
                    {item.rationale}
                  </Text>
                </div>
              ))}
            </div>
          ) : null}
        </ArticlePanel>
      ) : null}

      {(caseStudy.solution || caseStudy.architecture || caseStudy.implementation || caseStudy.technicalDetails) ? (
        <ArticlePanel title="Solution and Implementation">
          {caseStudy.solution ? <Text className="mt-4 leading-relaxed">{caseStudy.solution}</Text> : null}
          {caseStudy.architecture ? <Text className="mt-4 leading-relaxed">{caseStudy.architecture}</Text> : null}
          {caseStudy.implementation ? <Text className="mt-4 leading-relaxed">{caseStudy.implementation}</Text> : null}
          {caseStudy.technicalDetails ? <Text className="mt-4 leading-relaxed">{caseStudy.technicalDetails}</Text> : null}
          {timelineEvents.length > 0 ? (
            <div className="mt-8 rounded-2xl border border-border/60 bg-background/45 p-5">
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Implementation timeline</div>
              <Timeline events={timelineEvents} />
            </div>
          ) : null}
        </ArticlePanel>
      ) : null}

      {(caseStudy.outcomes?.length || caseStudy.results?.length || caseStudy.businessImpact || caseStudy.technicalImpact || caseStudy.metricsNote) ? (
        <section className="rounded-[2rem] border border-primary/20 bg-primary/5 p-6 md:p-8">
          <Heading level={2} size="lg" className="text-primary">
            Outcome
          </Heading>
          <ul className="mt-4 space-y-2 text-sm text-foreground">
            {(caseStudy.outcomes ?? []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {caseStudy.results?.length ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {caseStudy.results.map((item) => (
                <div key={item.label} className="rounded-2xl border border-primary/20 bg-background/50 p-4">
                  <div className="text-xl font-semibold text-primary">{item.value}</div>
                  <Text size="sm" tone="muted" className="mt-1">
                    {item.label}
                  </Text>
                </div>
              ))}
            </div>
          ) : null}
          {caseStudy.businessImpact ? <Text className="mt-4 leading-relaxed">{caseStudy.businessImpact}</Text> : null}
          {caseStudy.technicalImpact ? <Text className="mt-4 leading-relaxed">{caseStudy.technicalImpact}</Text> : null}
          {caseStudy.metricsNote ? (
            <div className="mt-5 inline-flex items-start gap-2 rounded-2xl border border-border/60 bg-background/55 px-4 py-3 text-sm text-muted-foreground">
              <AlertTriangle className="mt-0.5 size-4 text-primary" />
              {caseStudy.metricsNote}
            </div>
          ) : null}
        </section>
      ) : null}

      {(caseStudy.lessonsLearned?.length || caseStudy.lessons || tradeOffs.length || caseStudy.whatToDoDifferently?.length || caseStudy.nextSteps) ? (
        <ArticlePanel title="Lessons Learned">
          {caseStudy.lessons ? <Text className="mt-4 leading-relaxed">{caseStudy.lessons}</Text> : null}
          {caseStudy.lessonsLearned?.length ? (
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              {caseStudy.lessonsLearned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {tradeOffs.length > 0 ? <CompactList title="Trade-offs" items={tradeOffs} className="mt-6" /> : null}
          {caseStudy.whatToDoDifferently?.length ? (
            <CompactList title="What we would do differently" items={caseStudy.whatToDoDifferently} className="mt-4" />
          ) : null}
          {caseStudy.nextSteps ? (
            <div className="mt-4 rounded-2xl border border-border/60 bg-background/45 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Next steps</div>
              <Text size="sm" tone="muted" className="mt-2 leading-relaxed">
                {caseStudy.nextSteps}
              </Text>
            </div>
          ) : null}
        </ArticlePanel>
      ) : null}

      {caseStudy.content ? (
        <section className="prose max-w-none prose-headings:text-foreground prose-a:text-primary dark:prose-invert">
          <MDXRemote source={caseStudy.content} components={customMdxComponents} options={mdxOptions} />
        </section>
      ) : null}
    </article>
  )
}

function ArticlePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-border/50 bg-background/35 p-6 md:p-8">
      <Heading level={2} size="lg">
        {title}
      </Heading>
      {children}
    </section>
  )
}

function CompactList({ title, items, className }: { title: string; items: string[]; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border/60 bg-background/45 p-4 ${className || ''}`}>
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{title}</div>
      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
