import { Link } from "react-router-dom";
import type { Coach } from "../data/coaches";

type CoachCardProps = {
  coach: Coach;
};

export function CoachCard({ coach }: CoachCardProps) {
  return (
    <Link
      to={`/coaches/${coach.slug}`}
      className="coach-card group reveal block overflow-hidden rounded-sm border-2 border-volt/15 bg-charcoal-light transition duration-300 hover:-translate-y-2 hover:border-volt/50 hover:shadow-[0_12px_40px_rgba(245,230,66,0.12)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={coach.image}
          alt={coach.name}
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/media/stock/hero-athlete.png";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-sm bg-volt/90 px-2 py-0.5 text-[10px] font-bold tracking-wider text-charcoal uppercase">
          {coach.specialty}
        </span>
      </div>
      <div className="border-t border-volt/10 p-5">
        <h3 className="font-display text-2xl text-white transition group-hover:text-volt">{coach.name}</h3>
        <p className="mt-1 text-sm text-zinc-500">{coach.handle}</p>
        <p className="mt-3 line-clamp-2 text-sm text-zinc-400">{coach.bio}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold tracking-wide text-volt uppercase">
          View profile
          <span className="transition group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
