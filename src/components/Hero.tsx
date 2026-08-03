import { BRAND, HERO_VIDEO, SECTION_BACKGROUNDS, STATS, STOCK_IMAGES } from "../data/site";
import { ShaderBackground } from "./ShaderBackground";
import { HeroStrokeAccent } from "./HeroStrokeAccent";
import { Link } from "react-router-dom";

const LEGACY_CHARS = "LEGACY".split("");

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden gym-grid stripe-pattern">
      <img
        src={SECTION_BACKGROUNDS.gokuHero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ objectPosition: "center 20%" }}
      />
      <ShaderBackground />

      <video
        className="absolute inset-0 h-full w-full object-cover opacity-10"
        autoPlay
        muted
        loop
        playsInline
        poster={STOCK_IMAGES.heroAthlete}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/75 to-charcoal/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/30" />

      <div className="relative mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-10 px-4 pb-20 pt-28 md:grid-cols-2 md:px-6">
        <div className="relative max-w-xl">
          <HeroStrokeAccent />
          <p className="hero-label section-label opacity-0">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-volt" />
            {BRAND.rating}★ · {BRAND.location}
          </p>

          <h1 className="mt-6 font-display text-6xl leading-[0.9] text-white opacity-0 sm:text-8xl md:text-9xl">
            <span className="hero-line block opacity-0">BUILD</span>
            <span className="hero-line block opacity-0">YOUR</span>
            <span className="hero-line mt-1 block volt-gradient-text opacity-0">
              {LEGACY_CHARS.map((char, i) => (
                <span key={i} className="hero-char inline-block opacity-0">
                  {char}
                </span>
              ))}
            </span>
          </h1>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/plans" className="hero-cta btn-power opacity-0">
              View Plans
            </Link>
            <Link to="/gallery" className="hero-cta btn-outline opacity-0">
              See The Gym →
            </Link>
          </div>

          <dl className="hero-stats mt-12 grid grid-cols-4 gap-3 border-t-2 border-volt/20 pt-8 opacity-0">
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
                <dd className="mt-1 text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-image relative hidden opacity-0 md:block">
          <div className="hero-athlete-frame relative overflow-hidden border-2 border-volt/30">
            <img
              src={SECTION_BACKGROUNDS.gokuFocus}
              alt="Focused training"
              className="aspect-[3/4] w-full object-cover object-center"
              style={{ objectPosition: "center 15%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 border-2 border-volt bg-volt px-6 py-3 font-display text-3xl text-charcoal">
            #1
          </div>
        </div>
      </div>
    </section>
  );
}
