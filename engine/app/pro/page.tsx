/**
 * /pro — the self-serve Engine Pro page.
 *
 * The new front door for the Rulio funnel. Three tiers, one click to
 * start a 7-day free trial. Magic-link auth (no password). Card only
 * required after the trial.
 *
 * This replaces the workshop-first funnel for the bulk of subscribers.
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_BASE = "";

export default function ProPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startTrial(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(API_BASE + "/api/auth/magic-link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: email.split("@")[0],
          referrer: document.referrer || "direct",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSent(true);
      setSubmitting(false);
    } catch (err) {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <main className="min-h-screen bg-[#0c0c0e] text-[#f4f1ea] px-6 py-20">
        <div className="max-w-xl mx-auto text-center">
          <div className="text-6xl mb-6">📬</div>
          <h1 className="font-serif text-4xl font-light tracking-tight mb-4">
            Check your email.
          </h1>
          <p className="text-[#a1a1aa] mb-8">
            We sent a sign-in link to <strong className="text-white">{email}</strong>.
            Click it to start your 7-day free trial. The link expires in 1 hour.
          </p>
          <p className="text-xs text-[#a1a1aa]">
            Didn't get it? Check spam, or{" "}
            <button
              onClick={() => setSent(false)}
              className="text-[#8FD1FF] underline"
            >
              try again
            </button>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0c0e] text-[#f4f1ea] px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa] mb-3">
          /pro · self-serve
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-4">
          Three tiers. Pick one.
        </h1>
        <p className="text-[#a1a1aa] text-lg max-w-2xl mb-12">
          Start with a 7-day free trial. No card required. The AI coach and
          the 25-min extended sessions unlock the moment you sign in.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {/* FREE */}
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa] mb-2">Free</p>
            <p className="font-serif text-3xl mb-1">€0</p>
            <p className="font-mono text-[10px] text-[#a1a1aa] mb-6">forever, no signup</p>
            <ul className="space-y-2 text-sm text-[#a1a1aa] mb-6">
              <li>✓ 14 Qi sessions</li>
              <li>✓ No card required</li>
              <li>✓ No account required</li>
              <li className="text-[#666]">— AI coach</li>
              <li className="text-[#666]">— Custom sessions</li>
              <li className="text-[#666]">— 25-min extended</li>
            </ul>
            <a href="https://rulio.app/qi" className="block w-full text-center px-4 py-2 rounded-full border border-white/15 text-sm hover:border-white/30 transition">
              Play 14 free sessions →
            </a>
          </div>

          {/* ENGINE PRO — FEATURED */}
          <div className="bg-[#5BB8FF]/5 border border-[#5BB8FF] rounded-2xl p-6 relative">
            <div className="absolute -top-3 left-6 px-3 py-1 bg-[#5BB8FF] text-[#0c0c0e] text-[10px] font-mono uppercase tracking-widest rounded-full">Most popular</div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#8FD1FF] mb-2">Engine Pro</p>
            <p className="font-serif text-3xl mb-1">€19<span className="text-base text-[#a1a1aa]">/mo</span></p>
            <p className="font-mono text-[10px] text-[#a1a1aa] mb-6">or €180/yr (save €48)</p>
            <ul className="space-y-2 text-sm mb-6">
              <li>✓ Everything in Free</li>
              <li>✓ AI coach (state-to-session)</li>
              <li>✓ Custom session generator</li>
              <li>✓ 25-min extended (Focus, Deep Work)</li>
              <li>✓ Daily-rhythm scheduler</li>
              <li>✓ No ads, no limits</li>
              <li>✓ Cancel anytime</li>
            </ul>
            <p className="font-mono text-[10px] text-[#8FD1FF] mb-2 text-center">7-day free trial · no card required</p>
          </div>

          {/* STUDIO */}
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa] mb-2">Studio</p>
            <p className="font-serif text-3xl mb-1">€2,000<span className="text-base text-[#a1a1aa]">/mo</span></p>
            <p className="font-mono text-[10px] text-[#a1a1aa] mb-6">application only</p>
            <ul className="space-y-2 text-sm text-[#a1a1aa] mb-6">
              <li>✓ Everything in Engine Pro</li>
              <li>✓ Monthly 1:1 with Roel</li>
              <li>✓ Custom protocol refinement</li>
              <li>✓ White-glove setup</li>
              <li>✓ Priority support</li>
              <li>✓ Direct Slack channel</li>
            </ul>
            <a href="mailto:hello@rulio.io?subject=Studio%20application" className="block w-full text-center px-4 py-2 rounded-full border border-white/15 text-sm hover:border-white/30 transition">
              Apply →
            </a>
          </div>
        </div>

        {/* TRIAL FORM */}
        <div className="max-w-md mx-auto bg-white/3 border border-[#5BB8FF] rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-light mb-2">Start your free trial</h2>
          <p className="text-sm text-[#a1a1aa] mb-6">
            Enter your email. We'll send a sign-in link. No card, no password.
          </p>
          <form onSubmit={startTrial} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourco.com"
              required
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-center"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#5BB8FF] text-[#0c0c0e] font-semibold rounded-full py-3 hover:bg-[#8FD1FF] transition disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Start free trial →"}
            </button>
            {error && <p className="text-sm text-amber-300">{error}</p>}
          </form>
          <p className="text-[10px] text-[#a1a1aa] mt-4 font-mono">
            By signing in you agree to our terms and the standard data policy.
            We never sell your data. We never email you anything you didn't ask for.
          </p>
        </div>

        <p className="text-center text-xs text-[#a1a1aa] mt-12">
          Have a question? <a href="mailto:hello@rulio.io" className="text-[#8FD1FF] hover:underline">hello@rulio.io</a>
        </p>
      </div>
    </main>
  );
}
