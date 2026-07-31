import type { TemplateInput } from '../types'

export function textTemplate(input: TemplateInput): string {
  return [input.subject, '', input.body, input.cta ? `${input.cta.label}: ${input.cta.url}` : undefined]
    .filter(Boolean)
    .join('\n')
}
