import { PageHero } from "../components/PageHero";
import { NutritionTips } from "../components/NutritionTips";
import { STOCK_IMAGES } from "../data/site";

export function WellnessPage() {
  return (
    <>
      <PageHero
        image={STOCK_IMAGES.nutrition}
        title="FUEL THE MACHINE"
        subtitle="Nutrition, sleep, and discipline — the other half of the grind."
        objectPosition="center center"
      />
      <NutritionTips showHeader={false} />
    </>
  );
}
