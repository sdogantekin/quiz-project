import { track as vercelTrack } from "@vercel/analytics";

export const EVENT_NAMES = [
  "quiz_started",
  "quiz_completed",
  "email_submitted",
  "share_clicked",
  "quiz_retaken",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

export function isValidEventName(name: string): name is EventName {
  return (EVENT_NAMES as readonly string[]).includes(name);
}

/**
 * Sends an event to Vercel Analytics (works once the project is on a Pro
 * team) and to our own `/api/track` endpoint (works today, on any plan).
 */
export function trackEvent(name: EventName, properties?: Record<string, string>) {
  vercelTrack(name, properties);

  try {
    const body = JSON.stringify({ name, properties });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/track",
        new Blob([body], { type: "application/json" })
      );
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch {
    // Tracking should never break the app for the visitor.
  }
}
