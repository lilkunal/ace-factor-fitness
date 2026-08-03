import { Link } from "react-router-dom";
import { BRAND, STOCK_IMAGES } from "../data/site";

const PUNCHES = ["5 AM OPENS", "100+ MACHINES", "VIVA FITNESS", "ZERO LIMITS"];

export function About() {
  return (
    <section id="about" className="relative border-y-2 border-volt/15 bg-charcoal-light py-16 md:py-24">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
        <div className="relative overflow-hidden rounded-sm border-2 border-volt/25">
          <img
            src={STOCK_IMAGES.aboutGym}
            alt="Ace Factor Fitness interior"
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/50 to-transparent" />
        </div>

        <div>
          <h2 className="reveal font-display text-6xl text-white md:text-7xl">
            BIGGEST GYM.
            <span className="mt-1 block volt-gradient-text">BIGGEST ENERGY.</span>
          </h2>

          <div className="reveal mt-8 grid grid-cols-2 gap-3">
            {PUNCHES.map((p) => (
              <div
                key={p}
                className="border-2 border-volt/25 bg-volt/5 px-4 py-3 text-center font-display text-lg tracking-wide text-volt md:text-xl"
              >
                {p}
              </div>
            ))}
          </div>

          <div className="reveal mt-8 flex flex-wrap items-center gap-4">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-xl text-white hover:text-volt"
            >
              {BRAND.instagramHandle} →
            </a>
            <Link to="/gallery" className="text-sm font-bold tracking-wide text-volt uppercase hover:text-gold">
              See the gym →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
