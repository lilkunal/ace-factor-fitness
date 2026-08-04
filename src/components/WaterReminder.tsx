import { useEffect, useRef, useState } from "react";
import { WATER_REMINDERS } from "../data/site";

/** Soft “pop” using Web Audio — no external file, works offline. */
function playBubblePop() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
    window.setTimeout(() => void ctx.close(), 300);
  } catch {
    /* autoplay / unsupported — ignore */
  }
}

export function WaterReminder() {
  const [visible, setVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const playedRef = useRef(false);

  useEffect(() => {
    if (dismissed) return;

    const showTimer = window.setTimeout(() => {
      setVisible(true);
      if (!playedRef.current) {
        playedRef.current = true;
        playBubblePop();
      }
    }, 5000);

    const cycleTimer = window.setInterval(() => {
      setMessageIndex((i) => (i + 1) % WATER_REMINDERS.length);
    }, 16000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearInterval(cycleTimer);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  return (
    <aside
      className="water-reminder fixed bottom-[5.5rem] left-3 z-40 max-w-[min(220px,calc(100vw-5.5rem))] md:bottom-10 md:left-auto md:right-24"
      role="status"
      aria-live="polite"
    >
      <div className="water-bubble relative rounded-full border border-volt/25 bg-charcoal/55 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-5 sm:py-4">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-volt/20 bg-charcoal/70 text-xs text-zinc-400 backdrop-blur-sm transition hover:text-white"
          aria-label="Dismiss"
        >
          ✕
        </button>
        <div className="flex items-center gap-2.5">
          <span className="text-lg opacity-90 sm:text-xl" aria-hidden="true">
            💧
          </span>
          <p className="text-xs leading-snug text-zinc-200/90 sm:text-sm">{WATER_REMINDERS[messageIndex]}</p>
        </div>
      </div>
    </aside>
  );
}
