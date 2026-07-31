import type { LlmResource } from '../types'

export function generateLlmsText(resources: LlmResource[]): string {
  return resources
    .map((resource) => {
      const description = resource.description ? `: ${resource.description}` : ''
      return `- [${resource.title}](${resource.url})${description}`
    })
    .join('\n')
}
