import type { AutomationTask, PublishWorkflowInput } from './types'

/** Prepare content-publish automation tasks without binding to a provider. */
export async function runPublishWorkflow(input: PublishWorkflowInput): Promise<AutomationTask[]> {
  return [
    {
      id: `search-index:${input.collection}:${input.slug}`,
      name: 'Queue search index refresh',
      status: 'queued',
    },
    {
      id: `feeds:${input.type}:${input.slug}`,
      name: 'Queue feed refresh',
      status: 'queued',
    },
  ]
}
