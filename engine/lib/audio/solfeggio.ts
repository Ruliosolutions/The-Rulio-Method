/**
 * Rulio Engine — solfeggio tone generator.
 *
 * Each solfeggio frequency is a fundamental sine plus 2 harmonics at -12 dB
 * and -24 dB (audible warmth without colouration). The 9 traditional
 * frequencies are hard-coded; user picks one per layer.
 *
 * Spec: Section 2 §3.1.B of the Rulio launch strategy doc.
 */

import * as Tone from "tone";

/** The 9 traditional Solfeggio frequencies, in Hz. */
export const SOLFEGGIO_FREQUENCIES = [
  174, 285, 396, 417, 528, 639, 741, 852, 963,
] as const;

export type SolfeggioHz = (typeof SOLFEGGIO_FREQUENCIES)[number];

export class SolfeggioTone {
  private osc1: Tone.Oscillator;
  private osc2: Tone.Oscillator;
  private osc3: Tone.Oscillator;
  private merge: Tone.Gain;

  constructor(fundamentalHz: SolfeggioHz | number, gain = 0.3) {
    if (
      !SOLFEGGIO_FREQUENCIES.includes(fundamentalHz as SolfeggioHz) &&
      fundamentalHz < 20
    ) {
      throw new Error(
        `SolfeggioTone: ${fundamentalHz}Hz is below safe audible range (≥20 Hz).`,
      );
    }

    this.osc1 = new Tone.Oscillator(fundamentalHz, "sine");
    this.osc2 = new Tone.Oscillator(fundamentalHz * 2, "sine");
    this.osc3 = new Tone.Oscillator(fundamentalHz * 3, "sine");
    this.merge = new Tone.Gain(gain);

    // -12 dB and -24 dB on the harmonics
    this.osc1.volume.value = 0;
    this.osc2.volume.value = -12;
    this.osc3.volume.value = -24;

    this.osc1.connect(this.merge);
    this.osc2.connect(this.merge);
    this.osc3.connect(this.merge);
    this.merge.toDestination();
  }

  start(): void {
    this.osc1.start();
    this.osc2.start();
    this.osc3.start();
  }

  setGain(g: number): void {
    this.merge.gain.rampTo(g, 1.0);
  }

  stop(): void {
    this.osc1.stop();
    this.osc2.stop();
    this.osc3.stop();
    this.merge.dispose();
  }
}
