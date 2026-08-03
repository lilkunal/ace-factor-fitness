import { useEffect, useState } from "react";
import { animate } from "animejs";
import type { CoachMotivation as CoachMotivationData } from "../data/coaches";

type CoachMotivationProps = {
  motivation: CoachMotivationData;
  coachName: string;
};

export function CoachMotivation({ motivation, coachName }: CoachMotivationProps) {
  const [index, setIndex] = useState(0);
  const pulseLines = motivation.pulseLines;

  useEffect(() => {
    if (pulseLines.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % pulseLines.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [pulseLines.length]);

  useEffect(() => {
    const el = document.querySelector(".coach-pulse-word");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    animate(el, {
      opacity: [0, 1],
      scale: [0.96, 1],
      y: [16, 0],
      duration: 500,
      ease: "out(4)",
    });
  }, [index]);

  return (
    <section className="border-t border-volt/10 bg-charcoal-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="reveal mb-10">
          <p className="text-xs font-bold tracking-[0.3em] text-volt uppercase">Philosophy</p>
          <h2 className="mt-2 font-display text-4xl text-white md:text-5xl">Coach Mindset</h2>
        </div>

        <div className="reveal relative overflow-hidden rounded-sm border-2 border-volt/20 bg-charcoal p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-volt/5 via-transparent to-power/5" />
          <blockquote className="relative">
            <p className="font-display text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
              &ldquo;{motivation.quote}&rdquo;
            </p>
            <footer className="mt-6 text-sm font-semibold tracking-wide text-volt uppercase">
              {motivation.attribution}
            </footer>
          </blockquote>
        </div>

        <ul className="reveal mt-10 grid gap-4 sm:grid-cols-2">
          {motivation.mantras.map((mantra) => (
            <li
              key={mantra}
              className="flex items-start gap-3 rounded-sm border border-volt/10 bg-charcoal px-5 py-4"
            >
              <span className="mt-0.5 text-volt" aria-hidden="true">
                ◆
              </span>
              <span className="text-base text-zinc-300">{mantra}</span>
            </li>
          ))}
        </ul>

        {pulseLines.length > 0 && (
          <div className="reveal relative mt-12 overflow-hidden rounded-sm border border-volt/15 py-10 md:py-14">
            <div className="absolute inset-0 bg-gradient-to-r from-volt/10 via-transparent to-power/10" />
            <div className="relative px-4 text-center md:px-6">
              <p className="text-[10px] font-bold tracking-[0.4em] text-volt/70 uppercase">
                From {coachName.split(" ")[0]}&rsquo;s playbook
              </p>
              <p
                key={index}
                className="coach-pulse-word mt-4 font-display text-4xl leading-none text-white sm:text-5xl md:text-6xl"
              >
                {pulseLines[index]}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
