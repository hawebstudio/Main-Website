import { SectionHeader } from './section-header'
import { Section } from '@/components/primitives/section'
import { Container } from '@/components/primitives/container'
import { 
  ProjectCard, 
  ServiceCard, 
  InsightCard, 
  TechnologyCard, 
  CaseStudyCard,
  ProblemCard 
} from '@/components/cards/domain-cards'
import type { 
  Project, 
  Service, 
  Insight, 
  Technology, 
  CaseStudy,
  Problem 
} from '@/lib/content/types'
import { WithContent } from '@/lib/content/source'

type ContentType = 'project' | 'service' | 'insight' | 'technology' | 'case-study' | 'problem'

type ContentItem = 
  | WithContent<Project>
  | WithContent<Service>
  | WithContent<Insight>
  | WithContent<Technology>
  | WithContent<CaseStudy>
  | WithContent<Problem>

interface RelatedContentProps {
  title?: string
  eyebrow?: string
  type: ContentType
  items: ContentItem[]
}

export function RelatedContent({
  title = 'Related Content',
  eyebrow = 'Explore More',
  type,
  items
}: RelatedContentProps) {
  if (!items || items.length === 0) return null

  const renderCard = (item: ContentItem) => {
    switch (type) {
      case 'project': return <ProjectCard project={item as WithContent<Project>} />
      case 'service': return <ServiceCard service={item as WithContent<Service>} />
      case 'insight': return <InsightCard insight={item as WithContent<Insight>} />
      case 'technology': return <TechnologyCard technology={item as WithContent<Technology>} />
      case 'case-study': return <CaseStudyCard caseStudy={item as WithContent<CaseStudy>} />
      case 'problem': return <ProblemCard problem={item as WithContent<Problem>} />
      default: return null
    }
  }

  return (
    <Section spacing="sm">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 3).map(item => (
            <div key={item.slug}>
              {renderCard(item)}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
