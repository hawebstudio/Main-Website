import { Quote } from 'lucide-react'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Text } from '@/components/primitives/typography'
import { testimonials } from './home-data'
import { SectionHeading } from './section-heading'

/**
 * TestimonialsSection — direct social proof between the process and the
 * final CTA. Renders nothing until home-data.ts has real, attributable
 * client testimonials (with permission) — no placeholder quotes here.
 */
export function TestimonialsSection() {
  if (testimonials.length === 0) return null

  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="Client feedback" title="What it's like to work with us." />

          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name + testimonial.company} className="glass flex flex-col gap-4 rounded-3xl p-6">
                <Quote className="size-5 text-primary" aria-hidden="true" />
                <blockquote className="flex-1">
                  <Text tone="muted" className="leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </Text>
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-medium text-foreground">{testimonial.name}</span>
                  <span className="text-muted-foreground">
                    {' '}
                    &middot; {testimonial.company}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
