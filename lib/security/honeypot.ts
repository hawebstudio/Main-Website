/**
 * Honeypot Field Implementation
 * Protects forms from spam bots using hidden fields
 */

export interface HoneypotConfig {
  fieldName?: string
  timestampFieldName?: string
  minTime?: number // Minimum time in milliseconds before form submission
}

const DEFAULT_CONFIG: HoneypotConfig = {
  fieldName: 'website',
  timestampFieldName: 'timestamp',
  minTime: 2000, // 2 seconds
}

/**
 * Generate honeypot field HTML
 */
export function generateHoneypotFields(config: HoneypotConfig = DEFAULT_CONFIG): string {
  const { fieldName, timestampFieldName } = config

  return `
    <div style="display:none">
      <label>
        Don't fill this out if you're human:
        <input 
          type="text" 
          name="${fieldName}" 
          tabIndex={-1} 
          autoComplete="off"
        />
      </label>
      <input 
        type="hidden" 
        name="${timestampFieldName}" 
        value="${Date.now()}"
      />
    </div>
  `
}

/**
 * Validate honeypot field
 */
export function validateHoneypot(
  formData: FormData | Record<string, string>,
  config: HoneypotConfig = DEFAULT_CONFIG
): { valid: boolean; reason?: string } {
  const { fieldName, timestampFieldName, minTime } = config

  const data = formData instanceof FormData 
    ? Object.fromEntries(formData.entries())
    : formData

  // Check if honeypot field is filled
  if (data[fieldName || 'website']) {
    return { valid: false, reason: 'Honeypot field filled' }
  }

  // Check timestamp if provided
  if (timestampFieldName && minTime) {
    const timestamp = parseInt(data[timestampFieldName] as string, 10)
    const elapsed = Date.now() - timestamp

    if (isNaN(timestamp) || elapsed < minTime) {
      return { valid: false, reason: 'Form submitted too quickly' }
    }
  }

  return { valid: true }
}

/**
 * Server action wrapper with honeypot validation
 */
export function withHoneypotValidation<T extends (...args: unknown[]) => Promise<unknown>>(
  action: T,
  config: HoneypotConfig = DEFAULT_CONFIG
): T {
  return (async (...args: Parameters<T>) => {
    const formData = args[0] as FormData | Record<string, string>

    if (formData) {
      const validation = validateHoneypot(formData, config)
      if (!validation.valid) {
        throw new Error(validation.reason || 'Honeypot validation failed')
      }
    }

    return action(...args)
  }) as T
}
