import { Link } from "react-router-dom";
import { PLAN_FAQ, PLAN_PERKS, whatsappLink } from "../data/site";

export function PlansExtras() {
  return (
    <>
      <section className="border-t border-volt/10 bg-charcoal-light py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center font-display text-4xl text-white md:text-5xl">ALL PLANS INCLUDE</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PLAN_PERKS.map((perk) => (
              <div
                key={perk.title}
                className="rounded-sm border-2 border-volt/15 bg-charcoal p-6 text-center transition hover:border-volt/40"
              >
                <span className="text-3xl">{perk.icon}</span>
                <h3 className="mt-3 font-display text-xl text-volt">{perk.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{perk.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-volt/10 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-center font-display text-4xl text-white">QUICK COMPARE</h2>
          <div className="mt-8 overflow-hidden rounded-sm border-2 border-volt/20">
            <table className="w-full text-left text-sm">
              <thead className="bg-volt/10 text-volt">
                <tr>
                  <th className="p-4 font-bold uppercase">Feature</th>
                  <th className="p-4 text-center">Basic</th>
                  <th className="p-4 text-center">Pro</th>
                  <th className="p-4 text-center">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-volt/10 text-zinc-300">
                {[
                  ["Full gym access", true, true, true],
                  ["Locker", true, true, true],
                  ["Fitness assessment", false, true, true],
                  ["Custom workout plan", false, false, true],
                  ["Best per-month value", false, true, true],
                ].map(([feature, basic, pro, premium]) => (
                  <tr key={feature as string}>
                    <td className="p-4">{feature as string}</td>
                    <td className="p-4 text-center">{basic ? "✓" : "—"}</td>
                    <td className="p-4 text-center font-bold text-volt">{pro ? "✓" : "—"}</td>
                    <td className="p-4 text-center">{premium ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-volt/10 bg-charcoal-light py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 md:px-6">
          <h2 className="text-center font-display text-4xl text-white">FAQ</h2>
          <dl className="mt-8 space-y-4">
            {PLAN_FAQ.map((item) => (
              <div key={item.q} className="rounded-sm border-2 border-volt/15 p-5">
                <dt className="font-bold text-volt">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-zinc-400">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-volt/10 py-16 text-center md:py-20">
        <div className="mx-auto max-w-xl px-4">
          <p className="font-display text-4xl text-white">READY TO COMMIT?</p>
          <p className="mt-3 text-zinc-400">Message us on WhatsApp — we reply fast.</p>
          <a
            href={whatsappLink("Hi! I want to join Ace Factor Fitness. Please share membership details.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-power mt-8 inline-flex min-h-[52px] items-center px-10"
          >
            Join on WhatsApp
          </a>
          <p className="mt-6 text-sm text-zinc-500">
            Or <Link to="/contact" className="text-volt hover:text-gold">visit us in person →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
