import { Container } from '@/components/primitives/container'
import { Heading, Text } from '@/components/primitives/typography'
import type { LegalDocument } from '@/lib/legal/content'

interface LegalDocumentSectionProps {
  document: LegalDocument
}

/**
 * LegalDocumentSection — shared renderer for privacy/terms/cookies pages
 * so the three legal pages stay visually consistent and only the data
 * (lib/legal/content.ts) needs to change when copy is updated.
 */
export function LegalDocumentSection({ document }: LegalDocumentSectionProps) {
  return (
    <article className="py-16 md:py-24">
      <Container size="sm" as="div" className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Heading level={1} size="display">
            {document.title}
          </Heading>
          <Text size="sm" tone="muted">
            Effective {document.effectiveDate}
          </Text>
          {document.intro.map((paragraph, index) => (
            <Text key={index} size="lg" tone="muted" className="mt-3">
              {paragraph}
            </Text>
          ))}
        </div>

        <div className="flex flex-col gap-10">
          {document.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <Heading level={2} size="md">
                {section.heading}
              </Heading>
              {section.body.map((paragraph, index) => (
                <Text key={index} tone="muted">
                  {paragraph}
                </Text>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </article>
  )
}
