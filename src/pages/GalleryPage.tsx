import { PageHero } from "../components/PageHero";
import { Gallery } from "../components/Gallery";
import { ActivitySlider } from "../components/ActivitySlider";
import { SECTION_BACKGROUNDS } from "../data/site";

export function GalleryPage() {
  return (
    <>
      <PageHero
        image={SECTION_BACKGROUNDS.baki}
        title="THE IRON TEMPLE"
        subtitle="Real training. Real equipment. See what you're walking into."
        objectPosition="center 25%"
      />
      <Gallery showHeader={false} />
      <ActivitySlider />
    </>
  );
}
