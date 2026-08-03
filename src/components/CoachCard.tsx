import { Link } from "react-router-dom";
import type { Coach } from "../data/coaches";

type CoachCardProps = {
  coach: Coach;
};

export function CoachCard({ coach }: CoachCardProps) {
  return (
    <Link
      to={`/coaches/${coach.slug}`}
      className="coach-card group block overflow-hidden rounded-sm border-2 border-volt/15 bg-charcoal-light transition hover:border-volt/50"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={coach.image}
          alt={coach.name}
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="border-t border-volt/10 p-5 text-center">
        <h3 className="font-display text-2xl text-white">{coach.name}</h3>
        <p className="mt-1 text-sm text-volt">{coach.handle}</p>
      </div>
    </Link>
  );
}
