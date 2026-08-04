import { Link } from "react-router-dom";
import { BRAND, STATS, STOCK_IMAGES, SECTION_BACKGROUNDS } from "../data/site";
import { ShaderBackground } from "./ShaderBackground";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-charcoal">
      {/* Full-bleed gym athlete — properly oriented landscape photo */}
      <img
        src={STOCK_IMAGES.heroAthlete}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <ShaderBackground />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/30" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center gap-10 px-4 pb-16 pt-28 md:grid md:grid-cols-2 md:items-center md:gap-12 md:px-6">
        {/* Copy — left aligned, always visible */}
        <div className="max-w-xl">
          <p className="hero-label section-label max-w-full truncate">
            <span className="h-2 w-2 shrink-0 animate-pulse-glow rounded-full bg-volt" />
            {BRAND.rating}★ · Aligarh
          </p>

          <h1 className="mt-6 break-words font-display text-[clamp(2.75rem,11vw,6.5rem)] leading-[0.92] text-white">
            <span className="hero-line block">BUILD</span>
            <span className="hero-line block">YOUR</span>
            <span className="hero-line mt-1 block volt-gradient-text">LEGACY</span>
          </h1>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/plans" className="hero-cta btn-power">
              View Plans
            </Link>
            <Link to="/gallery" className="hero-cta btn-outline">
              See The Gym →
            </Link>
          </div>

          <dl className="hero-stats mt-12 grid grid-cols-2 gap-4 border-t-2 border-volt/20 pt-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl text-volt sm:text-4xl">
                  {stat.count !== null ? (
                    <span data-count={stat.count} data-suffix={stat.countSuffix}>
                      0{stat.countSuffix}
                    </span>
                  ) : (
                    stat.value
                  )}
                </dt>
                <dd className="mt-1 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right panel — Bruce Lee portrait (always upright) */}
        <div className="hero-image relative mx-auto hidden w-full max-w-md md:block lg:max-w-lg">
          <div className="overflow-hidden rounded-sm border-2 border-volt/40 bg-white shadow-[0_0_60px_rgba(245,230,66,0.15)]">
            <img
              src={SECTION_BACKGROUNDS.bruceLee}
              alt="Discipline — 1% every day"
              className="aspect-[3/4] w-full object-cover object-bottom"
            />
          </div>
          <div className="absolute -bottom-3 -left-3 border-2 border-volt bg-volt px-5 py-2 font-display text-2xl text-charcoal">
            #1
          </div>
        </div>
      </div>
    </section>
  );
}
