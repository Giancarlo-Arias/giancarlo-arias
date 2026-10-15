import { gsap, onAstroPageLoad, prefersReducedMotion } from "./animation";

const initContactAnimation = () => {
  const section = document.querySelector<HTMLElement>("[data-contact]");
  if (!section || section.dataset.motionReady === "true") return;
  section.dataset.motionReady = "true";
  if (prefersReducedMotion()) return;

  const intro = section.querySelector<HTMLElement>("[data-contact-intro]");
  const brief = section.querySelector<HTMLElement>("[data-contact-brief]");
  const formShell = section.querySelector<HTMLElement>("[data-contact-form-shell]");
  const fields = section.querySelectorAll<HTMLElement>(".contact-field");
  const submitArea = section.querySelector<HTMLElement>("[data-contact-submit]")?.parentElement;

  if (intro) {
    gsap.from(intro, {
      autoAlpha: 0,
      y: 24,
      duration: 0.72,
      ease: "power3.out",
      scrollTrigger: { trigger: intro, start: "top 88%", once: true },
    });
  }

  if (!brief || !formShell) return;

  const timeline = gsap.timeline({
    defaults: { ease: "power3.out", overwrite: "auto" },
    scrollTrigger: { trigger: brief, start: "top 84%", once: true },
  });

  timeline
    .from(brief, { autoAlpha: 0, y: 26, duration: 0.7 })
    .from(formShell, { autoAlpha: 0, y: 34, duration: 0.82 }, 0.1)
    .from(fields, { autoAlpha: 0, y: 14, duration: 0.46, stagger: 0.07 }, 0.32);

  if (submitArea) {
    timeline.from(submitArea, { autoAlpha: 0, y: 12, duration: 0.42 }, 0.56);
  }
};

onAstroPageLoad(initContactAnimation);
