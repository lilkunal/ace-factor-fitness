import { PageHero } from "../components/PageHero";
import { Contact } from "../components/Contact";
import { Location } from "../components/Location";
import { SECTION_BACKGROUNDS } from "../data/site";

export function ContactPage() {
  return (
    <>
      <PageHero
        image={SECTION_BACKGROUNDS.hanumanEpic}
        title="FIND US"
        subtitle="Walk in. Train hard. We're on Achal Road — opposite D S College, Aligarh."
        objectPosition="center center"
      />
      <Location showHeader={false} />
      <Contact />
    </>
  );
}
