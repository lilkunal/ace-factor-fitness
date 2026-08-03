import { MARQUEE_ITEMS } from "../data/site";

export function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="marquee-wrap overflow-hidden border-y-2 border-volt/20 bg-charcoal-mist py-4">
      <div className="marquee-track flex w-max gap-12">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-2xl tracking-[0.15em] text-volt/90 md:text-3xl"
          >
            {item}
            <span className="mx-6 text-power/50">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
