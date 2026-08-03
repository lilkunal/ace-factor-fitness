import { PageHero } from "../components/PageHero";
import { CoachCard } from "../components/CoachCard";
import { COACHES } from "../data/coaches";
import { SECTION_BACKGROUNDS } from "../data/site";

export function CoachesPage() {
  return (
    <>
      <PageHero
        image={SECTION_BACKGROUNDS.gokuFocus}
        title="OUR COACHES"
        subtitle="Expert trainers who push you past limits. Real guidance. Real results at Ace Factor."
        objectPosition="center 30%"
      />

      <section className="border-t border-volt/10 bg-charcoal py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="reveal mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-volt uppercase">The Team</p>
            <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">Train With The Best</h2>
            <p className="mt-4 text-zinc-400">
              Meet the coaches behind Ace Factor Fitness — each bringing a unique specialty to help you
              hit your goals faster.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {COACHES.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
