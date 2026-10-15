import { gsap, onAstroPageLoad, prefersReducedMotion } from "./animation";

const initProjectsAnimation = () => {
  const section = document.querySelector<HTMLElement>("[data-projects]");
  if (!section || section.dataset.motionReady === "true") return;
  section.dataset.motionReady = "true";
  if (prefersReducedMotion()) return;

  const header = section.querySelector<HTMLElement>("[data-project-reveal]");
  if (header) gsap.from(header, { autoAlpha: 0, y: 26, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: header, start: "top 88%", once: true } });

  section.querySelectorAll<HTMLElement>("[data-project-item]").forEach((item) => {
    const copy = item.querySelector<HTMLElement>("[data-project-copy]");
    const visual = item.querySelector<HTMLElement>("[data-project-visual]");
    if (!copy || !visual) return;
    gsap.timeline({ scrollTrigger: { trigger: item, start: "top 86%", once: true }, defaults: { ease: "power3.out" } })
      .from(copy, { autoAlpha: 0, y: 22, duration: 0.65 })
      .from(visual, { autoAlpha: 0, y: 38, duration: 0.85 }, 0.12);

    const images = visual.querySelectorAll("img");
    gsap.fromTo(images, { scale: 1.08 }, {
      scale: 1,
      ease: "none",
      scrollTrigger: { trigger: visual, start: "top bottom", end: "bottom top", scrub: 0.7 },
    });
  });
};

onAstroPageLoad(initProjectsAnimation);
