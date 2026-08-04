type PageHeroProps = {
  image: string;
  title: string;
  subtitle?: string;
  objectPosition?: string;
  fit?: "cover" | "contain";
  className?: string;
};

export function PageHero({
  image,
  title,
  subtitle,
  objectPosition = "center center",
  fit = "cover",
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`page-hero relative flex min-h-[38vh] items-end overflow-hidden sm:min-h-[46vh] ${className}`}
      aria-label={title}
    >
      <div className={`absolute inset-0 ${fit === "contain" ? "bg-zinc-200" : "bg-charcoal"}`}>
        <img
          src={image}
          alt=""
          className={`absolute inset-0 h-full w-full ${
            fit === "contain" ? "object-contain object-right-bottom p-4 sm:p-8" : "object-cover"
          }`}
          style={fit === "cover" ? { objectPosition } : undefined}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-charcoal from-15% via-charcoal/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/50" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-28 md:px-6 md:pb-14">
        <h1 className="page-hero-title font-display text-[clamp(2rem,8vw,4.5rem)] leading-[0.95] tracking-wide text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="page-hero-sub mt-3 max-w-md text-sm font-medium leading-relaxed text-zinc-300 sm:text-base">
            {subtitle}
          </p>
        )}
        <div className="mt-5 h-1 w-14 bg-volt" aria-hidden="true" />
      </div>
    </section>
  );
}
