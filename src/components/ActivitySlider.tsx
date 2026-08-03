import { ACTIVITIES } from "../data/site";
import { Carousel } from "./Carousel";

export function ActivitySlider() {
  return (
    <section id="programs" className="relative bg-charcoal py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="section-header text-center font-display text-6xl text-white md:text-7xl">
          SWEAT NOW
        </h2>

        <Carousel className="mt-12" ariaLabel="Training programs" autoPlayMs={5500}>
          {ACTIVITIES.map((activity) => (
            <article
              key={activity.id}
              className="activity-card group relative h-80 w-[280px] overflow-hidden rounded-sm border-2 border-volt/20 sm:w-[320px] md:h-96 md:w-[360px]"
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-bold tracking-[0.25em] text-volt uppercase">
                  {activity.subtitle}
                </p>
                <h3 className="mt-2 font-display text-4xl text-white">{activity.title}</h3>
                <div className="mt-4 h-1 w-12 bg-volt transition-all duration-300 group-hover:w-full" />
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
