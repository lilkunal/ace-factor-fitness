import { PageHero } from "../components/PageHero";
import { CoachCard } from "../components/CoachCard";
import { COACHES } from "../data/coaches";
import { SECTION_BACKGROUNDS } from "../data/site";

export function CoachesPage() {
  return (
    <>
      <PageHero
        image={SECTION_BACKGROUNDS.bruceLee}
        title="OUR COACHES"
        subtitle="Expert trainers. Real results."
        fit="contain"
      />

      <section className="border-t border-volt/10 bg-charcoal py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-volt uppercase">The Team</p>
            <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">MEET THE COACHES</h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {COACHES.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
