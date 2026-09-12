// /qi — Rulio Engine's 14-session library.
//
// Static export: the manifest is fetched at build time from the deployed
// Qi-sessions site. The MP3s are streamed from the same origin at runtime.
// No server runtime needed; deploys as plain HTML.

import QiPlayer from "./QiPlayer";

const QI_BASE = "https://apkeal8qeqnc0.space.minimax.io";

type Session = {
  id: string;
  title: string;
  chapter: number;
  solfeggio_hz: number[];
  carrier_hz: number;
  binaural_offset_hz: number;
  sub_bass_hz: number;
  length_min: number;
  brainwave_band: string;
  tier: "free" | "extended";
  instruction: string;
  filename: string;
  size_bytes: number;
};

type Manifest = {
  version: string;
  title: string;
  description: string;
  disclaimer: string;
  sample_rate: number;
  bit_depth: number;
  channels: number;
  mp3_bitrate: string;
  format: string;
  sessions: Session[];
};

export const metadata = {
  title: "Rulio Qi Sessions — 14 free + extended audio",
  description:
    "Binaural-beat and solfeggio frequency sessions for sleep, focus, energy, and creative flow. Headphones required.",
};

async function loadManifest(): Promise<Manifest> {
  const res = await fetch(`${QI_BASE}/manifest.json`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load manifest: ${res.status}`);
  }
  return res.json() as Promise<Manifest>;
}

export default async function QiPage() {
  const manifest = await loadManifest();
  const free = manifest.sessions.filter((s) => s.tier !== "extended");
  const extended = manifest.sessions.filter((s) => s.tier === "extended");
  const totalMin = manifest.sessions.reduce((a, s) => a + s.length_min, 0);
  const totalMb =
    manifest.sessions.reduce((a, s) => a + s.size_bytes, 0) / 1024 / 1024;

  return (
    <main className="min-h-screen bg-[#0c0c0e] text-[#f4f1ea]">
      <section className="px-6 py-16 sm:py-20 max-w-3xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa] mb-3">
          /qi · {manifest.sessions.length} sessions
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light leading-tight tracking-tight mb-4">
          The Rulio Qi sessions.
        </h1>
        <p className="text-[#a1a1aa] text-lg max-w-2xl">
          Five to twenty-five minutes each. Headphones required. The free 12
          ship with <em>The Rulio Qi Method</em>. The 25-minute extended
          versions are for full deep-work blocks.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs text-[#a1a1aa]">
          <span>
            <span className="text-[#f4f1ea]">{manifest.sessions.length}</span>{" "}
            sessions
          </span>
          <span>·</span>
          <span>
            <span className="text-[#f4f1ea]">{totalMin}</span> min
          </span>
          <span>·</span>
          <span>
            <span className="text-[#f4f1ea]">{totalMb.toFixed(0)}</span> MB
          </span>
          <span>·</span>
          <span>
            <span className="text-[#f4f1ea]">{manifest.sample_rate / 1000}</span>{" "}
            kHz · {manifest.mp3_bitrate}
          </span>
        </div>
      </section>

      <section className="px-6 max-w-3xl mx-auto">
        <div className="border border-amber-500/20 bg-amber-500/5 rounded-lg p-4 text-sm text-amber-200/90">
          ⚠ {manifest.disclaimer} If you have a history of seizures, are
          pregnant, or wear a pacemaker, consult a clinician before use.
        </div>
      </section>

      <section className="px-6 py-12 max-w-3xl mx-auto">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl">Free 12</h2>
          <span className="font-mono text-xs text-[#a1a1aa]">
            ships with the book
          </span>
        </div>
        <QiPlayer sessions={free} audioBase={QI_BASE} />
      </section>

      {extended.length > 0 && (
        <section className="px-6 py-8 max-w-3xl mx-auto">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-serif text-2xl">Extended</h2>
            <span className="font-mono text-xs text-[#a1a1aa]">
              for power users
            </span>
          </div>
          <QiPlayer sessions={extended} audioBase={QI_BASE} />
        </section>
      )}

      <footer className="px-6 py-12 max-w-3xl mx-auto border-t border-white/10 text-sm text-[#a1a1aa]">
        <p className="font-mono text-xs">
          RULIO.STUDIO · BRUSSELS · {new Date().getFullYear()} ·{" "}
          <a
            href="mailto:hello@rulio.io"
            className="text-[#f4f1ea] hover:text-[#8FD1FF]"
          >
            hello@rulio.io
          </a>
        </p>
        <p className="mt-2 text-xs">
          Manifest: <code className="font-mono">{QI_BASE}/manifest.json</code>
          {" "}— the single source of truth. Engine ships with no audio bundled;
          all MP3s are streamed from the Qi-sessions origin.
        </p>
      </footer>
    </main>
  );
}
