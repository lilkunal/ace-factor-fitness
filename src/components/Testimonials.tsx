import { TESTIMONIALS } from "../data/site";

export function Testimonials() {
  return (
    <section id="reviews" className="relative border-y border-volt/10 bg-charcoal-light py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="reveal text-center font-display text-6xl text-white md:text-7xl">
          5.0★ MEMBERS
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <blockquote key={item.name} className="reveal glass-card rounded-sm p-6 text-center">
              <div className="flex justify-center gap-1 text-2xl text-volt" aria-label={`${item.rating} stars`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="mt-4 font-display text-xl text-white">&ldquo;{item.text}&rdquo;</p>
              <footer className="mt-3 text-xs font-bold tracking-widest text-zinc-500 uppercase">
                {item.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
