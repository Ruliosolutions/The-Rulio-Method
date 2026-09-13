/**
 * PostHog client for the Rulio Engine.
 *
 * PostHog is used for:
 *  - Server-side event tracking (workshop checkout, audit registration)
 *  - Web vitals + custom events (when wired into the front-end)
 *
 * Two clients:
 *  1. `posthog` (Node) — for server-side events
 *  2. PostHog JS (browser) — see <PostHogProvider> in app/layout.tsx
 *
 * Self-hosting in EU: https://posthog.com/docs/self-host
 * Cloud (US): https://app.posthog.com
 *
 * Env vars:
 *   POSTHOG_API_KEY       — project API key
 *   POSTHOG_HOST          — https://eu.i.posthog.com (EU) or https://app.posthog.com
 *   NEXT_PUBLIC_POSTHOG_KEY
 *   NEXT_PUBLIC_POSTHOG_HOST
 */

import { PostHog } from "posthog-node";

const apiKey = process.env.POSTHOG_API_KEY;
const host = process.env.POSTHOG_HOST ?? "https://eu.i.posthog.com";

export const posthog = apiKey
  ? new PostHog(apiKey, { host })
  : null;

if (!apiKey) {
  console.warn(
    "[posthog] POSTHOG_API_KEY is not set. Server-side analytics disabled."
  );
}

/**
 * Server-side event capture. Fire-and-forget — never blocks the request.
 */
export function trackServer(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>
) {
  if (!posthog) return;
  posthog.capture({
    distinctId,
    event,
    properties,
    timestamp: new Date(),
  });
}

/**
 * Identify a user (e.g. after a workshop registration or audit booking).
 * Stores the same `distinctId` across server + browser events.
 */
export function identifyServer(
  distinctId: string,
  properties: Record<string, unknown>
) {
  if (!posthog) return;
  posthog.identify({ distinctId, properties });
}

// Flush every 5s — call this in serverless cold-start handlers
setInterval(() => {
  if (posthog) posthog.flush();
}, 5000).unref();
