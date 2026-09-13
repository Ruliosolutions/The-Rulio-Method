#!/usr/bin/env python3
"""
Rulio Qi Session Generator
===========================
Generates the 12 free audio sessions for "The Rulio Qi Method" book.

Each session is a stereo MP3 with:
- L channel: pure carrier sine wave (e.g. 200 Hz)
- R channel: carrier + offset (binaural beat, e.g. 200.5 Hz)
- Mono solfeggio layer(s) mixed into both channels at -8 dB
- Optional sub-bass layer at -12 dB
- 10 s ease-in, 15 s ease-out envelope

Headphones are required for the binaural beat to work. The listener's
brainstem integrates the L/R frequency difference and produces the
brainwave entrainment effect.
"""

import json
import os
import sys
from pathlib import Path
import numpy as np
import soundfile as sf

# ----- Output configuration -------------------------------------------------

SR = 44100            # 44.1 kHz sample rate (CD quality, headphone-friendly)
BITS = 16             # 16-bit (CD quality)
MP3_BITRATE = "192k"  # 192 kbps stereo MP3 — good balance of size + quality

OUT_DIR = Path("/workspace/rulio-launch/qi-sessions/audio")
OUT_DIR.mkdir(parents=True, exist_ok=True)
MANIFEST_PATH = Path("/workspace/rulio-launch/qi-sessions/manifest.json")


# ----- The 12 sessions -------------------------------------------------------

# Each entry: (id, title, chapter, solfeggio_freqs, carrier_hz, offset_hz,
#              sub_bass_hz, length_min, brainwave_band, instruction)
#
# The brainwave-band column is the desired EEG band. The binaural beat's
# offset_hz selects the band:
#   delta   (0.5–4 Hz)   deep sleep, regeneration
#   theta   (4–8 Hz)     deep meditation, creativity
#   alpha   (8–12 Hz)    calm focus, relaxed awareness
#   low beta (12–15 Hz)  active thinking, problem solving
#   beta    (15–20 Hz)   alert, engaged, sharp

