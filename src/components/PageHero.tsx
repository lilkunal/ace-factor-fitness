type PageHeroProps = {
  image: string;
  title: string;
  subtitle?: string;
  /** CSS object-position, e.g. "center top" */
  objectPosition?: string;
  className?: string;
};

/**
 * Consistent page banner: full-bleed cover image, strong gradient,
 * title + subtitle left-aligned in a fixed content column.
 */
export function PageHero({
  image,
  title,
  subtitle,
  objectPosition = "center center",
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`page-hero relative flex min-h-[48vh] items-end overflow-hidden sm:min-h-[52vh] ${className}`}
      aria-label={title}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
      />
      {/* Readable overlays — left-weighted so title always sits on dark */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-28 md:px-6 md:pb-16">
        <h1 className="page-hero-title font-display text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {title}
        </h1>
        {subtitle && (
          <p className="page-hero-sub mt-4 max-w-xl text-base font-medium leading-relaxed text-zinc-300 sm:text-lg">
            {subtitle}
          </p>
        )}
        <div className="mt-6 h-1 w-16 bg-volt" aria-hidden="true" />
      </div>
    </section>
  );
}
