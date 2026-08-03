import { useCallback, useEffect, useRef, useState } from "react";
import { animate } from "animejs";

type CarouselProps = {
  children: React.ReactNode[];
  className?: string;
  ariaLabel: string;
  autoPlayMs?: number;
};

export function Carousel({ children, className = "", ariaLabel, autoPlayMs }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = children.length;

  const goTo = useCallback(
    (next: number, animated = true) => {
      const track = trackRef.current;
      if (!track || count === 0) return;

      const wrapped = ((next % count) + count) % count;
      const slide = track.children[wrapped] as HTMLElement | undefined;
      if (!slide) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (animated && !reduce) {
        animate(track, {
          scrollLeft: slide.offsetLeft,
          duration: 680,
          ease: "out(4)",
        });
      } else {
        track.scrollLeft = slide.offsetLeft;
      }

      setIndex(wrapped);
    },
    [count],
  );

  useEffect(() => {
    if (!autoPlayMs || count <= 1) return;
    const id = window.setInterval(() => goTo(index + 1, true), autoPlayMs);
    return () => window.clearInterval(id);
  }, [autoPlayMs, count, goTo, index]);

  return (
    <div className={`relative ${className}`} data-carousel aria-roledescription="carousel" aria-label={ariaLabel}>
      <div
        ref={trackRef}
        className="carousel-track flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div
            key={i}
            className="carousel-slide shrink-0 snap-start"
            aria-hidden={i !== index}
          >
            {child}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            className="carousel-btn"
            onClick={() => goTo(index - 1)}
            aria-label="Previous slide"
          >
            ←
          </button>

          <div className="flex gap-2">
            {children.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel-dot ${i === index ? "is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            className="carousel-btn"
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
