import { PageHero } from "../components/PageHero";
import { Contact } from "../components/Contact";
import { Location } from "../components/Location";
import { STOCK_IMAGES } from "../data/site";

export function ContactPage() {
  return (
    <>
      <PageHero
        image={STOCK_IMAGES.aboutGym}
        title="FIND US"
        subtitle="Achal Road, opposite D S College — Aligarh."
        objectPosition="center 60%"
      />
      <Location showHeader={false} />
      <Contact />
    </>
  );
}
