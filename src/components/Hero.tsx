import { Link } from "react-router-dom";
import { BRAND, STATS, STOCK_IMAGES, SECTION_BACKGROUNDS } from "../data/site";
import { ShaderBackground } from "./ShaderBackground";

export function Hero() {
  return (
    <section className="keep-dark relative min-h-[100dvh] overflow-hidden bg-charcoal">
      <img
        src={STOCK_IMAGES.heroAthlete}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[center_20%] sm:object-center"
      />
      <ShaderBackground />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/75 to-charcoal/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-start gap-8 px-4 pb-28 pt-24 sm:justify-center sm:pb-16 sm:pt-28 md:grid md:grid-cols-2 md:items-center md:gap-12 md:px-6">
        <div className="max-w-xl">
          <p className="hero-label section-label max-w-full truncate">
            <span className="h-2 w-2 shrink-0 animate-pulse-glow rounded-full bg-volt" />
            {BRAND.rating}★ · Aligarh
          </p>

          <h1 className="mt-5 break-words font-display text-[clamp(2.35rem,10vw,6.5rem)] leading-[0.95] text-white sm:mt-6 sm:leading-[0.92]">
            <span className="hero-line block">BUILD</span>
            <span className="hero-line block">YOUR</span>
            <span className="hero-line mt-1 block volt-gradient-text">LEGACY</span>
          </h1>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-10">
            <Link to="/plans" className="hero-cta btn-power">
              View Plans
            </Link>
            <Link to="/gallery" className="hero-cta btn-outline">
              See The Gym →
            </Link>
          </div>

          <dl className="hero-stats mt-8 grid grid-cols-2 gap-4 border-t-2 border-volt/20 pt-6 sm:mt-12 sm:grid-cols-4 sm:pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl text-volt sm:text-4xl">
                  {stat.count !== null ? (
                    <span data-count={stat.count} data-suffix={stat.countSuffix}>
                      0{stat.countSuffix}
                    </span>
                  ) : (
                    stat.value
                  )}
                </dt>
                <dd className="mt-1 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

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
