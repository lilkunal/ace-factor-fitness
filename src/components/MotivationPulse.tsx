import { useEffect, useState } from "react";
import { animate } from "animejs";
import { MOTIVATION_PUNCHES } from "../data/site";

export function MotivationPulse() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % MOTIVATION_PUNCHES.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = document.querySelector(".motivation-word");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    animate(el, {
      opacity: [0, 1],
      scale: [0.92, 1],
      y: [24, 0],
      duration: 600,
      ease: "out(4)",
    });
  }, [index]);

  return (
    <section className="motivation-pulse relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-volt/10 via-transparent to-power/10" />
      <div className="relative mx-auto max-w-5xl px-4 text-center md:px-6">
        <p className="text-[10px] font-bold tracking-[0.4em] text-volt/70 uppercase">Your move</p>
        <h2
          key={index}
          className="motivation-word mt-4 font-display text-6xl leading-none text-white sm:text-8xl md:text-9xl"
        >
          {MOTIVATION_PUNCHES[index]}
        </h2>
      </div>
    </section>
  );
}
