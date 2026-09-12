/**
 * Rulio Engine — session engine. Combines binaural + solfeggio + sub-bass
 * layers and steps through the preset's phase ramp.
 *
 * Spec: Section 2 §3.1.C (Layering) + §3 (real-time playback).
 */

import * as Tone from "tone";
import { BinauralBeat, type Phase } from "./binaural";
import { SolfeggioTone } from "./solfeggio";

export type Preset = {
  id: string;
  name: string;
  /** 4 phases minimum for the adaptive stepper. */
  phases: Phase[];
  /** Solfeggio carrier for the layer (Hz, 0 = disabled). */
  solfeggioHz?: number;
  /** Sub-bass in Hz, 0 = disabled. */
  subBassHz?: number;
};

export class SessionEngine {
  private binaural: BinauralBeat | null = null;
  private solfeggio: SolfeggioTone | null = null;
  private subBass: Tone.Oscillator | null = null;
  private subBassGain: Tone.Gain | null = null;
  private currentPhaseIndex = 0;
  private phaseTimers: number[] = [];

  constructor(private preset: Preset) {}

  async start(): Promise<void> {
    const first = this.preset.phases[0];
    if (!first) {
      throw new Error(`Preset ${this.preset.id} has no phases.`);
    }

    // Layer 1: binaural beat (carrier + offset, hard-panned stereo)
    this.binaural = new BinauralBeat(first);
    await this.binaural.start();

    // Layer 2: solfeggio (optional)
    if (this.preset.solfeggioHz && this.preset.solfeggioHz > 0) {
      this.solfeggio = new SolfeggioTone(this.preset.solfeggioHz, 0.3);
      this.solfeggio.start();
    }

    // Layer 3: sub-bass (optional)
    if (this.preset.subBassHz && this.preset.subBassHz > 0) {
      this.subBass = new Tone.Oscillator(this.preset.subBassHz, "sine");
      this.subBassGain = new Tone.Gain(0.15).toDestination();
      this.subBass.connect(this.subBassGain);
      this.subBass.start();
    }

    this.schedulePhaseRamp();
  }

  /**
   * The phase ramp is scheduled ahead of time. Each phase has a fixed
   * duration (we infer it from the gap between carriers in production,
   * hard-coded here as 15min for the MVP). `rampTo` smooths the transition.
   */
  private schedulePhaseRamp(): void {
    // MVP: 4 phases × 15 min = 60 min total. The phase-block duration is
    // computed in production from the preset JSON; for the scaffold we
    // hard-code 15min per phase and schedule the transitions.
    const phaseSeconds = 15 * 60;
    for (let i = 1; i < this.preset.phases.length; i++) {
      const at = i * phaseSeconds;
      const next = this.preset.phases[i];
      if (!next) continue;
      const timer = window.setTimeout(() => {
        this.binaural?.rampTo(next, 30);
        this.currentPhaseIndex = i;
      }, at * 1000);
      this.phaseTimers.push(timer);
    }
  }

  getCurrentPhaseIndex(): number {
    return this.currentPhaseIndex;
  }

  stop(): void {
    this.phaseTimers.forEach(clearTimeout);
    this.phaseTimers = [];
    this.binaural?.stop();
    this.solfeggio?.stop();
    if (this.subBass && this.subBassGain) {
      this.subBass.stop();
      this.subBassGain.dispose();
    }
    this.binaural = null;
    this.solfeggio = null;
    this.subBass = null;
    this.subBassGain = null;
  }
}
