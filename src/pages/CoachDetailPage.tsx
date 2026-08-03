import { Link, Navigate, useParams } from "react-router-dom";
import { CoachMotivation } from "../components/CoachMotivation";
import { PageHero } from "../components/PageHero";
import { getCoachBySlug, coachWhatsAppMessage } from "../data/coaches";
import { whatsappLink } from "../data/site";

export function CoachDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const coach = slug ? getCoachBySlug(slug) : undefined;

  if (!coach) {
    return <Navigate to="/coaches" replace />;
  }

  return (
    <>
      <PageHero
        image={coach.image}
        title={coach.name.toUpperCase()}
        subtitle={coach.specialty}
        objectPosition="center 20%"
      />

      <section className="border-t border-volt/10 bg-charcoal py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
            <div className="reveal">
              <div className="overflow-hidden rounded-sm border-2 border-volt/20">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="aspect-square w-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.src = "/media/stock/hero-athlete.png";
                  }}
                />
              </div>
              <a
                href={coach.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex min-h-[48px] items-center justify-center gap-2 rounded-sm border-2 border-volt/30 text-sm font-bold tracking-wide text-volt uppercase transition hover:border-volt hover:bg-volt/10"
              >
                <span>📷</span> {coach.handle}
              </a>
            </div>

            <div className="reveal">
              <p className="text-xs font-bold tracking-[0.3em] text-volt uppercase">Coach Profile</p>
              <h2 className="mt-2 font-display text-5xl text-white md:text-6xl">{coach.name}</h2>
              <p className="mt-2 text-lg font-semibold text-volt">{coach.specialty}</p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300">{coach.bio}</p>

              <a
                href={whatsappLink(coachWhatsAppMessage(coach.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-power mt-8 inline-flex min-h-[52px] items-center justify-center px-8"
              >
                Train with {coach.name.split(" ")[0]} at Ace Factor →
              </a>

              <Link
                to="/coaches"
                className="mt-4 block text-sm text-zinc-500 transition hover:text-volt"
              >
                ← All coaches
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CoachMotivation motivation={coach.motivation} coachName={coach.name} />

      <section className="border-t border-volt/10 bg-charcoal py-12">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
          <p className="reveal font-display text-3xl text-white md:text-4xl">Ready to start?</p>
          <a
            href={whatsappLink(coachWhatsAppMessage(coach.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-power reveal mt-6 inline-flex min-h-[52px] items-center justify-center px-10"
          >
            Book a session via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
