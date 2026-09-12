/**
 * /account
 *
 * The user's account page. Shows:
 *   - Email, name, member since
 *   - Current plan (Free / Pro / Studio) + status
 *   - Trial status (X days remaining)
 *   - Usage this month (sessions played)
 *   - Manage billing button → Stripe Customer Portal
 *   - Sign out
 */

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase";
import { signOut } from "./actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
  );
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-[#0c0c0e] text-[#f4f1ea] grid place-items-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-3xl font-light mb-3">Not signed in</h1>
          <p className="text-[#a1a1aa] mb-6">Sign in to manage your account.</p>
          <a href="/pro" className="text-[#8FD1FF] hover:underline">Start a free trial →</a>
        </div>
      </main>
    );
  }

  // Load profile + subscription status + usage in parallel
  const [{ data: profile }, { data: status }, { count: sessionsThisMonth }] = await Promise.all([
    supabaseAdmin.from("profiles").select("*").eq("id", user.id).single(),
    supabaseAdmin.from("user_subscription_status").select("*").eq("user_id", user.id).single(),
    supabaseAdmin.from("sessions_log").select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
  ]);

  const currentPlan = status?.current_plan ?? "free";
  const hasProAccess = status?.has_pro_access ?? false;
  const trialDaysRemaining = profile?.trial_ends_at
    ? Math.max(0, Math.ceil((new Date(profile.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  const planLabel = (
    {
      free: "Free",
      engine_pro_monthly: "Engine Pro · Monthly",
      engine_pro_annual: "Engine Pro · Annual",
      studio_monthly: "Studio",
    } as Record<string, string>
  )[currentPlan] ?? currentPlan;

  return (
    <main className="min-h-screen bg-[#0c0c0e] text-[#f4f1ea] px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa] mb-3">/account</p>
        <h1 className="font-serif text-4xl font-light tracking-tight mb-8">Your account</h1>

        {/* Identity */}
        <div className="bg-white/3 border border-white/10 rounded-2xl p-6 mb-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa] mb-2">Identity</p>
          <p className="text-lg"><strong>{profile?.first_name ?? "—"}</strong></p>
          <p className="text-sm text-[#a1a1aa]">{user.email}</p>
          <p className="text-xs text-[#666] mt-2 font-mono">Member since {memberSince}</p>
        </div>

        {/* Plan */}
        <div className="bg-white/3 border border-white/10 rounded-2xl p-6 mb-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa] mb-2">Plan</p>
          <div className="flex items-baseline justify-between mb-3">
            <p className="font-serif text-2xl">{planLabel}</p>
            {!hasProAccess && currentPlan === "free" && (
              <a href="/pro" className="text-sm text-[#8FD1FF] hover:underline">Upgrade →</a>
            )}
          </div>

          {/* Trial status */}
          {hasProAccess && trialDaysRemaining > 0 && !profile?.trial_converted && (
            <div className="bg-[#5BB8FF]/10 border border-[#5BB8FF] rounded-lg p-3 text-sm">
              <strong className="text-white">{trialDaysRemaining} day{trialDaysRemaining === 1 ? "" : "s"}</strong> of free trial remaining · no card on file
            </div>
          )}

          {!hasProAccess && profile?.trial_converted === false && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm text-amber-200">
              Trial ended. <a href="/pro" className="underline">Subscribe to keep Pro features</a>.
            </div>
          )}

          {currentPlan !== "free" && (
            <div className="mt-4 flex flex-wrap gap-2">
              <form action="/api/billing/portal" method="POST">
                <button type="submit" className="px-4 py-2 rounded-full border border-white/15 text-sm hover:border-white/30 transition">
                  Manage billing
                </button>
              </form>
              {currentPlan === "engine_pro_monthly" && (
                <form action="/api/billing/switch-to-annual" method="POST">
                  <button type="submit" className="px-4 py-2 rounded-full bg-[#5BB8FF] text-[#0c0c0e] font-semibold text-sm hover:bg-[#8FD1FF] transition">
                    Switch to annual (save €48)
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Usage this month */}
        <div className="bg-white/3 border border-white/10 rounded-2xl p-6 mb-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa] mb-2">This month</p>
          <div className="flex items-baseline gap-2">
            <p className="font-serif text-3xl">{sessionsThisMonth ?? 0}</p>
            <p className="text-sm text-[#a1a1aa]">sessions played</p>
          </div>
          {hasProAccess && (
            <p className="text-xs text-[#a1a1aa] mt-2">
              Logged automatically when you play a session.
            </p>
          )}
        </div>

        {/* Sign out */}
        <form action={signOut} className="mt-8">
          <button type="submit" className="text-sm text-[#a1a1aa] hover:text-white">
            Sign out →
          </button>
        </form>
      </div>
    </main>
  );
}
