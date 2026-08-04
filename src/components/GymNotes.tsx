import { useEffect, useState } from "react";
import { GYM_NOTES } from "../data/blogs";

/** Floating gym-floor notes — etiquette tips that cycle across the site. */
export function GymNotes() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [side, setSide] = useState<"left" | "right">("left");

  useEffect(() => {
    if (dismissed) return;

    const showTimer = window.setTimeout(() => setVisible(true), 6000);

    const cycleTimer = window.setInterval(() => {
      setIndex((i) => (i + 1) % GYM_NOTES.length);
      setSide((s) => (s === "left" ? "right" : "left"));
    }, 14000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearInterval(cycleTimer);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const note = GYM_NOTES[index]!;

  return (
    <aside
      className={`gym-note fixed z-40 max-w-[280px] transition-all duration-500 ${
        side === "left" ? "bottom-28 left-4 md:bottom-10 md:left-8" : "bottom-40 right-4 md:bottom-28 md:right-24"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="gym-note-inner rounded-sm border-2 border-volt/35 bg-charcoal/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-start gap-3">
          <span className="text-2xl" aria-hidden="true">
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
