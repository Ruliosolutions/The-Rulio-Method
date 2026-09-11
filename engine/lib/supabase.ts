/**
 * Supabase clients.
 *
 * Two clients:
 * 1. `supabase` — anon / publishable key, safe to ship to the browser.
 * 2. `supabaseAdmin` — service / secret key, server-only.
 *
 * Supports both the new Supabase key format (sb_publishable_/sb_secret_)
 * and the legacy JWT format (eyJ...anon/service_role).
 *
 * The service / secret key never leaves the server.
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";

// Accept either the new publishable key (sb_publishable_*) or the legacy anon JWT
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ?? process.env.SUPABASE_PUBLISHABLE_KEY
  ?? "placeholder-anon";

// Accept either the new secret key (sb_secret_*) or the legacy service_role JWT
const service = process.env.SUPABASE_SERVICE_ROLE_KEY
  ?? process.env.SUPABASE_SECRET_KEY
  ?? "placeholder-service";

export const supabase = createClient(url, anon, {
  auth: { persistSession: false },
  global: {
    fetch: (input, init) => {
      // 30s timeout, more retries, in case Vercel's edge takes a moment
      return fetch(input, { ...init, signal: AbortSignal.timeout(30_000) });
    },
  },
});

export const supabaseAdmin = createClient(url, service, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: {
    fetch: (input, init) => {
      return fetch(input, { ...init, signal: AbortSignal.timeout(30_000) });
    },
  },
});
