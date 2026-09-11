/**
 * /workshop — the Energy Reset Workshop registration page
 *
 * This is the Next.js version of the static dist-workshop/index.html.
 * The form posts to /api/workshop/checkout which creates a Stripe
 * Checkout session and redirects the user to Stripe's hosted page.
 *
 * The static form at pco15d54mf3fb.space.minimax.io is the fallback
 * when the engine isn't deployed.
 */

"use client";

import { useEffect, useState } from "react";

type Capacity = {
  date: string;
  capacity: number;
  booked: number;
  remaining: number;
  soldOut: boolean;
};

const API_BASE = ""; // same-origin

export default function WorkshopPage() {
  const [cap, setCap] = useState<Capacity | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sku, setSku] = useState("workshop-standard");

  useEffect(() => {
    fetch(`${API_BASE}/api/workshop/capacity`)
      .then((r) => r.json())
      .then((d) => setCap(d))
      .catch(() => setCap(null));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const body = {
      sku: fd.get("sku"),
      email: fd.get("email"),
      firstName: fd.get("firstName"),
      gumroadReceipt: fd.get("gumroadReceipt") || undefined,
      worstState: fd.get("worstState") || undefined,
    };

    try {
      const res = await fetch(`${API_BASE}/api/workshop/checkout`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 410) {
          setError("Sold out. Join the waitlist and we'll email you when seats open.");
        } else {
          setError(data.error ?? "Something went wrong. Please try again.");
        }
        setSubmitting(false);
        return;
      }
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0c0c0e] text-[#f4f1ea] px-6 py-16">
      <div className="max-w-xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa] mb-3">
          Energy Reset · Next.js
        </p>
        <h1 className="font-serif text-4xl font-light tracking-tight mb-4">
          Register for the next cohort
        </h1>
        <p className="text-[#a1a1aa] text-sm mb-6">
          {cap ? (
            <>
              <strong className="text-[#f4f1ea]">{cap.date}</strong> ·{" "}
              {cap.remaining > 0
                ? `${cap.remaining} of ${cap.capacity} seats left`
                : <span className="text-amber-300">Sold out — waitlist only</span>}
            </>
          ) : (
            "Loading capacity..."
          )}
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-1">Name</label>
              <input id="firstName" name="firstName" type="text" required
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-1">Email</label>
              <input id="email" name="email" type="email" required
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white" />
            </div>
          </div>
          <div>
            <label htmlFor="sku" className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-1">Ticket</label>
            <select id="sku" name="sku" value={sku} onChange={(e) => setSku(e.target.value)} required
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white">
              <option value="workshop-standard">Standard — €47</option>
              <option value="workshop-book">Book reader — €29</option>
              <option value="workshop-bundle">Bundle — €500</option>
            </select>
          </div>
          {sku === "workshop-book" && (
            <div>
              <label htmlFor="gumroadReceipt" className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-1">
                Gumroad receipt (order ID)
              </label>
              <input id="gumroadReceipt" name="gumroadReceipt" type="text"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white"
                placeholder="e.g. abc123-def456-..." />
            </div>
          )}
          <div>
            <label htmlFor="worstState" className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-1">
              Your worst state, in one sentence (optional)
            </label>
            <textarea id="worstState" name="worstState" rows={2}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white"
              placeholder="e.g. 3am wake-ups every night for two months" />
          </div>

          {error && (
            <div className="border border-amber-500/30 bg-amber-500/10 rounded-lg p-3 text-sm text-amber-200">
              {error}
            </div>
          )}

          <button type="submit" disabled={submitting || cap?.soldOut}
            className="w-full bg-[#5BB8FF] text-[#0c0c0e] font-semibold rounded-full py-3 hover:bg-[#8FD1FF] transition disabled:opacity-50">
            {submitting ? "Redirecting to Stripe..." : cap?.soldOut ? "Sold out — waitlist" : "Reserve my seat →"}
          </button>

          <p className="text-xs text-[#a1a1aa] text-center">
            You'll be redirected to Stripe for payment. Refund up to 24h before, no questions asked.
          </p>
        </form>

        <p className="text-xs text-[#a1a1aa] mt-8 text-center">
          <a href="/qi" className="text-[#8FD1FF] hover:underline">14 free Qi sessions</a>
          {" · "}
          <a href="/play/sleep" className="text-[#8FD1FF] hover:underline">Rulio Engine</a>
        </p>
      </div>
    </main>
  );
}
