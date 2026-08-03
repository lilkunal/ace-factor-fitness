import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer, WhatsAppFloat } from "./Contact";
import { WaterReminder } from "./WaterReminder";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { useAnimeAnimations } from "../hooks/useAnimeAnimations";

export function Layout() {
  const location = useLocation();
  const mainRef = useRevealOnScroll();

  useAnimeAnimations(location.pathname);

  return (
    <div className="relative z-10">
      <Header />
      <main ref={mainRef as React.RefObject<HTMLElement>} key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <WaterReminder />
    </div>
  );
}
