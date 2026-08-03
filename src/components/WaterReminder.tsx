import { useEffect, useState } from "react";
import { WATER_REMINDERS } from "../data/site";

export function WaterReminder() {
  const [visible, setVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const showTimer = window.setTimeout(() => setVisible(true), 4000);

    const cycleTimer = window.setInterval(() => {
      setMessageIndex((i) => (i + 1) % WATER_REMINDERS.length);
    }, 12000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearInterval(cycleTimer);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  return (
    <aside
      className="water-reminder fixed bottom-24 right-4 z-50 max-w-xs md:bottom-8 md:right-8"
      role="status"
      aria-live="polite"
    >
      <div className="water-reminder-inner rounded-sm border-2 border-volt/40 bg-charcoal-light/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-start gap-3">
          <span className="text-2xl" aria-hidden="true">
            💧
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-[0.2em] text-volt uppercase">
              Hydration Advisory
            </p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-300">
              {WATER_REMINDERS[messageIndex]}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="shrink-0 text-zinc-500 transition hover:text-white"
            aria-label="Dismiss hydration reminder"
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
}
