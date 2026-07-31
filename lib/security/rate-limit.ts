/**
 * Rate Limiting Implementation
 * Protects API routes and server actions from abuse
 */

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

// In-memory storage (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export class RateLimiter {
  constructor(private config: RateLimitConfig) {}

  /**
   * Check if request should be rate limited
   */
  check(identifier: string): RateLimitResult {
    const now = Date.now();
    const resetTime = now + this.config.windowMs;

    // Get or create entry
    let entry = rateLimitStore.get(identifier);

    if (!entry || now > entry.resetTime) {
      entry = { count: 0, resetTime };
      rateLimitStore.set(identifier, entry);
    }

    // Increment count
    entry.count++;

    // Calculate remaining
    const remaining = Math.max(this.config.maxRequests - entry.count, 0);

    // Check if limit exceeded
    const success = entry.count <= this.config.maxRequests;

    return {
      success,
      limit: this.config.maxRequests,
      remaining,
      reset: entry.resetTime,
    };
  }

  /**
   * Reset rate limit for identifier
   */
  reset(identifier: string): void {
    rateLimitStore.delete(identifier);
  }

  /**
   * Clean up expired entries
   */
  static cleanup(): void {
    const now = Date.now();
    for (const [identifier, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(identifier);
      }
    }
  }
}

/**
 * Create rate limiter for API routes
 */
export function createRateLimiter(config: RateLimitConfig): RateLimiter {
  return new RateLimiter(config);
}

/**
 * Common rate limit configurations
 */
export const RATE_LIMIT_CONFIGS = {
  // Strict: 5 requests per minute
  strict: {
    windowMs: 60 * 1000,
    maxRequests: 5,
  },
  // Standard: 10 requests per minute
  standard: {
    windowMs: 60 * 1000,
    maxRequests: 10,
  },
  // Lenient: 100 requests per hour
  lenient: {
    windowMs: 60 * 60 * 1000,
    maxRequests: 100,
  },
  // Auth: 5 requests per login attempt
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
  },
};

/**
 * Get rate limit headers
 */
export function getRateLimitHeaders(
  result: RateLimitResult,
): Record<string, string> {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": new Date(result.reset).toISOString(),
  };
}

/**
 * Middleware wrapper for rate limiting
 */
export function withRateLimit<
  T extends (...args: unknown[]) => Promise<unknown>,
>(
  handler: T,
  config: RateLimitConfig,
  getIdentifier: (...args: Parameters<T>) => string,
): T {
  const limiter = createRateLimiter(config);

  return (async (...args: Parameters<T>) => {
    const identifier = getIdentifier(...args);
    const result = limiter.check(identifier);

    if (!result.success) {
      const error = new Error("Rate limit exceeded");
      const errorWithStatus = error as Error & {
        statusCode?: number;
        headers?: Record<string, string>;
      };
      errorWithStatus.statusCode = 429;
      errorWithStatus.headers = getRateLimitHeaders(result);
      throw errorWithStatus;
    }

    const response = await handler(...args);

    // Add rate limit headers to response
    if (response && typeof response === "object" && "headers" in response) {
      Object.assign(
        response.headers as Record<string, unknown>,
        getRateLimitHeaders(result),
      );
    }

    return response;
  }) as T;
}

// Cleanup expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => RateLimiter.cleanup(), 5 * 60 * 1000);
}
