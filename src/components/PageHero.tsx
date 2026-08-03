type PageHeroProps = {
  image: string;
  title: string;
  subtitle?: string;
  objectPosition?: string;
  /** Full viewport hero (home only) vs standard page banner (~45vh) */
  variant?: "page" | "full";
  className?: string;
};

export function PageHero({
  image,
  title,
  subtitle,
  objectPosition = "center",
  variant = "page",
  className = "",
}: PageHeroProps) {
  const heightClass = variant === "full" ? "min-h-[100dvh]" : "min-h-[42vh] sm:min-h-[45vh]";

  return (
    <section
      className={`page-hero relative flex items-end overflow-hidden ${heightClass} ${className}`}
      aria-label={title}
    >
      <img
        src={image}
        alt=""
        className="page-hero-bg absolute inset-0 h-full w-full object-cover object-center"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/45" />

      <svg
        className="page-hero-accent pointer-events-none absolute right-6 top-24 hidden h-24 w-24 text-volt/30 md:block lg:right-12 lg:h-32 lg:w-32"
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        <path
          className="page-hero-stroke"
          d="M60 6 L110 33 L110 87 L60 114 L10 87 L10 33 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-28 md:px-6 md:pb-14 md:pt-32">
        <h1 className="page-hero-title font-display text-5xl leading-[0.95] text-white sm:text-7xl md:text-8xl">
          {title}
        </h1>
        {subtitle && (
          <p className="page-hero-sub mt-4 max-w-2xl text-base font-medium text-zinc-300 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
