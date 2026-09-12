'use client';

import { useState, useRef, useEffect } from 'react';

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
  tier: 'free' | 'extended';
  instruction: string;
  filename: string;
  size_bytes: number;
};

const BAND_LABELS: Record<string, string> = {
  delta: 'Sleep (delta)',
  theta: 'Meditation (theta)',
  'low alpha': 'Calm (low alpha)',
  alpha: 'Focus (alpha)',
  'high alpha': 'Insight (high alpha)',
  'low beta': 'Active (low beta)',
  beta: 'Alert (beta)',
};

const BAND_ORDER: Record<string, number> = {
  delta: 0,
  theta: 1,
  'low alpha': 2,
  alpha: 3,
  'high alpha': 4,
  'low beta': 5,
  beta: 6,
};

function formatHz(hz: number[]): string {
  if (hz.length === 1) return `${hz[0]} Hz`;
  return hz.map((f) => f).join(' + ') + ' Hz';
}

function formatBand(b: string): string {
  return BAND_LABELS[b] ?? b;
}

function formatSize(b: number): string {
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

export default function QiPlayer({
  sessions,
  audioBase,
}: {
  sessions: Session[];
  audioBase: string;
}) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Build the list of bands present in these sessions
  const bands = Array.from(new Set(sessions.map((s) => s.brainwave_band))).sort(
    (a, b) => BAND_ORDER[a] - BAND_ORDER[b]
  );

  const filtered = activeFilter === 'all'
    ? sessions
    : sessions.filter((s) => s.brainwave_band === activeFilter);

  // Sorted by chapter then by id for stable order
  const sorted = [...filtered].sort((a, b) => {
    if (a.chapter !== b.chapter) return a.chapter - b.chapter;
    return a.id.localeCompare(b.id);
  });

  function play(session: Session) {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
      });
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) setDuration(audioRef.current.duration);
      });
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
      audioRef.current.addEventListener('play', () => setIsPlaying(true));
    }
    const a = audioRef.current;
    if (currentId === session.id) {
      if (a.paused) a.play(); else a.pause();
      return;
    }
    a.src = `${audioBase}/audio/${session.filename}`;
    a.play();
    setCurrentId(session.id);
  }

  function togglePlay() {
    const a = audioRef.current;
    if (!a || !currentId) return;
    if (a.paused) a.play(); else a.pause();
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const currentSession = currentId
    ? sessions.find((s) => s.id === currentId) ?? null
    : null;

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveFilter('all')}
          className={
            'text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition ' +
            (activeFilter === 'all'
              ? 'border-[#5BB8FF] text-[#8FD1FF] bg-[#5BB8FF]/10'
              : 'border-white/10 text-[#a1a1aa] hover:text-[#f4f1ea] hover:border-white/20')
          }
        >
          All ({sessions.length})
        </button>
        {bands.map((b) => (
          <button
            key={b}
            onClick={() => setActiveFilter(b)}
            className={
              'text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition ' +
              (activeFilter === b
                ? 'border-[#5BB8FF] text-[#8FD1FF] bg-[#5BB8FF]/10'
                : 'border-white/10 text-[#a1a1aa] hover:text-[#f4f1ea] hover:border-white/20')
            }
          >
            {formatBand(b)} ({sessions.filter((s) => s.brainwave_band === b).length})
          </button>
        ))}
      </div>

      {/* Session list */}
      <div className="space-y-2">
        {sorted.map((s) => {
          const isActive = currentId === s.id;
          return (
            <div
              key={s.id}
              className={
                'grid grid-cols-[auto_1fr_auto] gap-4 items-center p-4 rounded-lg border transition ' +
                (isActive
                  ? 'border-[#5BB8FF]/40 bg-[#5BB8FF]/5'
                  : 'border-white/8 bg-white/2 hover:border-white/15 hover:bg-white/3')
              }
            >
              <div className="font-mono text-xs text-[#a1a1aa] tracking-widest">
                {s.id.split('-')[0]}
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-lg leading-tight">{s.title}</h3>
                <p className="text-sm text-[#a1a1aa] mt-0.5 line-clamp-2">
                  {s.instruction}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-wider">
                  <span className="px-1.5 py-0.5 rounded bg-[#5BB8FF]/10 text-[#8FD1FF]">
                    {formatHz(s.solfeggio_hz)}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-[#a1a1aa]">
                    Δ {s.binaural_offset_hz} Hz
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-[#a1a1aa]">
                    {formatBand(s.brainwave_band)}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-[#a1a1aa]">
                    {s.length_min}:00
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-[#a1a1aa]">
                    {formatSize(s.size_bytes)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`${audioBase}/audio/${s.filename}`}
                  download
                  className="w-9 h-9 grid place-items-center rounded-full border border-white/10 text-[#a1a1aa] hover:text-[#f4f1ea] hover:border-white/20 transition"
                  title="Download MP3"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                </a>
                <button
                  onClick={() => play(s)}
                  className={
                    'w-11 h-11 grid place-items-center rounded-full border transition ' +
                    (isActive && isPlaying
                      ? 'border-[#5BB8FF] bg-[#5BB8FF] text-[#0c0c0e]'
                      : 'border-white/15 text-[#f4f1ea] hover:border-[#5BB8FF] hover:text-[#5BB8FF]')
                  }
                  aria-label={`Play ${s.title}`}
                >
                  {isActive && isPlaying ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky now-playing bar */}
      {currentSession && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c0e]/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 grid place-items-center rounded-full border border-[#5BB8FF] text-[#5BB8FF] hover:bg-[#5BB8FF] hover:text-[#0c0c0e] transition shrink-0"
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">
                Now playing
              </div>
              <div className="font-serif text-sm truncate">
                {currentSession.title} ·{' '}
                <span className="text-[#8FD1FF]">{formatHz(currentSession.solfeggio_hz)}</span>
              </div>
            </div>
            <div className="flex-1 max-w-md hidden sm:block">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5BB8FF] transition-all"
                  style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                />
              </div>
            </div>
            <div className="font-mono text-xs text-[#a1a1aa] shrink-0">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
