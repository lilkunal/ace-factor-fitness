import { Link } from "react-router-dom";
import { whatsappLink } from "../data/site";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-charcoal-light py-16 md:py-24">
      <div className="absolute inset-0 stripe-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-volt/10 via-transparent to-power/5" />

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="reveal font-display text-7xl text-white md:text-9xl">READY?</h2>
        <p className="reveal mt-4 text-zinc-400">Pick a plan. Show up. Build the habit.</p>
        <div className="reveal mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/plans" className="btn-power btn-interactive">
            View Plans
          </Link>
          <Link to="/contact" className="btn-outline btn-interactive">
            Get Directions →
          </Link>
        </div>
        <a
          href={whatsappLink("Hi! I want to join Ace Factor Fitness.")}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal link-slide mt-6 inline-block text-sm font-bold tracking-wide text-volt uppercase hover:text-gold"
        >
          Or message on WhatsApp →
        </a>
      </div>
    </section>
  );
}
