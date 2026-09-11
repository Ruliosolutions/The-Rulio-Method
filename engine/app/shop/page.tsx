/**
 * /shop — direct-purchase digital products.
 *
 * Stripe Payment Links (LIVE mode). No login required.
 * One-click checkout, files delivered to inbox automatically.
 *
 * This is the shortest money path: Etsy (separate) + branded direct sales (here).
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rulio Shop — Solfeggio Tools & Audio Packs",
  description:
    "Direct download. 9 solfeggio cards, qi practice log, the 30-page ebook, and 14 audio sessions. No subscription required.",
};

const PRODUCTS = [
  {
    name: "9 Solfeggio Frequency Cards",
    price: "€9",
    tag: "Printable PDF",
    desc: "A5 + US Letter. 9 cards, 9 frequencies, one use case each. Tape them to your desk, pick one before your worst hour.",
    cta: "https://buy.stripe.com/3cIeVdbq53qS9cKgx4dwc02",
    best: false,
  },
  {
    name: "7-Day Qi Practice Log",
    price: "€7",
    tag: "Printable PDF",
    desc: "Track 5-minute sessions for a week. Columns: day, time, frequency, state before, state after, what you noticed.",
    cta: "https://buy.stripe.com/8x2aEX2Tz2mO2Om94Cdwc04",
    best: false,
  },
  {
    name: "Rulio Qi Method (ebook)",
    price: "€19",
    tag: "30+ page PDF",
    desc: "The full 5-minute solfeggio protocol. Why it works, when to use each frequency, the 7-day reset, and the honest caveats.",
    cta: "https://buy.stripe.com/6oU5kD3XDbXocoW6Wudwc01",
    best: false,
  },
  {
    name: "14-Day Solfeggio Audio Pack",
    price: "€29",
    tag: "110 min · 14 MP3s",
    desc: "12 free 5-min sessions + 2 extended 25-min deep-work sessions. 174, 285, 396, 417, 528, 639, 741, 852, 963 Hz. Stereo only.",
    cta: "https://buy.stripe.com/5kQ9ATfGl3qSgFc3Kidwc00",
    best: false,
  },
  {
    name: "Complete Rulio Bundle",
    price: "€49",
    originalPrice: "€64",
    tag: "Save €15 · 40% off buying solo",
    desc: "All 4 products in one zip. Cards, log, ebook, and 14 audio sessions. The full 5-minute protocol toolkit.",
    cta: "https://buy.stripe.com/dRmfZh79P2mOfB8a8Gdwc03",
    best: true,
  },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0e] text-white">
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <p className="text-xs tracking-widest uppercase text-[#5BB8FF] mb-3">
          Rulio Shop · Direct downloads
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          The 5-minute solfeggio toolkit.
        </h1>
        <p className="text-lg text-[#a1a1aa] max-w-2xl">
          No subscription. Buy what you need, download it, use it tonight.
          Not a medical device, not a treatment — a practice tool.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCTS.map((p) => (
            <a
              key={p.name}
              href={p.cta}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block rounded-xl border p-6 transition-all hover:border-[#5BB8FF]/60 ${
                p.best
                  ? "border-[#5BB8FF] bg-gradient-to-br from-[#0c0c0e] to-[#0c1822]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-[10px] tracking-widest uppercase px-2 py-1 rounded ${
                    p.best
                      ? "bg-[#5BB8FF]/20 text-[#8FD1FF]"
                      : "bg-white/5 text-[#a1a1aa]"
                  }`}
                >
                  {p.tag}
                </span>
                {p.best && (
                  <span className="text-[10px] tracking-widest uppercase text-[#5BB8FF]">
                    Most popular
                  </span>
                )}
              </div>
              <h2 className="text-xl font-medium mb-2">{p.name}</h2>
              <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4 min-h-[3.5em]">
                {p.desc}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-light">{p.price}</span>
                  {p.originalPrice && (
                    <span className="text-sm text-[#a1a1aa] line-through">
                      {p.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-sm text-[#5BB8FF] group-hover:translate-x-1 transition-transform">
                  Buy →
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <h3 className="text-sm tracking-widest uppercase text-[#a1a1aa] mb-2">
            What you get after checkout
          </h3>
          <ul className="text-sm text-[#F4F1EA] space-y-1">
            <li>· Secure payment via Stripe (cards, Apple Pay, Google Pay)</li>
            <li>· Instant download links sent to your email</li>
            <li>· No account, no subscription, no spam</li>
            <li>· Lifetime access to your files</li>
          </ul>
        </div>

        <p className="text-xs text-[#a1a1aa] mt-8 text-center max-w-2xl mx-auto">
          Not a medical device. Not a treatment for any condition. Solfeggio
          frequencies are a relaxation and focus tool, used the same way music
          is used. If you have a serious condition, see a professional.
        </p>

        <p className="text-xs text-[#a1a1aa] mt-4 text-center">
          Want the adaptive experience?{" "}
          <a href="/pro" className="text-[#5BB8FF] hover:underline">
            Try Engine Pro free for 7 days →
          </a>
        </p>

        <div className="mt-20">
          <h3 className="text-xs tracking-widest uppercase text-[#a1a1aa] text-center mb-6">
            What people notice
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
              <p className="text-sm leading-relaxed text-[#F4F1EA] mb-3">
                "I run the 3 PM protocol on days with back-to-back calls. 528Hz for 5 minutes. I stop drifting."
              </p>
              <cite className="text-xs text-[#a1a1aa] not-italic">— Marta, founder, Lisbon</cite>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
              <p className="text-sm leading-relaxed text-[#F4F1EA] mb-3">
                "The cards live on my desk. Pick a frequency by feel, not by thinking."
              </p>
              <cite className="text-xs text-[#a1a1aa] not-italic">— Jonas, eng manager, Berlin</cite>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
              <p className="text-sm leading-relaxed text-[#F4F1EA] mb-3">
                "Skeptical on day 1. By day 4 I noticed the 4 PM wall didn't happen."
              </p>
              <cite className="text-xs text-[#a1a1aa] not-italic">— Priya, PM, London</cite>
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 rounded-2xl border border-[#5BB8FF]/30 bg-gradient-to-br from-[#5BB8FF]/[0.08] to-[#8FD1FF]/[0.04] text-center">
          <h3 className="font-serif text-2xl font-light mb-2">Not ready to buy?</h3>
          <p className="text-sm text-[#a1a1aa] mb-6 max-w-md mx-auto">
            Get the 5-minute solfeggio protocol — the same one I use — by email. Free.
          </p>
          <form
            action="https://rulio.substack.com/subscribe"
            method="GET"
            target="_blank"
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="you@work.email"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#5BB8FF]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[#5BB8FF] text-[#0c0c0e] font-semibold text-sm hover:opacity-90 transition"
            >
              Send it →
            </button>
          </form>
          <p className="text-xs text-[#a1a1aa] mt-4">
            Free 5-min solfeggio protocol by email. No spam.
          </p>
        </div>
      </section>
    </main>
  );
}
