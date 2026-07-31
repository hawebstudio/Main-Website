import { company } from '@/lib/business/company'

export type ContentProviderType =
  | 'git'
  | 'decap'
  | 'sanity'
  | 'contentlayer'
  | 'payload'
  | 'notion'
  | 'headless-api'

export interface ContentProviderConfig {
  type: ContentProviderType
   apiUrl?: string
   apiTokenEnvVar?: string
   projectId?: string
   dataset?: string
   databaseId?: string
}

 
export const contentProviderConfig: ContentProviderConfig = {
  type: (process.env.CONTENT_PROVIDER as ContentProviderType) ?? 'git',
  apiUrl: process.env.CONTENT_API_URL,
  apiTokenEnvVar: 'CONTENT_API_TOKEN',
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET ?? 'production',
  databaseId: process.env.NOTION_DATABASE_ID,
}
 
export const editorialConfig = {
   enforceGovernance: process.env.ENFORCE_CONTENT_GOVERNANCE !== 'false',
   defaultAuthor: company.name,
   wordsPerMinute: 200,
   freshnessThresholdDays: 180,
} as const

 export const automationConfig = {
   revalidateSecretEnvVar: 'REVALIDATE_SECRET',
   indexNowKeyEnvVar: 'INDEXNOW_KEY',
   indexNowEnabled: process.env.INDEXNOW_ENABLED === 'true',
   revalidatePaths: ['/', '/insights', '/technologies', '/case-studies', '/problems', '/work', '/services'],
} as const
