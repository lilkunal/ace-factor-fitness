import { PageHero } from "../components/PageHero";
import { Pricing } from "../components/Pricing";
import { PlansExtras } from "../components/PlansExtras";
import { SECTION_BACKGROUNDS } from "../data/site";

export function PlansPage() {
  return (
    <>
      <PageHero
        image={SECTION_BACKGROUNDS.bruceLee}
        title="PICK YOUR PLAN"
        subtitle="1% better every day."
        objectPosition="center 30%"
      />
      <Pricing showHeader={false} />
      <PlansExtras />
    </>
  );
}
