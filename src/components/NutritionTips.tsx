import { WELLNESS_TIPS } from "../data/site";
import { Carousel } from "./Carousel";

type NutritionTipsProps = {
  showHeader?: boolean;
};

export function NutritionTips({ showHeader = true }: NutritionTipsProps) {
  return (
    <section id="wellness" className="relative border-y-2 border-volt/15 bg-charcoal-light py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {showHeader && (
          <h2 className="section-header text-center font-display text-6xl text-white md:text-7xl">
            FUEL THE MACHINE
          </h2>
        )}

        <Carousel className={showHeader ? "mt-12" : ""} ariaLabel="Wellness tips" autoPlayMs={6000}>
          {WELLNESS_TIPS.map((tip) => (
            <article
              key={tip.id}
              className="tip-card flex w-[280px] flex-col items-center rounded-sm border-2 border-volt/20 bg-charcoal p-8 text-center sm:w-[320px]"
            >
              <span className="text-5xl" aria-hidden="true">
                {tip.icon}
              </span>
              <h3 className="mt-4 font-display text-3xl text-white">{tip.title}</h3>
              <p className="mt-2 text-sm font-medium text-volt">{tip.punch}</p>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
