import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engine Pro — Rulio · adaptive solfeggio for focus, sleep, energy",
  description:
    "The AI coach picks the right solfeggio frequency for your worst hour. 7-day free trial, no card required.",
};

/**
 * /pro — Flash Edition.
 * Uses the design tokens from globals.css (no inline styles, no Tailwind).
 * Long-form conversion page for Engine Pro.
 */
export default function ProPage() {
  return (
    <main className="container">
      {/* === HERO === */}
      <section className="hero light-sweep">
        <span className="eyebrow"><span className="dot-pulse" /> Engine Pro · adaptive audio</span>
        <h1 className="hero-title">
          The 3 PM wall.<br />
          <span className="accent">Engineered out.</span>
        </h1>
        <p className="lede">
          Engine Pro picks the right solfeggio frequency for whatever hour of the day breaks your focus.
          7-day free trial, no card required. €19/mo or €180/yr after.
        </p>
        <form className="pro-form" action="/api/auth/magic-link" method="POST">
          <input
            type="email"
            name="email"
            placeholder="you@work.email"
            required
            className="pro-input"
          />
          <button type="submit" className="btn btn-primary">
            Start free trial →
          </button>
        </form>
        <p style={{ fontSize: 11, color: "var(--on-surface-variant)", marginTop: 12, fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.15em" }}>
          7 DAYS FREE · NO CARD · CANCEL ANYTIME
        </p>
      </section>

      {/* === FEATURES GRID === */}
      <section className="section">
        <div className="section-header">
          <h2>What's in Engine Pro.</h2>
          <p>8 things the free tier doesn't have. All designed around one question: "which frequency do I play right now?"</p>
        </div>

        <div className="grid">
          {[
            { tag: "01", title: "5-min solfeggio protocol", desc: "40+ sessions across all 9 frequencies. Curated for the most common worst hours." },
            { tag: "02", title: "Adaptive AI coach", desc: "Picks the right frequency based on what hour it is, what day, and your recent usage." },
            { tag: "03", title: "Usage tracking", desc: "See your worst hour, your best session, the 5-day streak. The numbers, not the vibes." },
            { tag: "04", title: "Sleep mode", desc: "Autoplay into silence. Headphone check. Dim display. Designed for falling asleep, not staying wired." },
            { tag: "05", title: "Offline mode", desc: "Download sessions for flights, no-signal days, or anywhere your WiFi is sketchy." },
            { tag: "06", title: "Priority support", desc: "Reply within 24h. From me (Roel), not a bot. Often within an hour." },
            { tag: "07", title: "Free audio pack updates", desc: "New sessions ship automatically. Just refresh and play." },
            { tag: "08", title: "Cancel anytime", desc: "One click, no questions, no retention email loops. The protocol is the value, not the lock-in." },
          ].map((f) => (
            <article key={f.tag} className="card">
              <span className="card-tag">{f.tag}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* === THE 3 PM WALL — THE PROBLEM === */}
      <section className="section problem">
        <div className="section-header">
          <h2>The 3 PM wall.<br />Why it happens.<br />Why 5 minutes fixes it.</h2>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto", fontSize: 17, lineHeight: 1.7, color: "var(--on-surface)" }}>
          <p style={{ marginBottom: 24 }}>
            Your cortisol dips 2-3 hours after lunch. Your prefrontal cortex — the focus part — goes with it.
            You didn't lose discipline. Your brain is doing what brains do at that hour.
          </p>
          <p style={{ marginBottom: 24 }}>
            The fix isn't another coffee. It's a 5-minute audio practice that gives your brain a specific
            rhythm to lock onto. Not a 30-minute meditation. Not a 10-minute breathwork session.
            Five minutes. One frequency. Headphones on.
          </p>
          <p>
            Solfeggio frequencies have been used for this for 1,000+ years. The mechanism is simple:
            specific tones shift brainwave states toward alpha/theta, which is where relaxed focus lives.
            5 minutes of alpha gets you back online without the caffeine crash.
          </p>
        </div>
      </section>

      {/* === PRICING === */}
      <section className="section" id="pricing">
        <div className="pricing">
          <div className="section-header" style={{ marginBottom: 16 }}>
            <h2>€19/mo.<br />Cancel anytime.</h2>
            <p>Pay monthly. No commitment. Or save €48 with annual.</p>
          </div>

          <div className="pricing-grid">
            <article className="price-card">
              <div className="name">Monthly</div>
              <div className="cost">€19<small> / mo</small></div>
              <ul>
                <li>All 8 Engine Pro features</li>
                <li>7-day free trial, no card</li>
                <li>Cancel any time, no questions</li>
              </ul>
              <a href="/api/billing/checkout?plan=monthly" className="btn btn-glass" style={{ width: "100%", justifyContent: "center" }}>
                Start monthly →
              </a>
            </article>

            <article className="price-card featured">
              <div className="name" style={{ color: "var(--primary-bright)" }}>Annual · save €48</div>
              <div className="cost">€180<small> / yr</small></div>
              <ul>
                <li>Everything in monthly</li>
                <li>€15/mo effective (vs €19)</li>
                <li>Locked-in price (we won't raise)</li>
              </ul>
              <a href="/api/billing/checkout?plan=annual" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Start annual →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section className="section">
        <div className="section-header">
          <h2>Questions.</h2>
          <p>The honest answers, before you spend anything.</p>
        </div>
        <div className="faq-grid">
          {[
            { q: "Do I need a card for the free trial?", a: "No. 7 days, no card. We email you on day 6 to remind you." },
            { q: "What happens after the trial?", a: "If you do nothing, your account stays on the free tier. If you enter a card, it becomes €19/mo on day 8." },
            { q: "Can I cancel anytime?", a: "Yes. One click in your account, no questions, no retention loops." },
            { q: "Is this a treatment for anxiety or depression?", a: "No. It's a practice tool. If you have a clinical issue, see a professional. Rulio sits alongside professional care, it doesn't replace it." },
            { q: "What does 'adaptive' mean?", a: "The AI coach picks the right frequency for you, based on the time of day, your recent sessions, and (eventually) what you tell it." },
            { q: "Do I need headphones?", a: "Yes, stereo headphones. The binaural effect requires L/R separation. AirPods work. Bone conduction doesn't." },
            { q: "Is there a family plan?", a: "Not yet. Coming in 2026 if enough people ask." },
            { q: "What languages?", a: "English UI, all 9 frequencies. More languages as we go." },
            { q: "Can I get a refund?", a: "Yes, full refund within 14 days of first charge, no questions." },
            { q: "Do you have an app?", a: "Web app works on iOS and Android browsers. Native apps when we hit 1,000 paying users." },
          ].map((f, i) => (
            <details key={i} className="faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* === DISCLAIMER === */}
      <p className="disclaimer">
        Not a medical device. Not a treatment for any condition. Solfeggio frequencies are a relaxation and focus tool, used the same way music is used. If you have a serious condition, see a professional.
      </p>
    </main>
  );
}
