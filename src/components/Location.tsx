import { BRAND, HOURS } from "../data/site";

type LocationProps = {
  showHeader?: boolean;
};

export function Location({ showHeader = true }: LocationProps) {
  return (
    <section id="location" className="relative bg-charcoal py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {showHeader && (
          <h2 className="reveal text-center font-display text-6xl text-white md:text-7xl">FIND US</h2>
        )}

        <div className={`grid gap-8 lg:grid-cols-2 ${showHeader ? "mt-12" : ""}`}>
          <div className="reveal space-y-4">
            <div className="glass-card rounded-sm p-6">
              <p className="text-sm text-zinc-400">{BRAND.address}</p>
              <a
                href={BRAND.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-display text-lg text-volt hover:text-gold"
              >
                Google Maps →
              </a>
            </div>

            <dl className="glass-card space-y-2 rounded-sm p-6">
              {HOURS.map((row) => (
                <div key={row.day} className="flex justify-between font-display text-lg">
                  <dt className="text-zinc-500">{row.day}</dt>
                  <dd className="text-volt">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal overflow-hidden rounded-sm border border-volt/15">
            <iframe
              title="Ace Factor Fitness location"
              src="https://maps.google.com/maps?q=14%2F161+Achal+Rd+opp+D+S+College+Aligarh+202001&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="aspect-square w-full border-0 sm:aspect-[4/3]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
