export interface SyncJob {
  id: string
  source: 'github' | 'payload' | 'search-index' | 's3'
  target: string
}

export function createSyncJob(input: SyncJob): SyncJob {
  return input
}
