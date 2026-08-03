import { FACILITIES } from "../data/site";

export function Facilities() {
  return (
    <section id="facilities" className="relative bg-charcoal py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="section-header text-center font-display text-6xl text-white md:text-7xl">
          THE ARSENAL
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {FACILITIES.map((item) => (
            <article
              key={item.id}
              className="facility-card group flex flex-col items-center rounded-sm border-2 border-volt/15 bg-charcoal-light p-5 text-center transition hover:border-volt/50 hover:bg-volt/5"
            >
              <span className="text-4xl transition group-hover:scale-110" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="mt-3 font-display text-xl text-white">{item.title}</h3>
              <p className="mt-1 text-[10px] font-bold tracking-widest text-volt uppercase">
                {item.tag}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
