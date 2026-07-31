/**
 * Secret Validation
 * Validates that required environment variables are set
 */

export interface SecretValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

export interface SecretConfig {
  name: string
  required: boolean
  description?: string
  pattern?: RegExp
}

const REQUIRED_SECRETS: SecretConfig[] = [
  {
    name: 'NEXT_PUBLIC_SITE_URL',
    required: true,
    description: 'Public site URL',
  },
  {
    name: 'AUTH_SECRET',
    required: true,
    description: 'Authentication secret for session management',
  },
]

const OPTIONAL_SECRETS: SecretConfig[] = [
  {
    name: 'DATABASE_URL',
    required: false,
    description: 'Database connection string',
  },
  {
    name: 'SMTP_HOST',
    required: false,
    description: 'SMTP server host for email',
  },
  {
    name: 'SMTP_PORT',
    required: false,
    description: 'SMTP server port',
  },
  {
    name: 'SMTP_USER',
    required: false,
    description: 'SMTP username',
  },
  {
    name: 'SMTP_PASSWORD',
    required: false,
    description: 'SMTP password',
  },
  {
    name: 'STRIPE_SECRET_KEY',
    required: false,
    description: 'Stripe API secret key',
  },
  {
    name: 'STRIPE_WEBHOOK_SECRET',
    required: false,
    description: 'Stripe webhook secret',
  },
  {
    name: 'REVALIDATE_SECRET',
    required: false,
    description: 'Secret for ISR revalidation',
  },
  {
    name: 'INDEXNOW_KEY',
    required: true,
    description: 'IndexNow API key (submits URLs to Bing and other engines)',
  },
  {
    name: 'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    required: true,
    description: 'Google Analytics 4 measurement ID',
  },
  {
    name: 'GOOGLE_TAG_MANAGER_ID',
    required: true,
    description: 'Google Tag Manager container ID',
  },
  {
    name: 'NEXT_PUBLIC_CLARITY_PROJECT_ID',
    required: true,
    description: 'Microsoft Clarity project ID',
  },
]
 

function validateSecret(config: SecretConfig, value: string | undefined): {
  valid: boolean
  error?: string
  warning?: string
} {
  if (!value) {
    if (config.required) {
      return {
        valid: false,
        error: `Required secret ${config.name} is not set`,
      }
    }
    return {
      valid: true,
      warning: `Optional secret ${config.name} is not set`,
    }
  }

  if (config.pattern && !config.pattern.test(value)) {
    return {
      valid: false,
      error: `Secret ${config.name} does not match required pattern`,
    }
  }

  return { valid: true }
}

 
export function validateSecrets(): SecretValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Validate required secrets
  for (const config of REQUIRED_SECRETS) {
    const value = process.env[config.name]
    const result = validateSecret(config, value)

    if (!result.valid && result.error) {
      errors.push(result.error)
    }
  }

  // Validate optional secrets
  for (const config of OPTIONAL_SECRETS) {
    const value = process.env[config.name]
    const result = validateSecret(config, value)

    if (!result.valid && result.error) {
      errors.push(result.error)
    } else if (result.warning) {
      warnings.push(result.warning)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Validate secrets on startup
 */
export function validateSecretsOnStartup(): void {
  const result = validateSecrets()

  if (!result.valid) {
    console.error('❌ Secret validation failed:')
    result.errors.forEach((error) => console.error(`  - ${error}`))
    throw new Error('Secret validation failed')
  }

  if (result.warnings.length > 0) {
    console.warn('⚠️  Secret validation warnings:')
    result.warnings.forEach((warning) => console.warn(`  - ${warning}`))
  }

  console.log('✅ All required secrets are set')
}

/**
 * Get secret value with validation
 */
export function getSecret(name: string): string | undefined {
  const value = process.env[name]

  if (!value) {
    const config = [...REQUIRED_SECRETS, ...OPTIONAL_SECRETS].find((c) => c.name === name)
    if (config?.required) {
      throw new Error(`Required secret ${name} is not set`)
    }
  }

  return value
}

/**
 * Check if secret is set
 */
export function hasSecret(name: string): boolean {
  return typeof process.env[name] === 'string' && process.env[name]!.length > 0
}
