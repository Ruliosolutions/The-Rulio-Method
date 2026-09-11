/**
 * Email templates for the Rulio Engine.
 *
 * All templates are plain HTML strings (no React) so they can be
 * sent via Resend without a renderer. Each template takes a typed
 * `data` object and returns `{ subject, html, text }`.
 */

export type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

// Brand colors (also in assets/README.md)
const BG = "#0c0c0e";
const FG = "#f4f1ea";
const MUTED = "#a1a1aa";
const ACCENT = "#5BB8FF";
const GLOW = "#8FD1FF";

const wrap = (title: string, body: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${BG};font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:${FG};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;padding:32px 24px;text-align:left;">
<tr><td>
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:32px;">
    <div style="width:32px;height:32px;background:linear-gradient(135deg,${ACCENT},${GLOW});border-radius:6px;"></div>
    <div style="font-weight:600;letter-spacing:0.05em;font-size:13px;">RULIO.STUDIO</div>
  </div>
  ${body}
  <div style="margin-top:48px;padding-top:24px;border-top:1px solid rgba(244,241,234,0.10);color:${MUTED};font-size:12px;line-height:1.6;">
    <p style="margin:0 0 8px;">Rulio Studio · Brussels · hello@rulio.io</p>
    <p style="margin:0;">You're getting this because you registered for a Rulio workshop. <a href="{{unsubscribe_url}}" style="color:${MUTED};">Unsubscribe</a></p>
  </div>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>
`;

const button = (label: string, url: string) => `
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
<tr><td style="background:${ACCENT};border-radius:999px;">
  <a href="${url}" style="display:inline-block;padding:14px 24px;color:${BG};text-decoration:none;font-weight:600;font-size:15px;">${label}</a>
</td></tr>
</table>
`;

// ========================================================================
// Workshop confirmation (T+0)
// ========================================================================

export function workshopConfirmation(data: {
  firstName: string;
  workshopDate: string;        // e.g. "Tuesday 7 October 2026"
  workshopTime: string;        // e.g. "19:00 CET"
  zoomLink: string;
  ticketSku: string;           // "workshop-standard" | "workshop-book" | "workshop-bundle"
  amountEur: number;
}): EmailTemplate {
  const subject = "You're in. Here's the Zoom link + 3 things to bring.";
  const text = `Hey ${data.firstName},

You're registered for The Energy Reset Workshop.

📅 ${data.workshopDate}
🕖 ${data.workshopTime}
🔗 ${data.zoomLink}
💶 €${data.amountEur}

Three things to bring:

1. Headphones. The binaural-beat effect only works with headphones — the L signal goes in one ear, the R signal in the other. AirPods, Sony WH-1000XM5, anything. Speakers will collapse the effect.

2. A pen. We'll design your protocol live. You'll write down your worst state, your hardest hour, and your one non-negotiable sleep window. 3 sentences.

3. An open hour after the workshop. No calls, no email. The protocol is 5 minutes, 5 times a day. It works if you actually run it.

See you Tuesday.

— Roel

P.S. Can't make it live? The replay is yours for 30 days. But live is better — the protocol design part is the most useful hour, and you can't get it from a recording.`;

  const body = `
  <h1 style="font-family:'Fraunces',serif;font-size:32px;font-weight:400;margin:0 0 16px;line-height:1.1;">You're in.</h1>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 16px;">Hey ${data.firstName},</p>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 24px;">You're registered for <strong>The Energy Reset Workshop</strong>. Here are the details.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(91,184,255,0.04);border:1px solid rgba(91,184,255,0.2);border-radius:12px;margin:0 0 24px;">
    <tr><td style="padding:20px;">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Workshop</div>
      <div style="font-size:15px;line-height:1.6;">
        📅 <strong>${data.workshopDate}</strong><br/>
        🕖 <strong>${data.workshopTime}</strong><br/>
        💶 <strong>€${data.amountEur}</strong> · ${ticketLabel(data.ticketSku)}
      </div>
    </td></tr>
  </table>
  ${button("Join the Zoom →", data.zoomLink)}
  <h2 style="font-family:'Fraunces',serif;font-size:20px;font-weight:500;margin:32px 0 12px;">3 things to bring</h2>
  <ol style="color:${FG};font-size:15px;line-height:1.7;padding-left:20px;margin:0 0 24px;">
    <li style="margin-bottom:8px;"><strong>Headphones.</strong> AirPods, Sony, anything. The L signal goes in one ear, the R signal in the other. Speakers will collapse the effect.</li>
    <li style="margin-bottom:8px;"><strong>A pen.</strong> We'll design your protocol live. 3 sentences: worst state, hardest hour, sleep window.</li>
    <li style="margin-bottom:8px;"><strong>An open hour after the workshop.</strong> No calls, no email. The protocol is 5 min × 5. It works if you run it.</li>
  </ol>
  <p style="color:${MUTED};font-size:14px;line-height:1.6;margin:24px 0 0;">— Roel</p>
  <p style="color:${MUTED};font-size:13px;line-height:1.6;margin:16px 0 0;font-style:italic;">P.S. Can't make it live? The replay is yours for 30 days. But live is significantly better — the protocol design part is the most useful hour of the workshop.</p>
  `;
  return { subject, html: wrap("Workshop confirmation", body), text };
}

// ========================================================================
// Workshop reminder (T-24h)
// ========================================================================

export function workshopReminder(data: {
  firstName: string;
  workshopDate: string;
  workshopTime: string;
  zoomLink: string;
}): EmailTemplate {
  const subject = "Tomorrow 19:00 CET — 3 last things";
  const text = `Hey ${data.firstName},

Quick reminder for tomorrow's Energy Reset Workshop.

🕖 ${data.workshopTime}
🔗 ${data.zoomLink}

Three things before we start:

1. Charge your headphones. Nothing worse than the 60 Hz sub-bass cutting out at minute 45.

2. Pick your worst state right now. The one that's been sitting in your chest this week. Write it in one sentence. We'll use it in the live protocol design.

3. Set your phone to "Do Not Disturb" for 90 minutes starting 19:00. The workshop is the most useful thing you'll do this week. The Slack message can wait.

See you tomorrow.

— Roel`;

  const body = `
  <h1 style="font-family:'Fraunces',serif;font-size:28px;font-weight:400;margin:0 0 16px;line-height:1.1;">Tomorrow at ${data.workshopTime}.</h1>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 24px;">Hey ${data.firstName},</p>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 24px;">Quick reminder for tomorrow's Energy Reset Workshop.</p>
  ${button("Join the Zoom →", data.zoomLink)}
  <h2 style="font-family:'Fraunces',serif;font-size:20px;font-weight:500;margin:32px 0 12px;">3 things before we start</h2>
  <ol style="color:${FG};font-size:15px;line-height:1.7;padding-left:20px;margin:0 0 24px;">
    <li style="margin-bottom:8px;"><strong>Charge your headphones.</strong> Nothing worse than the 60 Hz sub-bass cutting out at minute 45.</li>
    <li style="margin-bottom:8px;"><strong>Pick your worst state right now.</strong> The one that's been sitting in your chest this week. Write it in one sentence. We'll use it in the live protocol design.</li>
    <li style="margin-bottom:8px;"><strong>Set your phone to "Do Not Disturb" for 90 minutes.</strong> The workshop is the most useful thing you'll do this week. The Slack message can wait.</li>
  </ol>
  <p style="color:${MUTED};font-size:14px;margin:24px 0 0;">See you tomorrow. — Roel</p>
  `;
  return { subject, html: wrap("Workshop reminder", body), text };
}

// ========================================================================
// Post-workshop (T+0 post) — replay + assets
// ========================================================================

export function workshopPostWorkshop(data: {
  firstName: string;
  replayLink: string;
  cardsLink: string;
  logLink: string;
}): EmailTemplate {
  const subject = "The replay + 9 frequency cards + your 7-day log";
  const text = `Hey ${data.firstName},

Thanks for being in the room today. Here's everything we covered, all in one place.

📼 Workshop replay (30 days): ${data.replayLink}
🎴 9 frequency cards (PDF): ${data.cardsLink}
📓 7-day practice log (PDF): ${data.logLink}
🎧 All 14 Qi sessions: https://rulio.app/qi

The 3-sentence homework:

Write down — tonight, before bed:
1. Your worst state (one sentence)
2. Your hardest hour of the day (one sentence)
3. Your one non-negotiable sleep window (one sentence)

Then run the protocol tomorrow. 5 minutes, 5 times.

Reply to this email with the 3 sentences if you want feedback on your protocol. I read every one.

— Roel

P.S. If you want the personalised engine — adaptive sessions, 25-min extended versions, the AI coach — Engine Pro is 20% off this week with the code WORKSHOP20.`;

  const body = `
  <h1 style="font-family:'Fraunces',serif;font-size:28px;font-weight:400;margin:0 0 16px;line-height:1.1;">Thanks for being in the room.</h1>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 24px;">Hey ${data.firstName}, here's everything we covered, all in one place.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(244,241,234,0.03);border:1px solid rgba(244,241,234,0.10);border-radius:12px;margin:0 0 24px;">
    <tr><td style="padding:20px;font-size:15px;line-height:1.8;">
      📼 <a href="${data.replayLink}" style="color:${GLOW};">Workshop replay (30 days)</a><br/>
      🎴 <a href="${data.cardsLink}" style="color:${GLOW};">9 frequency cards (PDF)</a><br/>
      📓 <a href="${data.logLink}" style="color:${GLOW};">7-day practice log (PDF)</a><br/>
      🎧 <a href="https://rulio.app/qi" style="color:${GLOW};">All 14 Qi sessions</a>
    </td></tr>
  </table>
  <h2 style="font-family:'Fraunces',serif;font-size:20px;font-weight:500;margin:32px 0 12px;">The 3-sentence homework</h2>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 16px;">Write down — tonight, before bed:</p>
  <ol style="color:${FG};font-size:15px;line-height:1.7;padding-left:20px;margin:0 0 24px;">
    <li>Your worst state (one sentence)</li>
    <li>Your hardest hour of the day (one sentence)</li>
    <li>Your one non-negotiable sleep window (one sentence)</li>
  </ol>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 16px;">Then run the protocol tomorrow. 5 minutes, 5 times.</p>
  <p style="color:${MUTED};font-size:14px;font-style:italic;margin:24px 0 0;">Reply to this email with the 3 sentences if you want feedback on your protocol. I read every one.</p>
  <p style="color:${MUTED};font-size:14px;margin:24px 0 0;">— Roel</p>
  <p style="color:${MUTED};font-size:13px;line-height:1.6;margin:16px 0 0;font-style:italic;">P.S. Engine Pro is 20% off this week with the code <strong style="color:${GLOW};">WORKSHOP20</strong>.</p>
  `;
  return { subject, html: wrap("Workshop replay + assets", body), text };
}

// ========================================================================
// Day-3 check-in
// ========================================================================

export function workshopDay3(data: { firstName: string }): EmailTemplate {
  const subject = "Day 3 — how's the protocol going?";
  const text = `Hey ${data.firstName},

Three days into the protocol. Quick check-in.

The two most common pitfalls at day 3:
1. "I forgot to run the morning session." — Set a phone alarm for the first 7 days.
2. "I don't notice anything yet." — That's correct. The change is invisible on day 1, subtle on day 3, undeniable on day 7.

Reply and tell me what's working and what isn't. I read every one.

— Roel`;

  const body = `
  <h1 style="font-family:'Fraunces',serif;font-size:28px;font-weight:400;margin:0 0 16px;">Day 3.</h1>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 24px;">Hey ${data.firstName},</p>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 24px;">Three days into the protocol. Quick check-in.</p>
  <h2 style="font-family:'Fraunces',serif;font-size:18px;font-weight:500;margin:24px 0 12px;">The two most common pitfalls at day 3</h2>
  <ol style="color:${FG};font-size:15px;line-height:1.7;padding-left:20px;margin:0 0 24px;">
    <li style="margin-bottom:8px;"><strong>"I forgot to run the morning session."</strong> Set a phone alarm for the first 7 days. After that, the routine is the alarm.</li>
    <li style="margin-bottom:8px;"><strong>"I don't notice anything yet."</strong> That's correct. The change is invisible on day 1, subtle on day 3, undeniable on day 7. Keep going.</li>
  </ol>
  <p style="color:${FG};font-size:15px;line-height:1.7;">Reply and tell me what's working and what isn't. I read every one.</p>
  <p style="color:${MUTED};font-size:14px;margin:24px 0 0;">— Roel</p>
  `;
  return { subject, html: wrap("Day 3 check-in", body), text };
}

// ========================================================================
// Day-7 offer
// ========================================================================

export function workshopDay7(data: {
  firstName: string;
  bundleLink: string;
}): EmailTemplate {
  const subject = "Day 7 — time to decide";
  const text = `Hey ${data.firstName},

A week in. The data is in.

If the 7-day log is half-full or more: the protocol is working. The question is what you do next.

The Energy Reset Bundle (€500, regular €720):
- Everything in the Energy Reset Workshop
- 6 months of Rulio Engine Pro (adaptive AI sessions, 25-min extended versions, AI Coach)
- 2 × 30-min private sessions with me

The bundle is for the 3-5% of you who want to go all in. If you're not in that 3-5%, the standard workshop + your own 7-day log is enough.

${data.bundleLink}

One week. The frequencies are working. The question is whether you keep going alone or you let me optimise the next 6 months with you.

— Roel`;

  const body = `
  <h1 style="font-family:'Fraunces',serif;font-size:28px;font-weight:400;margin:0 0 16px;">Day 7 — time to decide.</h1>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 24px;">Hey ${data.firstName},</p>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 16px;">A week in. The data is in.</p>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 24px;">If the 7-day log is half-full or more: <strong>the protocol is working.</strong> The question is what you do next.</p>
  <h2 style="font-family:'Fraunces',serif;font-size:18px;font-weight:500;margin:24px 0 12px;">The Energy Reset Bundle · €500 (regular €720)</h2>
  <ul style="color:${FG};font-size:15px;line-height:1.7;padding-left:20px;margin:0 0 24px;">
    <li>Everything in the Energy Reset Workshop</li>
    <li>6 months of Rulio Engine Pro (adaptive AI sessions, 25-min extended versions, AI Coach)</li>
    <li>2 × 30-min private sessions with me</li>
  </ul>
  ${button("Claim the bundle →", data.bundleLink)}
  <p style="color:${MUTED};font-size:14px;line-height:1.7;margin:24px 0 0;">The bundle is for the 3-5% of you who want to go all in. If you're not in that 3-5%, the standard workshop + your own 7-day log is enough.</p>
  <p style="color:${MUTED};font-size:14px;line-height:1.7;margin:24px 0 0;">— Roel</p>
  `;
  return { subject, html: wrap("Day 7 — the bundle", body), text };
}

// ========================================================================
// Audit confirmation
// ========================================================================

export function auditConfirmation(data: {
  firstName: string;
  auditDate: string;
  auditTime: string;
  zoomLink: string;
}): EmailTemplate {
  const subject = "Energy Audit booked — here's the prep doc";
  const text = `Hey ${data.firstName},

Your 30-min Energy Audit is booked.

📅 ${data.auditDate}
🕖 ${data.auditTime}
🔗 ${data.zoomLink}

Before the call, please read the 2-page prep doc: https://rulio.io/audit-prep

It covers the 4 questions we'll work through and the format. Takes 4 minutes to read, saves 10 minutes of fumbling on the call.

— Roel`;

  const body = `
  <h1 style="font-family:'Fraunces',serif;font-size:28px;font-weight:400;margin:0 0 16px;">Audit booked.</h1>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 16px;">Hey ${data.firstName},</p>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 24px;">Your 30-min Energy Audit is booked.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(91,184,255,0.04);border:1px solid rgba(91,184,255,0.2);border-radius:12px;margin:0 0 24px;">
    <tr><td style="padding:20px;font-size:15px;line-height:1.6;">
      📅 <strong>${data.auditDate}</strong><br/>
      🕖 <strong>${data.auditTime}</strong>
    </td></tr>
  </table>
  ${button("Join the Zoom →", data.zoomLink)}
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:24px 0 0;">Before the call, please read the 2-page prep doc: <a href="https://rulio.io/audit-prep" style="color:${GLOW};">rulio.io/audit-prep</a></p>
  <p style="color:${MUTED};font-size:14px;line-height:1.7;margin:24px 0 0;">Takes 4 minutes to read, saves 10 minutes of fumbling on the call.</p>
  <p style="color:${MUTED};font-size:14px;margin:24px 0 0;">— Roel</p>
  `;
  return { subject, html: wrap("Audit booked", body), text };
}

// ========================================================================
// Helpers
// ========================================================================

function ticketLabel(sku: string): string {
  switch (sku) {
    case "workshop-book": return "Book reader";
    case "workshop-bundle": return "Bundle";
    default: return "Standard";
  }
}

// ========================================================================
// Digital download fulfillment
// ========================================================================

export type DigitalProduct = {
  sku: string;
  name: string;
  files: Array<{ label: string; url: string }>;
};

export const DIGITAL_PRODUCTS: Record<string, DigitalProduct> = {
  "9-Solfeggio-Cards": {
    sku: "9-Solfeggio-Cards",
    name: "9 Solfeggio Frequency Cards",
    files: [
      { label: "9 Solfeggio Cards (A5)", url: "https://rulio.app/downloads/9-solfeggio-cards-A5.pdf" },
      { label: "9 Solfeggio Cards (US Letter)", url: "https://rulio.app/downloads/9-solfeggio-cards-letter.pdf" },
    ],
  },
  "Qi-Practice-Log": {
    sku: "Qi-Practice-Log",
    name: "7-Day Qi Practice Log",
    files: [
      { label: "Qi Practice Log (PDF)", url: "https://rulio.app/downloads/qi-practice-log.pdf" },
    ],
  },
  "Rulio-Qi-Method-ebook": {
    sku: "Rulio-Qi-Method-ebook",
    name: "The Rulio Qi Method (ebook)",
    files: [
      { label: "The Rulio Qi Method (PDF, 30+ pages)", url: "https://rulio.app/downloads/rulio-qi-method.pdf" },
    ],
  },
  "14-Day-Audio-Pack": {
    sku: "14-Day-Audio-Pack",
    name: "14-Day Solfeggio Audio Pack",
    files: [
      { label: "🎧 All 14 sessions streamed free (no download needed) — rulio.app/qi", url: "https://rulio.app/qi" },
      { label: "Or download individual MP3s from your email", url: "https://rulio.app/qi" },
    ],
  },
  "Complete-Bundle": {
    sku: "Complete-Bundle",
    name: "Complete Rulio Bundle",
    files: [
      { label: "9 Solfeggio Cards (A5 + US Letter)", url: "https://rulio.app/downloads/9-solfeggio-cards-A5.pdf" },
      { label: "7-Day Qi Practice Log", url: "https://rulio.app/downloads/qi-practice-log.pdf" },
      { label: "The Rulio Qi Method (ebook, 30+ pages)", url: "https://rulio.app/downloads/rulio-qi-method.pdf" },
      { label: "14-Day Audio Pack — stream free at rulio.app/qi", url: "https://rulio.app/qi" },
    ],
  },
};

export function digitalDownloadConfirmation(data: {
  firstName: string;
  productSku: string;
}): EmailTemplate | null {
  const product = DIGITAL_PRODUCTS[data.productSku];
  if (!product) return null;

  const fileList = product.files
    .map((f) => `<li style="margin:8px 0;"><a href="${f.url}" style="color:${GLOW};text-decoration:underline;">${f.label}</a></li>`)
    .join("");

  const fileListText = product.files
    .map((f) => `  - ${f.label}: ${f.url}`)
    .join("\n");

  const subject = `Your ${product.name} is ready to download`;
  const text = `Hey ${data.firstName},

Thanks for buying the ${product.name}. Your download links are below — click each one to save the files.

Downloads (lifetime access):
${fileListText}

The 5-minute solfeggio protocol in 3 steps:
  1. Pick your worst hour of the day
  2. Match it to a frequency (the cheat sheet is in the cards)
  3. 5 minutes. Headphones on. Press play.

If anything goes wrong, reply to this email and I'll fix it personally.

— Roel
Rulio Studio, Brussels

Not a medical device. Not a treatment. A practice tool.`;

  const body = `
  <h1 style="font-family:'Fraunces',serif;font-size:28px;font-weight:400;margin:0 0 16px;">Your download is ready.</h1>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 16px;">Hey ${data.firstName},</p>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 24px;">Thanks for buying the <strong>${product.name}</strong>. Click each link below to save the files — they're yours forever.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(91,184,255,0.04);border:1px solid rgba(91,184,255,0.2);border-radius:12px;margin:0 0 24px;">
    <tr><td style="padding:24px;">
      <p style="color:${GLOW};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 12px;">Your downloads</p>
      <ul style="list-style:none;padding:0;margin:0;color:${FG};font-size:15px;line-height:1.7;">
        ${fileList}
      </ul>
    </td></tr>
  </table>
  <h2 style="font-family:'Fraunces',serif;font-size:20px;font-weight:400;margin:32px 0 12px;color:${FG};">The 5-minute protocol</h2>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 8px;">1. Pick your worst hour of the day</p>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 8px;">2. Match it to a frequency (cheat sheet is in the cards)</p>
  <p style="color:${FG};font-size:15px;line-height:1.7;margin:0 0 24px;">3. 5 minutes. Headphones on. Press play.</p>
  <p style="color:${MUTED};font-size:14px;line-height:1.7;margin:24px 0 0;">If anything goes wrong, reply to this email and I'll fix it personally.</p>
  <p style="color:${MUTED};font-size:14px;margin:24px 0 0;">— Roel</p>
  <p style="color:${MUTED};font-size:12px;line-height:1.7;margin:24px 0 0;padding-top:16px;border-top:1px solid rgba(244,241,234,0.10);">Not a medical device. Not a treatment. A practice tool.</p>
  `;
  return { subject, html: wrap(subject, body), text };
}
