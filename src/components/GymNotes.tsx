import { useEffect, useState } from "react";
import { GYM_NOTES } from "../data/blogs";

/** Floating gym-floor notes — left side only so they never collide with WhatsApp / water. */
export function GymNotes() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const showTimer = window.setTimeout(() => setVisible(true), 8000);

    const cycleTimer = window.setInterval(() => {
      setIndex((i) => (i + 1) % GYM_NOTES.length);
    }, 16000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearInterval(cycleTimer);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const note = GYM_NOTES[index]!;

  return (
    <aside
      className="gym-note fixed bottom-48 left-3 z-40 max-w-[min(260px,calc(100vw-5.5rem))] md:bottom-10 md:left-8"
      role="status"
      aria-live="polite"
    >
      <div className="gym-note-inner rounded-sm border-2 border-volt/35 bg-charcoal/95 p-3 shadow-2xl backdrop-blur-md sm:p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl sm:text-2xl" aria-hidden="true">
            {note.icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-[0.2em] text-volt uppercase">{note.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-300">{note.text}</p>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="shrink-0 text-zinc-500 transition hover:text-white"
            aria-label="Dismiss gym note"
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
}
