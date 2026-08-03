import { PageHero } from "../components/PageHero";
import { Pricing } from "../components/Pricing";
import { SECTION_BACKGROUNDS } from "../data/site";

export function PlansPage() {
  return (
    <>
      <PageHero
        image={SECTION_BACKGROUNDS.bruceLee}
        title="PICK YOUR PLAN"
        subtitle="1% better every day. Commit to the grind — Bruce Lee didn't wait for motivation."
        objectPosition="center 30%"
      />
      <Pricing showHeader={false} />
    </>
  );
}
