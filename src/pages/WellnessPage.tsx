import { PageHero } from "../components/PageHero";
import { NutritionTips } from "../components/NutritionTips";
import { SECTION_BACKGROUNDS } from "../data/site";

export function WellnessPage() {
  return (
    <>
      <PageHero
        image={SECTION_BACKGROUNDS.hanumanBw}
        title="FUEL THE MACHINE"
        subtitle="Strength isn't built in the gym alone — nutrition, sleep, and discipline complete the picture."
        objectPosition="center 40%"
      />
      <NutritionTips showHeader={false} />
    </>
  );
}
