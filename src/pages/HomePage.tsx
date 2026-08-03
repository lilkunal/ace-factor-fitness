import { Hero } from "../components/Hero";
import { MarqueeStrip } from "../components/MarqueeStrip";
import { HexagonDivider } from "../components/HexagonDivider";
import { MotivationPulse } from "../components/MotivationPulse";
import { About } from "../components/About";
import { Facilities } from "../components/Facilities";
import { Testimonials } from "../components/Testimonials";
import { CallToAction } from "../components/CallToAction";

export function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <HexagonDivider />
      <MotivationPulse />
      <HexagonDivider />
      <About />
      <HexagonDivider />
      <Facilities />
      <Testimonials />
      <CallToAction />
    </>
  );
}
