/**
 * POST /api/sessions/log
 *
 * Logs a Qi session play to sessions_log. Used for:
 *   - Active-user billing (count MAU for white-label)
 *   - Personal usage analytics on the dashboard
 *   - PostHog events
 *
 * Body: { sessionId, brainwaveBand, source?, durationSeconds?, completed? }
 * Returns: { ok: true }
 *
 * Auth: required (must be logged in)
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase";
import { trackServer } from "@/lib/posthog";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: {
    sessionId?: string;
    brainwaveBand?: string;
    source?: string;
    durationSeconds?: number;
    completed?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { sessionId, brainwaveBand, source, durationSeconds, completed } = body;
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId required" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("sessions_log").insert({
    user_id: user.id,
    session_id: sessionId,
    brainwave_band: brainwaveBand ?? null,
    source: source ?? "engine",
    duration_seconds: durationSeconds ?? null,
    completed: completed ?? false,
  });

  if (error) {
    console.error("[sessions-log] insert failed:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  trackServer(user.email!, "session_played", {
    session_id: sessionId,
    brainwave_band: brainwaveBand,
    duration_seconds: durationSeconds,
    completed: completed ?? false,
  });

  return NextResponse.json({ ok: true });
}
