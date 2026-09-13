/**
 * /welcome
 *
 * The post-magic-link landing page. The user lands here after a successful
 * sign-in. We show:
 *   - Their trial status (7 days remaining)
 *   - A "what to do first" guide
 *   - The 14 Qi sessions, with the most relevant 3 surfaced
 *   - A "manage subscription" button
 */

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

const MANIFEST_URL = "https://apkeal8qeqnc0.space.minimax.io/manifest.json";

async function getSession() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
  );
  const { data } = await supabase.auth.getUser();
  return data.user;
}

async function getSubscriptionStatus(userId: string) {
  const { data } = await supabaseAdmin
    .from("user_subscription_status")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data;
}

async function getTrialStatus(userId: string) {
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("trial_started_at, trial_ends_at, trial_converted")
    .eq("id", userId)
    .single();
  return profile;
}

async function getManifest() {
  const res = await fetch(MANIFEST_URL, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return res.json() as Promise<{
    sessions: Array<{
      id: string;
      title: string;
      length_min: number;
      brainwave_band: string;
      instruction: string;
      filename: string;
    }>;
  }>;
}

export default async function WelcomePage() {
  const user = await getSession();
  if (!user) {
    return (
      <main className="min-h-screen bg-[#0c0c0e] text-[#f4f1ea] grid place-items-center">
        <div className="text-center">
          <p className="text-[#a1a1aa] mb-4">You're not signed in.</p>
          <a href="/pro" className="text-[#8FD1FF] hover:underline">Start a free trial →</a>
        </div>
      </main>
    );
  }

  const [status, trial, manifest] = await Promise.all([
    getSubscriptionStatus(user.id),
    getTrialStatus(user.id),
    getManifest(),
  ]);

  const hasProAccess = status?.has_pro_access ?? false;
  const currentPlan = status?.current_plan ?? "free";
  const trialDaysRemaining = trial?.trial_ends_at
    ? Math.max(0, Math.ceil((new Date(trial.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const recommendedSessions = manifest?.sessions?.filter((s) =>
    ["01-sleep", "03-morning-reset", "05-focus"].includes(s.id)
  ) ?? [];

  return (
    <main className="min-h-screen bg-[#0c0c0e] text-[#f4f1ea] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa] mb-3">
          /welcome · you're in
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-3">
          Hey {user.email?.split("@")[0]}.
        </h1>
        <p className="text-[#a1a1aa] text-lg mb-8">
          {hasProAccess
            ? trialDaysRemaining > 0
              ? `Your free trial is active — ${trialDaysRemaining} day${trialDaysRemaining === 1 ? "" : "s"} remaining. Headphones on. Pick a session.`
              : `You're on the ${currentPlan.replace("_", " ")} plan. Pick a session.`
            : "Your trial ended. Subscribe to keep Pro features."}
        </p>

        {/* Trial banner */}
        {hasProAccess && trialDaysRemaining > 0 && (
          <div className="bg-[#5BB8FF]/10 border border-[#5BB8FF] rounded-2xl p-5 mb-8 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#8FD1FF] mb-1">Free trial</p>
              <p className="text-sm">
                <strong className="text-white">{trialDaysRemaining} day{trialDaysRemaining === 1 ? "" : "s"}</strong> of Engine Pro remaining · no card on file
              </p>
            </div>
            <a href="/pro" className="px-4 py-2 bg-[#5BB8FF] text-[#0c0c0e] font-semibold rounded-full text-sm hover:bg-[#8FD1FF] transition">
              Upgrade now →
            </a>
          </div>
        )}

        {/* Recommended sessions */}
        <h2 className="font-serif text-2xl font-light mb-4">Start here</h2>
        <div className="grid gap-3 mb-8">
          {recommendedSessions.map((s) => (
            <a
              key={s.id}
              href="/qi"
              className="block bg-white/3 border border-white/10 rounded-xl p-4 hover:border-[#5BB8FF] transition"
            >
              <h3 className="font-serif text-lg">{s.title}</h3>
              <p className="text-sm text-[#a1a1aa] mt-1">{s.instruction}</p>
              <p className="font-mono text-[10px] text-[#a1a1aa] mt-2">
                {s.brainwave_band} · {s.length_min} min
              </p>
            </a>
          ))}
        </div>

        {/* Browse all 14 sessions */}
        <div className="flex gap-3 flex-wrap mb-12">
          <a href="/qi" className="px-5 py-2.5 rounded-full bg-white text-[#0c0c0e] font-semibold text-sm hover:bg-zinc-200 transition">
            All 14 sessions →
          </a>
          <a href="/play/sleep" className="px-5 py-2.5 rounded-full border border-white/15 text-sm hover:border-white/30 transition">
            Try the Sleep preset
          </a>
          {!hasProAccess && (
            <a href="/pro" className="px-5 py-2.5 rounded-full border border-[#5BB8FF] text-[#8FD1FF] text-sm">
              Upgrade to Engine Pro →
            </a>
          )}
        </div>

        {/* Account section */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <h2 className="font-serif text-2xl font-light mb-4">Account</h2>
          <p className="text-sm text-[#a1a1aa] mb-4">
            Signed in as <strong className="text-white">{user.email}</strong>
          </p>
          <div className="flex flex-wrap gap-3">
            {hasProAccess && currentPlan !== "free" && (
              <form action="/api/billing/portal" method="POST">
                <button type="submit" className="px-4 py-2 rounded-full border border-white/15 text-sm hover:border-white/30 transition">
                  Manage billing
                </button>
              </form>
            )}
            <a href="mailto:hello@rulio.io" className="px-4 py-2 rounded-full border border-white/15 text-sm hover:border-white/30 transition">
              Contact support
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
