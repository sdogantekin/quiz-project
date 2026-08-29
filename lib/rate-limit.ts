/**
 * Truncates `now` down to the start of its fixed window, e.g. with a
 * 600s (10 min) window, 10:07:32 and 10:09:58 both map to 10:00:00.
 *
 * Pure and DB-free on purpose, unlike `checkRateLimit` in
 * `lib/rate-limit-db.ts` - keeps this testable without a database
 * connection string.
 */
export function getWindowStart(now: Date, windowSeconds: number): Date {
  const windowMs = windowSeconds * 1000;
  return new Date(Math.floor(now.getTime() / windowMs) * windowMs);
}

/** Best-effort client IP from the headers Vercel sets on incoming requests. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