SESSIONS = [
    {
        "id": "01-sleep",
        "title": "Sleep",
        "chapter": 5,
        "solfeggio": [528.0],
        "carrier": 200.0,
        "offset": 0.5,
        "sub_bass": 40.0,
        "length_min": 5,
        "brainwave": "delta",
        "instruction": "Lie down. Close your eyes. Don't try to fall asleep — let the tones pull you there.",
    },
    {
        "id": "02-deep-sleep",
        "title": "Deep Sleep",
        "chapter": 5,
        "solfeggio": [285.0],
        "carrier": 180.0,
        "offset": 1.0,
        "sub_bass": 35.0,
        "length_min": 5,
        "brainwave": "delta",
        "instruction": "For the middle of the night, when you wake at 3am and need to drop back under. Headphones on, eyes closed.",
    },
    {
        "id": "03-morning-reset",
        "title": "Morning Reset",
        "chapter": 6,
        "solfeggio": [396.0],
        "carrier": 220.0,
        "offset": 4.0,
        "sub_bass": 50.0,
        "length_min": 5,
        "brainwave": "theta",
        "instruction": "First 5 minutes of your day. Before phone. Before mirror. Sit, headphones, breathe.",
    },
    {
        "id": "04-anxiety-release",
        "title": "Anxiety Release",
        "chapter": 7,
        "solfeggio": [417.0],
        "carrier": 220.0,
        "offset": 6.0,
        "sub_bass": 55.0,
        "length_min": 5,
        "brainwave": "low alpha",
        "instruction": "When the chest tightens and the to-do list starts to scroll in your head. Anywhere. Headphones in, eyes soft.",
    },
    {
        "id": "05-focus",
        "title": "Focus",
        "chapter": 8,
        "solfeggio": [417.0],
        "carrier": 220.0,
        "offset": 12.0,
        "sub_bass": 0,
        "length_min": 5,
        "brainwave": "alpha",
        "instruction": "Deep work block. Use between Pomodoros to keep the rhythm going when the timer ends.",
    },
    {
        "id": "05b-focus-25",
        "title": "Focus (25 min)",
        "chapter": 8,
        "solfeggio": [417.0],
        "carrier": 220.0,
        "offset": 12.0,
        "sub_bass": 0,
        "length_min": 25,
        "brainwave": "alpha",
        "tier": "extended",
        "instruction": "The long version. For full deep-work blocks. Pomodoro is 25 min — match the rhythm.",
    },
    {
        "id": "06-deep-work",
        "title": "Deep Work",
        "chapter": 8,
        "solfeggio": [417.0, 852.0],
        "carrier": 220.0,
        "offset": 14.0,
        "sub_bass": 60.0,
        "length_min": 5,
        "brainwave": "low beta",
        "instruction": "For the hardest problem of the day. Headphones mandatory. Close every other tab.",
    },
    {
        "id": "06b-deep-work-25",
        "title": "Deep Work (25 min)",
        "chapter": 8,
        "solfeggio": [417.0, 852.0],
        "carrier": 220.0,
        "offset": 14.0,
        "sub_bass": 60.0,
        "length_min": 25,
        "brainwave": "low beta",
        "tier": "extended",
        "instruction": "The long version. 25 minutes of low-beta 14 Hz with the 417+852 stack. Headphones mandatory. Close every other tab. Don't touch the keyboard until the timer ends.",
    },
    {
        "id": "07-energy",
        "title": "Second Wind",
        "chapter": 9,
        "solfeggio": [528.0],
        "carrier": 200.0,
        "offset": 8.0,
        "sub_bass": 0,
        "length_min": 5,
        "brainwave": "alpha",
        "instruction": "3pm dip. Don't reach for the third coffee. Headphones, sit upright, breathe twice as long out as in.",
    },
    {
        "id": "08-creative-spark",
        "title": "Creative Spark",
        "chapter": 10,
        "solfeggio": [396.0, 741.0],
        "carrier": 220.0,
        "offset": 6.0,
        "sub_bass": 0,
        "length_min": 5,
        "brainwave": "theta",
        "instruction": "Use before a brainstorm or when the blank page is staring back. Pen in hand. Don't judge what comes out.",
    },
    {
        "id": "09-connection",
        "title": "Connection",
        "chapter": 11,
        "solfeggio": [639.0],
        "carrier": 200.0,
        "offset": 10.0,
        "length_min": 5,
        "brainwave": "alpha",
        "instruction": "Before a hard conversation. Don't script — just listen first. The 639 puts you in the headspace where listening happens.",
    },
    {
        "id": "10-intuition",
        "title": "Intuition",
        "chapter": 12,
        "solfeggio": [741.0],
        "carrier": 200.0,
        "offset": 12.0,
        "length_min": 5,
        "brainwave": "high alpha",
        "instruction": "When you have a decision to make and the spreadsheets aren't telling you anything. Sit, breathe, ask the question out loud. Listen for the next 5 minutes.",
    },
    {
        "id": "11-evening-review",
        "title": "Evening Review",
        "chapter": 13,
        "solfeggio": [852.0],
        "carrier": 200.0,
        "offset": 14.0,
        "length_min": 5,
        "brainwave": "low beta",
        "instruction": "End of day. Open the journal. Three sentences: what shipped, what didn't, what's the one thing tomorrow.",
    },
    {
        "id": "12-pre-pitch",
        "title": "Pre-Pitch",
        "chapter": 14,
        "solfeggio": [963.0],
        "carrier": 180.0,
        "offset": 18.0,
        "length_min": 5,
        "brainwave": "beta",
        "instruction": "Five minutes before the call that matters. Headphones in. Slow exhale. The 963 won't calm you down — it will sharpen you up.",
    },
]


# ----- DSP -------------------------------------------------------------------

