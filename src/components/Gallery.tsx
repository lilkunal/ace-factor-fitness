import { GALLERY } from "../data/site";
import { Carousel } from "./Carousel";

type GalleryProps = {
  showHeader?: boolean;
};

export function Gallery({ showHeader = true }: GalleryProps) {
  return (
    <section id="gallery" className="relative border-y-2 border-volt/15 bg-charcoal-light py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {showHeader && (
          <h2 className="section-header text-center font-display text-6xl text-white md:text-7xl">
            THE IRON TEMPLE
          </h2>
        )}

        <Carousel className={showHeader ? "mt-12" : ""} ariaLabel="Gym gallery" autoPlayMs={6000}>
          {GALLERY.map((item) => (
            <figure
              key={item.src}
              className="gallery-item w-[320px] overflow-hidden rounded-sm border-2 border-volt/20 sm:w-[480px] md:w-[560px]"
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className="aspect-[16/10] w-full object-cover"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="ken-burns h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
