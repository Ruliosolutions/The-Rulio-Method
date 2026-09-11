import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c0c0e] text-white px-6 py-12 sm:py-20">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa] mb-3">
          Rulio Engine · Static deploy
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight mb-6">
          Adaptive audio for sleep, focus, and creative flow.
        </h1>
        <p className="text-lg text-[#a1a1aa] max-w-2xl mb-10">
          Binaural-beat and solfeggio frequency sessions generated live in your
          browser with the Web Audio API. No accounts, no data leaves your
          device. A relaxation tool — not a medical device.
        </p>

        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href="/play/sleep"
            className="inline-block px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition"
          >
            Try the Sleep preset
          </Link>
          <Link
            href="/qi"
            className="inline-block px-6 py-3 rounded-full border border-white/20 text-white hover:border-white/40 transition"
          >
            All 14 Qi sessions →
          </Link>
        </div>

        <div className="border border-white/10 rounded-lg p-6 bg-white/2">
          <p className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa] mb-2">
            The R mark
          </p>
          <p className="text-[#a1a1aa] text-sm">
            Built with the Rulio brand mark — a faceted 3D letter R with
            internal electric-blue energy trails. See{" "}
            <a href="/assets/README.md" className="text-[#8FD1FF] hover:underline">
              the brand guide
            </a>{" "}
            for the full system.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-4 text-sm">
          <Link
            href="/play/sleep"
            className="block border border-white/10 rounded-lg p-4 hover:border-white/20 transition"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa] mb-1">
              Live
            </p>
            <p className="font-serif text-lg">/play/sleep</p>
            <p className="text-[#a1a1aa] mt-1">
              4-phase adaptive session with Tone.js
            </p>
          </Link>
          <Link
            href="/qi"
            className="block border border-white/10 rounded-lg p-4 hover:border-white/20 transition"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-[#a1a1aa] mb-1">
              Library
            </p>
            <p className="font-serif text-lg">/qi</p>
            <p className="text-[#a1a1aa] mt-1">
              14 audio sessions, streamed from the deployed manifest
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
