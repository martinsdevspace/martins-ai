import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Rate limiting for `/api/chat`.
 *
 * In production this is backed by Upstash Redis so the counters are shared
 * across every serverless/multi-instance deployment (an in-memory counter
 * would be per-instance, making the real limit N × instance count and
 * resetting on every cold start). Two tiers guard the endpoint:
 *
 * - A per-IP sliding window (burst) plus a per-IP daily cap, so a single
 *   visitor can't hammer the endpoint or burn through a day's budget.
 * - A global sliding window, so even distributed abuse (rotated IPs /
 *   bots) can't consume an unbounded amount of model spend.
 *
 * If the Upstash credentials aren't set in production, we fall back to an
 * in-memory limiter rather than running unlimited. That's weaker (per
 * instance, resets on cold start) but still far better than nothing, and a
 * one-time warning is logged so the misconfiguration is visible.
 *
 * In development, `checkRateLimit` always allows the request — local dev is
 * one person testing, often re-running the same message repeatedly, and a
 * limiter there just gets in the way.
 *
 * Requires `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (from an
 * Upstash Redis database — https://console.upstash.com).
 */

const PER_IP_LIMIT = 20
const PER_IP_WINDOW = '10 m'
const DAILY_LIMIT = 300
const DAILY_WINDOW = '1 d'
const GLOBAL_LIMIT = 500
const GLOBAL_WINDOW = '10 m'

export type RateLimitResult = {
  limited: boolean
  retryAfter?: number
}

type Limiters = {
  perIp: Ratelimit | null
  daily: Ratelimit | null
  global: Ratelimit | null
}

let limiters: Limiters | undefined // undefined = not yet initialized
let memoryWarned = false

function getLimiters(): Limiters {
  if (limiters !== undefined) return limiters

  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    if (!memoryWarned) {
      console.warn(
        '[rate-limit] UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN not set — falling back to in-memory limiting (per-instance only, resets on cold start).',
      )
      memoryWarned = true
    }
    limiters = { perIp: null, daily: null, global: null }
    return limiters
  }

  const redis = new Redis({ url, token })
  limiters = {
    perIp: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(PER_IP_LIMIT, PER_IP_WINDOW),
      prefix: 'ratelimit:chat:ip',
    }),
    daily: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(DAILY_LIMIT, DAILY_WINDOW),
      prefix: 'ratelimit:chat:day',
    }),
    global: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(GLOBAL_LIMIT, GLOBAL_WINDOW),
      prefix: 'ratelimit:chat:global',
    }),
  }

  return limiters
}

/**
 * Extracts the client IP from a request, preferring the platform-set
 * `x-real-ip` header and otherwise the first hop of `x-forwarded-for`.
 * Returns `'unknown'` when neither is present so rate limiting still
 * applies (everybody shares the same key rather than nobody being limited).
 */
export function getClientIp(req: Request): string {
  const realIp = req.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp.slice(0, 64)

  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first.slice(0, 64)
  }

  return 'unknown'
}

/** Exact sliding-window counter for the no-Upstash fallback. */
class MemorySlidingWindow {
  private hits = new Map<string, number[]>()

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
  ) {}

  check(key: string): { success: boolean; retryAfter: number } {
    const now = Date.now()
    const cutoff = now - this.windowMs
    const timestamps = (this.hits.get(key) ?? []).filter((t) => t > cutoff)

    if (timestamps.length >= this.limit) {
      const retryAfter = Math.ceil((timestamps[0] + this.windowMs - now) / 1000)
      this.hits.set(key, timestamps)
      return { success: false, retryAfter: Math.max(retryAfter, 1) }
    }

    timestamps.push(now)
    this.hits.set(key, timestamps)
    return { success: true, retryAfter: 0 }
  }
}

const memoryPerIp = new MemorySlidingWindow(PER_IP_LIMIT, 10 * 60 * 1000)
const memoryDaily = new MemorySlidingWindow(DAILY_LIMIT, 24 * 60 * 60 * 1000)
const memoryGlobal = new MemorySlidingWindow(GLOBAL_LIMIT, 10 * 60 * 1000)

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  if (process.env.NODE_ENV !== 'production') {
    return { limited: false }
  }

  const { perIp, daily, global } = getLimiters()

  if (perIp && daily && global) {
    const [ipResult, dayResult, globalResult] = await Promise.all([
      perIp.limit(identifier),
      daily.limit(identifier),
      global.limit('all'),
    ])

    let retryAfter = 0
    for (const result of [ipResult, dayResult, globalResult]) {
      if (!result.success && result.reset) {
        retryAfter = Math.max(retryAfter, Math.ceil((result.reset - Date.now()) / 1000))
      }
    }

    return { limited: retryAfter > 0, retryAfter: retryAfter > 0 ? Math.max(retryAfter, 1) : undefined }
  }

  const ipCheck = memoryPerIp.check(identifier)
  const dayCheck = memoryDaily.check(identifier)
  const globalCheck = memoryGlobal.check('all')

  const retryAfter = Math.max(ipCheck.retryAfter, dayCheck.retryAfter, globalCheck.retryAfter)
  return { limited: retryAfter > 0, retryAfter: retryAfter > 0 ? retryAfter : undefined }
}
