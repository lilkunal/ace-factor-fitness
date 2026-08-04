import { PageHero } from "../components/PageHero";
import { Gallery } from "../components/Gallery";
import { ActivitySlider } from "../components/ActivitySlider";
import { STOCK_IMAGES } from "../data/site";

export function GalleryPage() {
  return (
    <>
      <PageHero
        image={STOCK_IMAGES.aboutGym}
        title="THE IRON TEMPLE"
        subtitle="Real training. Real equipment."
        objectPosition="center center"
      />
      <Gallery showHeader={false} />
      <ActivitySlider />
    </>
  );
}
