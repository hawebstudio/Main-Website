export interface TransactionalEmail {
  to: string
  subject: string
  template: 'contact' | 'newsletter' | 'confirmation' | 'quote'
  data?: Record<string, unknown>
}

export function createTransactionalEmail(input: TransactionalEmail): TransactionalEmail {
  return input
}
