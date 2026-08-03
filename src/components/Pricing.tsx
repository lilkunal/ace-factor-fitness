import { Link } from "react-router-dom";
import { PLANS, whatsappLink } from "../data/site";

type PricingProps = {
  showHeader?: boolean;
};

export function Pricing({ showHeader = true }: PricingProps) {
  return (
    <section id="pricing" className="relative stripe-pattern bg-charcoal py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {showHeader && (
          <>
            <h2 className="section-header text-center font-display text-6xl text-white md:text-7xl">
              PICK YOUR PLAN
            </h2>
            <p className="mt-3 text-center text-sm text-zinc-500">Updated for 2026</p>
          </>
        )}

        {!showHeader && (
          <p className="mb-8 text-center text-sm font-semibold tracking-widest text-zinc-500 uppercase">
            Updated for 2026
          </p>
        )}

        <div className={`grid gap-6 md:grid-cols-3 ${showHeader ? "mt-12" : ""}`}>
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`pricing-card glass-card relative flex flex-col rounded-sm p-8 transition duration-300 ${
                plan.popular
                  ? "pricing-popular pricing-card-featured"
                  : "card-hover"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-volt px-5 py-1.5 text-xs font-bold tracking-wider text-charcoal uppercase">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-3xl text-white">{plan.name}</h3>
              <p className="mt-2">
                {plan.oldPrice && (
                  <span className="mr-2 text-sm text-zinc-600 line-through">{plan.oldPrice}</span>
                )}
                <span className="font-display text-5xl text-volt">{plan.price}</span>
                <span className="ml-2 text-sm font-medium text-zinc-500">{plan.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm font-medium text-zinc-300">
                    <span className="mt-0.5 font-bold text-volt">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink(`Hi! I'm interested in the ${plan.name} membership at Ace Factor Fitness.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 block rounded-sm py-4 text-center text-sm font-bold tracking-wider uppercase transition ${
                  plan.popular
                    ? "btn-power"
                    : "border-2 border-volt/40 text-volt hover:border-volt hover:bg-volt/10"
                }`}
              >
                Get Started
              </a>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-zinc-500">
          Questions?{" "}
          <Link to="/contact" className="font-semibold text-volt hover:text-gold">
            Talk to us →
          </Link>
        </p>
      </div>
    </section>
  );
}
