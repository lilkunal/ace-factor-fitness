import { useEffect, useRef } from "react";

export function useRevealOnScroll(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold },
    );

    node.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export function useScrollSpy(sectionIds: string[]) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          document.querySelectorAll("[data-nav]").forEach((link) => {
            const active = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("text-power-light", active);
            link.classList.toggle("text-zinc-400", !active);
          });
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);
}
