/**
 * Rulio Engine — binaural-beat generator.
 *
 * A binaural beat is the perceptual beat the brain produces when it hears
 * two pure tones of slightly different frequencies, one in each ear. If the
 * left ear gets 200 Hz and the right ear gets 218 Hz, the brainstem
 * integrates them and the listener perceives an 18 Hz amplitude modulation.
 *
 * The two oscillators must be hard-panned L = -1, R = +1, otherwise the
 * brain hears them as a single tone and the beat vanishes. This is why
 * binaural beats only work over headphones.
 *
 * Spec: Section 2 §3.1.A of the Rulio launch strategy doc.
 */

import * as Tone from "tone";

export type Phase = {
  /** carrier frequency in Hz (left-ear tone). e.g. 200 */
  carrier: number;
  /** offset in Hz added to the right-ear tone. e.g. 18 → perceived 18 Hz beat */
  offset: number;
  /** master gain 0..1 */
  gain: number;
};

export class BinauralBeat {
  private left: Tone.Oscillator;
  private right: Tone.Oscillator;
  private panL: Tone.Panner;
  private panR: Tone.Panner;
  private gain: Tone.Gain;

  constructor(phase: Phase) {
    this.left = new Tone.Oscillator(phase.carrier, "sine");
    this.right = new Tone.Oscillator(phase.carrier + phase.offset, "sine");
    this.panL = new Tone.Panner(-1);
    this.panR = new Tone.Panner(+1);
    this.gain = new Tone.Gain(phase.gain);

    this.left.connect(this.panL);
    this.right.connect(this.panR);
    this.panL.connect(this.gain);
    this.panR.connect(this.gain);
    this.gain.toDestination();
  }

  /**
   * Start the binaural beat. MUST be called inside a user gesture handler
   * (click, tap) because of iOS Safari's autoplay policy.
   */
  async start(): Promise<void> {
    await Tone.start();
    this.left.start();
    this.right.start();
  }

  /**
   * Smoothly transition to a new phase over `ramp` seconds.
   * Use this to slide the carrier and offset between phase blocks
   * (e.g. Activate → Calm → Drift → Sleep).
   */
  rampTo(phase: Phase, ramp = 30): void {
    const now = Tone.now();
    this.left.frequency.rampTo(phase.carrier, ramp, now);
    this.right.frequency.rampTo(phase.carrier + phase.offset, ramp, now);
    this.gain.gain.rampTo(phase.gain, ramp, now);
  }

  stop(): void {
    this.left.stop();
    this.right.stop();
    this.gain.dispose();
  }
}
