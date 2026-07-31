export interface NewsletterSignup {
  email: string
  source?: string
  tags?: string[]
}

export function createNewsletterSignup(input: NewsletterSignup): NewsletterSignup {
  return input
}
