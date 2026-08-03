import { Link, Navigate, useParams } from "react-router-dom";
import { getCoachBySlug } from "../data/coaches";

export function CoachDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const coach = slug ? getCoachBySlug(slug) : undefined;

  if (!coach) {
    return <Navigate to="/coaches" replace />;
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-charcoal py-24">
      <div className="mx-auto max-w-sm px-4 text-center">
        <div className="overflow-hidden rounded-sm border-2 border-volt/30">
          <img
            src={coach.image}
            alt={coach.name}
            className="aspect-square w-full object-cover object-top"
          />
        </div>
        <h1 className="mt-8 font-display text-4xl text-white">{coach.name.toUpperCase()}</h1>
        <a
          href={coach.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-lg font-semibold text-volt transition hover:text-gold"
        >
          {coach.handle}
        </a>
        <Link to="/coaches" className="mt-10 block text-sm text-zinc-500 hover:text-volt">
          ← All coaches
        </Link>
      </div>
    </section>
  );
}
