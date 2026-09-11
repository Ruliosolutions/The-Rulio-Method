"use client";

/**
 * React hook for the Rulio Engine session. Lazily loads Tone.js
 * (Web Audio API is browser-only) and exposes start / stop / current
 * phase index. Used by the player UI.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { SessionEngine, type Preset } from "./engine";

export function useSession(preset: Preset) {
  const engineRef = useRef<SessionEngine | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);

  // Poll the phase index every second while playing (cheap; just a number).
  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      const idx = engineRef.current?.getCurrentPhaseIndex() ?? 0;
      setPhaseIndex(idx);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  const start = useCallback(async () => {
    if (engineRef.current) return; // already running
    const engine = new SessionEngine(preset);
    engineRef.current = engine;
    await engine.start();
    setIsPlaying(true);
  }, [preset]);

  const stop = useCallback(() => {
    engineRef.current?.stop();
    engineRef.current = null;
    setIsPlaying(false);
    setPhaseIndex(0);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      engineRef.current?.stop();
    };
  }, []);

  return { isPlaying, phaseIndex, start, stop };
}
