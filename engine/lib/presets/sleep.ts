/**
 * Rulio Engine — first preset: Sleep.
 *
 * 4-phase adaptive ramp over 60 minutes:
 *   01/04 Activate  (15 min) — Beta 18 Hz, carrier 200 Hz
 *   02/04 Calm      (15 min) — Alpha 10 Hz, carrier 180 Hz
 *   03/04 Drift     (15 min) — Theta 6 Hz, carrier 160 Hz
 *   04/04 Sleep     (15 min) — Delta 2 Hz, carrier 120 Hz
 *
 * Spec: Section 2 §5 Week 1 demo ("Sign in → click Sleep → 4-phase
 * adaptive audio plays").
 */

import type { Preset } from "../audio/engine";

export const sleepPreset: Preset = {
  id: "sleep",
  name: "Sleep",
  solfeggioHz: 528, // "Mi" — Transformation
  subBassHz: 60,
  phases: [
    { carrier: 200, offset: 18, gain: 0.35 }, // Activate — Beta
    { carrier: 180, offset: 10, gain: 0.30 }, // Calm — Alpha
    { carrier: 160, offset: 6, gain: 0.25 }, // Drift — Theta
    { carrier: 120, offset: 2, gain: 0.20 }, // Sleep — Delta
  ],
};
