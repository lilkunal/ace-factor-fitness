import { useEffect } from "react";
import { animate, createTimeline, onScroll, stagger } from "animejs";
import { prefersReducedMotion } from "../utils/motion";

const EASE = "out(3)";

function showElements(selectors: string[]) {
  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
      (el as HTMLElement).style.transform = "none";
    });
  });
}

export function useAnimeAnimations(pathname: string) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      showElements([
        ".reveal",
        ".anim-hide",
        ".hero-label",
        ".hero-line",
        ".hero-cta",
        ".hero-stats",
        ".hero-image",
        ".page-hero-title",
        ".page-hero-sub",
        ".coach-card",
      ]);
      return;
    }

    const isHome = pathname === "/" || pathname === "";

    if (isHome) {
      const heroTl = createTimeline({ defaults: { ease: EASE } });
      heroTl
        .add(".hero-label", { opacity: [0, 1], y: [12, 0], duration: 450 })
        .add(".hero-line", { opacity: [0, 1], y: [28, 0], duration: 550, delay: stagger(90) }, "-=200")
        .add(".hero-cta", { opacity: [0, 1], y: [16, 0], duration: 450, delay: stagger(60) }, "-=250")
        .add(".hero-stats", { opacity: [0, 1], y: [20, 0], duration: 500 }, "-=200")
        .add(".hero-image", { opacity: [0, 1], x: [40, 0], duration: 700 }, "-=400");

      document.querySelectorAll("[data-count]").forEach((el) => {
        const target = el as HTMLElement;
        const raw = target.dataset.count ?? "0";
        const suffix = target.dataset.suffix ?? "";
        const isFloat = raw.includes(".");
        const endVal = parseFloat(raw);
        if (Number.isNaN(endVal)) return;
        const counter = { val: 0 };
        animate(counter, {
          val: endVal,
          duration: 1600,
          ease: "out(4)",
          delay: 400,
          onUpdate: () => {
            target.textContent = isFloat
              ? counter.val.toFixed(1) + suffix
              : Math.round(counter.val) + suffix;
          },
        });
      });
    } else {
      const pageHeroTl = createTimeline({ defaults: { ease: EASE } });
      pageHeroTl
        .add(".page-hero-title", { opacity: [0, 1], y: [24, 0], duration: 600 })
        .add(".page-hero-sub", { opacity: [0, 1], y: [16, 0], duration: 500 }, "-=350");
    }

    const scrollGroups: Array<[string, Record<string, unknown>, number]> = [
      [".facility-card", { opacity: [0, 1], y: [32, 0] }, 100],
      [".pricing-card", { opacity: [0, 1], scale: [0.88, 1], y: [24, 0] }, 120],
      [".gallery-item", { opacity: [0, 1], y: [40, 0] }, 80],
      [".activity-card", { opacity: [0, 1], x: [40, 0] }, 100],
      [".tip-card", { opacity: [0, 1], y: [24, 0] }, 90],
      [".coach-card", { opacity: [0, 1], y: [36, 0], scale: [0.94, 1] }, 100],
      [".section-header", { opacity: [0, 1], y: [24, 0] }, 0],
    ];

    scrollGroups.forEach(([selector, props, staggerMs]) => {
      const els = document.querySelectorAll(selector);
      if (!els.length) return;

      // Don't hide content permanently — animate only if still below fold
      const first = els[0] as HTMLElement;
      const rect = first.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight * 0.9;

      if (alreadyVisible) {
        animate(els, {
          ...props,
          duration: 600,
          ease: EASE,
          delay: staggerMs > 0 ? stagger(staggerMs) : 0,
        });
        return;
      }

      els.forEach((el) => {
        (el as HTMLElement).style.opacity = "0";
      });

      let fired = false;
      onScroll({
        target: first,
        enter: "bottom top-=80px",
        leave: "top bottom",
        repeat: false,
        onEnter: () => {
          if (fired) return;
          fired = true;
          animate(els, {
            ...props,
            duration: 700,
            ease: EASE,
            delay: staggerMs > 0 ? stagger(staggerMs) : 0,
          });
        },
      });
    });

    document.querySelectorAll(".ken-burns").forEach((el) => {
      animate(el, {
        scale: [1, 1.12],
        duration: 12000,
        ease: "linear",
        alternate: true,
        loop: true,
      });
    });

    document.querySelectorAll(".hex-divider-shape").forEach((el) => {
      animate(el, {
        y: [-4, 4],
        rotate: [-3, 3],
        duration: 4000,
        ease: "inOut(2)",
        alternate: true,
        loop: true,
      });
    });
  }, [pathname]);
}
