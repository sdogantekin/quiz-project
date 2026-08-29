import { sql } from "./db";
import { getWindowStart } from "./rate-limit";

type RateLimitOptions = {
  windowSeconds: number;
  maxRequests: number;
};

/**
 * Atomically increments a per-(key, window) counter in Postgres and reports
 * whether this request is still within the limit. Fixed-window, not
 * sliding-window - simple, and good enough at this project's scale.
 */
export async function checkRateLimit(
  key: string,
  { windowSeconds, maxRequests }: RateLimitOptions
): Promise<{ allowed: boolean; count: number }> {
  const windowStart = getWindowStart(new Date(), windowSeconds);

  const rows = await sql`
    INSERT INTO rate_limits (key, window_start, count)
    VALUES (${key}, ${windowStart.toISOString()}, 1)
    ON CONFLICT (key, window_start)
    DO UPDATE SET count = rate_limits.count + 1
    RETURNING count
  `;

  const count = (rows[0]?.count as number) ?? 1;
  return { allowed: count <= maxRequests, count };
}
