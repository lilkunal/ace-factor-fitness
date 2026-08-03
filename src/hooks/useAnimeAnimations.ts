import { useEffect } from "react";
import { animate, createTimeline, onScroll, stagger } from "animejs";
import { prefersReducedMotion, prepareStrokePath } from "../utils/motion";

const EASE = "out(3)";

function showElements(selectors: string[]) {
  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
      (el as HTMLElement).style.transform = "none";
    });
  });
}

function animateStrokeDraw(selector: string, delay = 0) {
  document.querySelectorAll<SVGPathElement>(selector).forEach((path, i) => {
    const length = prepareStrokePath(path);
    animate(path, {
      strokeDashoffset: [length, 0],
      duration: 1400,
      ease: "out(4)",
      delay: delay + i * 200,
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
        ".hero-char",
        ".hero-sub",
        ".hero-cta",
        ".hero-stats",
        ".hero-image",
        ".page-hero-title",
        ".page-hero-sub",
        ".page-hero-accent",
        ".coach-card",
      ]);
      document.querySelectorAll<SVGPathElement>(".hero-stroke-path, .hero-stroke-path-inner, .hex-divider-path, .page-hero-stroke").forEach((path) => {
        path.style.strokeDashoffset = "0";
      });
      return;
    }

    const isHome = pathname === "/";

    if (isHome) {
      animateStrokeDraw(".hero-stroke-path", 400);
      animateStrokeDraw(".hero-stroke-path-inner", 600);

      const heroTl = createTimeline({ defaults: { ease: EASE } });
      heroTl
        .add(".hero-label", { opacity: [0, 1], x: [-16, 0], duration: 500 })
        .add(".hero-line:not(:last-child)", { opacity: [0, 1], y: [40, 0], duration: 650, delay: stagger(120) }, "-=200")
        .add(".hero-line:last-child", { opacity: [0, 1], duration: 100 }, "-=400")
        .add(".hero-char", { opacity: [0, 1], y: [28, 0], rotate: [-8, 0], duration: 550, delay: stagger(70) }, "-=300")
        .add(".hero-sub", { opacity: [0, 1], y: [20, 0], duration: 550 }, "-=250")
        .add(".hero-cta", { opacity: [0, 1], y: [24, 0], scale: [0.92, 1], duration: 600, delay: stagger(80) }, "-=300")
        .add(".hero-stats", { opacity: [0, 1], y: [30, 0], duration: 700 }, "-=200")
        .add(".hero-image", { opacity: [0, 1], x: [60, 0], duration: 900 }, "-=600");

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
          duration: 1800,
          ease: "out(4)",
          delay: 600,
          onUpdate: () => {
            target.textContent = isFloat
              ? counter.val.toFixed(1) + suffix
              : Math.round(counter.val) + suffix;
          },
        });
      });

      setTimeout(() => {
        document
          .querySelectorAll(".hero-label, .hero-line, .hero-char, .hero-sub, .hero-cta, .hero-stats, .hero-image")
          .forEach((el) => {
            if (parseFloat(getComputedStyle(el).opacity) < 0.9) {
              (el as HTMLElement).style.opacity = "1";
            }
          });
      }, 2500);
    } else {
      document.querySelectorAll(".page-hero-title, .page-hero-sub, .page-hero-accent").forEach((el) => {
        (el as HTMLElement).style.opacity = "0";
      });

      animateStrokeDraw(".page-hero-stroke", 200);

      const pageHeroTl = createTimeline({ defaults: { ease: EASE } });
      pageHeroTl
        .add(".page-hero-accent", { opacity: [0, 1], scale: [0.85, 1], duration: 600 })
        .add(".page-hero-title", { opacity: [0, 1], y: [32, 0], duration: 700 }, "-=350")
        .add(".page-hero-sub", { opacity: [0, 1], y: [20, 0], duration: 550 }, "-=350");
    }

    const scrollGroups: Array<[string, Record<string, unknown>, number]> = [
      [".facility-card", { opacity: [0, 1], y: [32, 0] }, 100],
      [".pricing-card", { opacity: [0, 1], scale: [0.88, 1], y: [24, 0] }, 120],
      [".gallery-item", { opacity: [0, 1], y: [40, 0] }, 80],
      [".activity-card", { opacity: [0, 1], x: [40, 0] }, 100],
      [".tip-card", { opacity: [0, 1], y: [24, 0], rotate: [-2, 0] }, 90],
      [".coach-card", { opacity: [0, 1], y: [36, 0], scale: [0.94, 1] }, 100],
      [".section-header", { opacity: [0, 1], y: [24, 0] }, 0],
    ];

    scrollGroups.forEach(([selector, props, staggerMs]) => {
      const els = document.querySelectorAll(selector);
      if (!els.length) return;

      els.forEach((el) => {
        (el as HTMLElement).style.opacity = "0";
      });

      let fired = false;
      onScroll({
        target: els[0]!,
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
