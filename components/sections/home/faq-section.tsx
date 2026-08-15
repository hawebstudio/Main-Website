import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Heading, Text } from '@/components/primitives/typography'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { aboutFaqs } from '@/lib/data/about-faqs'

export function FaqSection() {
  // Use the top 4 FAQs for the homepage
  const homepageFaqs = aboutFaqs.slice(0, 4)

  return (
    <Section spacing="lg">
      <Container size="md">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Heading level={2} size="xl">
              Frequently asked questions
            </Heading>
            <Text size="lg" tone="muted" className="max-w-2xl">
              Everything you need to know about how we work, what we build, and how we measure success.
            </Text>
          </div>

          <div className="glass rounded-3xl p-4 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {homepageFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border/30 px-2 last:border-0"
                >
                  <AccordionTrigger className="text-left text-base hover:text-primary md:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  )
}