def generate_session(sess):
    """Generate a single stereo session as float32 [-1.0, 0.0] in chunks.

    Memory note: a 25-min stereo float32 array is 25*60*44100*2*4 = 530 MB,
    so we write the WAV in 60-second chunks to keep peak RAM around 50 MB.
    """
    length_sec = sess["length_min"] * 60
    n_total = int(SR * length_sec)
    chunk_sec = 60
    chunk_n = int(SR * chunk_sec)

    carrier = sess["carrier"]
    offset = sess["offset"]
    solfeggio_amp = 0.4

    # === Envelope: 10 s ease-in, 15 s ease-out ==============================
    fade_in = int(10 * SR)
    fade_out = int(15 * SR)

    # Open the WAV file for streaming writes
    wav_path = OUT_DIR / f"{sess['id']}.tmp.wav"
    out = sf.SoundFile(wav_path, mode='w', samplerate=SR, channels=2, subtype='FLOAT')

    samples_written = 0
    while samples_written < n_total:
        n_this = min(chunk_n, n_total - samples_written)
        # Local time for this chunk, starting from the global sample index
        # so the sine waves are phase-continuous across chunks.
        t_local_start = samples_written / SR
        t = (t_local_start + np.arange(n_this) / SR).astype(np.float32)

        # === Binaural carrier (L = carrier, R = carrier + offset) =============
        left = np.sin(2 * np.pi * carrier * t, dtype=np.float32)
        right = np.sin(2 * np.pi * (carrier + offset) * t, dtype=np.float32)

        # === Solfeggio layers (mono, mixed into both channels at -8 dB) =====
        for f in sess["solfeggio"]:
            sol_L = np.sin(2 * np.pi * f * t, dtype=np.float32)
            sol_R = np.sin(2 * np.pi * (f + 0.05) * t, dtype=np.float32)
            left = left + solfeggio_amp * sol_L
            right = right + solfeggio_amp * sol_R

        # === Sub-bass layer (mono, at -12 dB) ================================
        if sess.get("sub_bass", 0) > 0:
            sub_amp = 0.25
            sub = np.sin(2 * np.pi * sess["sub_bass"] * t, dtype=np.float32)
            left = left + sub_amp * sub
            right = right + sub_amp * sub

        # === Normalize to peak 0.9 (leaves headroom for envelope edges) =====
        peak = max(float(np.max(np.abs(left))), float(np.max(np.abs(right))))
        if peak > 0:
            left = left * (0.9 / peak)
            right = right * (0.9 / peak)

        # === Apply envelope: full amplitude in the body, fades at edges =====
        # Global sample indices for this chunk
        g_start = samples_written
        g_end = samples_written + n_this

        env = np.ones(n_this, dtype=np.float32)
        # Ease-in: global samples [0, fade_in)
        if g_start < fade_in:
            in_start = g_start
            in_end = min(g_end, fade_in)
            idx = np.arange(in_start, in_end, dtype=np.float32)
            env_in = 0.5 * (1 - np.cos(np.pi * idx / fade_in))
            env[: in_end - g_start] = env_in.astype(np.float32)
        # Ease-out: global samples [n_total - fade_out, n_total)
        if g_end > n_total - fade_out:
            out_start = max(g_start, n_total - fade_out)
            out_end = g_end
            local_offset = out_start - g_start
            n_out = out_end - out_start
            idx = np.arange(out_start - (n_total - fade_out), out_start - (n_total - fade_out) + n_out, dtype=np.float32)
            env_out = (0.5 * (1 + np.cos(np.pi * idx / fade_out))).astype(np.float32)
            env[local_offset : local_offset + n_out] = env_out

        left = left * env
        right = right * env

        stereo = np.column_stack([left, right]).astype(np.float32)
        out.write(stereo)
        samples_written += n_this

    out.close()
    return wav_path


# ----- Main ------------------------------------------------------------------

def main():
    print(f"Output dir: {OUT_DIR}")
    print(f"Sample rate: {SR} Hz · Bit depth: {BITS} · MP3: {MP3_BITRATE}\n")

    manifest = {
        "version": "1.0.0",
        "title": "The Rulio Qi Method — 12 Free Sessions",
        "description": "Binaural-beat and solfeggio frequency sessions for sleep, focus, energy, and creative flow.",
        "disclaimer": "Not a medical device. Not a treatment for any condition. Headphones required.",
        "sample_rate": SR,
        "bit_depth": BITS,
        "channels": 2,
        "mp3_bitrate": MP3_BITRATE,
        "format": "mp3",
        "generated_by": "qi-sessions/generate.py",
        "sessions": [],
    }

    for sess in SESSIONS:
        print(f"  · {sess['id']:<20} {sess['title']:<24} {sess['length_min']} min")

        # Stream-write WAV in chunks, then convert to MP3
        wav_path = generate_session(sess)
        mp3_path = OUT_DIR / f"{sess['id']}.mp3"
        cmd = (
            f"ffmpeg -y -loglevel error "
            f"-i {wav_path} "
            f"-codec:a libmp3lame -b:a {MP3_BITRATE} "
            f"{mp3_path}"
        )
        os.system(cmd)
        wav_path.unlink()

        size_bytes = mp3_path.stat().st_size

        manifest["sessions"].append({
            "id": sess["id"],
            "title": sess["title"],
            "chapter": sess["chapter"],
            "solfeggio_hz": sess["solfeggio"],
            "carrier_hz": sess["carrier"],
            "binaural_offset_hz": sess["offset"],
            "sub_bass_hz": sess.get("sub_bass", 0),
            "length_min": sess["length_min"],
            "brainwave_band": sess["brainwave"],
            "tier": sess.get("tier", "free"),
            "instruction": sess["instruction"],
            "filename": f"{sess['id']}.mp3",
            "size_bytes": size_bytes,
        })

    with open(MANIFEST_PATH, "w") as f:
        json.dump(manifest, f, indent=2)

    total_size = sum(s["size_bytes"] for s in manifest["sessions"])
    total_min = sum(s["length_min"] for s in manifest["sessions"])
    print(f"\nDone. {len(manifest['sessions'])} sessions · {total_min} min total · "
          f"{total_size / 1024 / 1024:.1f} MB")
    print(f"Manifest → {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
