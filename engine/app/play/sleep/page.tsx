"use client";

/**
 * Rulio Engine — Sleep preset player.
 *
 * MVP Week 1 demo: "Sign in → click Sleep → 4-phase adaptive audio plays."
 * Uses the useSession hook to drive the audio engine and renders a
 * 4-step phase stepper + Start/Stop button + headphone prompt.
 *
 * Spec: Section 2 §2 MVP items 1 (phase stepper) + 4 (WebAudio) + 5
 * (headphone prompt).
 */

import { useSession } from "@/lib/audio/useSession";
import { sleepPreset } from "@/lib/presets/sleep";
import { useState } from "react";

export default function SleepPlayerPage() {
  const { isPlaying, phaseIndex, start, stop } = useSession(sleepPreset);
  const [showHeadphonePrompt, setShowHeadphonePrompt] = useState(true);

  return (
    <main className="min-h-screen bg-[#0c0c0e] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <header className="text-center space-y-2">
          <p className="text-sm uppercase tracking-widest text-zinc-400">
            Preset
          </p>
          <h1 className="text-4xl font-light">{sleepPreset.name}</h1>
          <p className="text-zinc-400 text-sm">
            60 min · 4 phases · 528 Hz solfeggio · 60 Hz sub-bass
          </p>
        </header>

        {/* Phase stepper — Section 2 §2 MVP item 1 */}
        <ol className="flex justify-between text-sm">
          {sleepPreset.phases.map((phase, idx) => {
            const isActive = idx === phaseIndex && isPlaying;
            const isComplete = idx < phaseIndex || !isPlaying;
            return (
              <li
                key={idx}
                className={[
                  "flex-1 text-center py-3 border-t-2 transition-colors",
                  isActive
                    ? "border-cyan-400 text-cyan-300"
                    : isComplete
                      ? "border-zinc-600 text-zinc-500"
                      : "border-zinc-800 text-zinc-600",
                ].join(" ")}
              >
                <span className="block text-xs uppercase tracking-widest">
                  {String(idx + 1).padStart(2, "0")}/04
                </span>
                <span className="block mt-1 font-medium">
                  {["Activate", "Calm", "Drift", "Sleep"][idx] ?? "—"}
                </span>
                <span className="block text-xs text-zinc-500 mt-1">
                  {phase.offset} Hz
                </span>
              </li>
            );
          })}
        </ol>

        {/* Headphone prompt — Section 2 §2 MVP item 5 */}
        {showHeadphonePrompt && !isPlaying && (
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
            <p className="font-medium text-amber-200">
              Binaural beats require headphones.
            </p>
            <p className="text-amber-200/80 mt-1">
              The two tones need to reach each ear separately. Bluetooth
              speakers will not produce the effect.
            </p>
            <button
              onClick={() => setShowHeadphonePrompt(false)}
              className="mt-2 text-xs text-amber-300 underline"
            >
              Got it
            </button>
          </div>
        )}

        {/* Start / stop — Section 2 §2 MVP item 4 */}
        <div className="text-center">
          {isPlaying ? (
            <button
              onClick={stop}
              className="px-8 py-4 rounded-full bg-cyan-500 text-black font-semibold tracking-wider hover:bg-cyan-400 transition"
            >
              STOP SESSION
            </button>
          ) : (
            <button
              onClick={start}
              className="px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wider hover:bg-zinc-200 transition"
            >
              START SESSION
            </button>
          )}
        </div>

        <p className="text-center text-xs text-zinc-500">
          A relaxation tool. Not a medical device. Not intended to diagnose or
          treat any condition.
        </p>
      </div>
    </main>
  );
}
