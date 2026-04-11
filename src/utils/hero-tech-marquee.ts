import {
  gsap,
  onAstroPageLoad,
  prefersReducedMotion,
} from "./animation";

const MARQUEE_SPEED = 38;

const bindIconHover = (marquee: HTMLElement, reduceMotion: boolean) => {
  if (marquee.dataset.hoverReady === "true") return;

  marquee.dataset.hoverReady = "true";

  const iconSlots = marquee.querySelectorAll<HTMLElement>("[data-tech-icon-slot]");

  iconSlots.forEach((slot) => {
    const icon = slot.querySelector<HTMLElement>("[data-tech-icon]");
    if (!icon) return;

    const activate = () => {
      if (reduceMotion) return;

      gsap.to(icon, {
        y: -4,
        scale: 1.08,
        autoAlpha: 1,
        duration: 0.34,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const reset = () => {
      gsap.to(icon, {
        y: 0,
        scale: 1,
        autoAlpha: 0.82,
        duration: 0.42,
        ease: "expo.out",
        overwrite: "auto",
      });
    };

    slot.addEventListener("pointerenter", activate);
    slot.addEventListener("pointerleave", reset);
    slot.addEventListener("focusin", activate);
    slot.addEventListener("focusout", reset);
  });
};

const initHeroTechMarquee = () => {
  const marquees = document.querySelectorAll<HTMLElement>("[data-tech-marquee]");
  const reduceMotion = prefersReducedMotion();

  marquees.forEach((marquee) => {
    const track = marquee.querySelector<HTMLElement>("[data-tech-marquee-track]");
    const groups = marquee.querySelectorAll<HTMLElement>("[data-tech-marquee-group]");
    const duplicateGroup = groups[1];

    if (!track || !duplicateGroup) return;

    bindIconHover(marquee, reduceMotion);

    if (reduceMotion) {
      duplicateGroup.hidden = true;
      gsap.killTweensOf(track);
      gsap.set(track, { clearProps: "transform" });
      return;
    }

    duplicateGroup.hidden = false;

    const existingTween = gsap.getTweensOf(track)[0];
    existingTween?.kill();

    const setupTween = () => {
      const distance = duplicateGroup.offsetLeft;
      if (!distance) return;

      gsap.killTweensOf(track);
      gsap.set(track, { x: 0 });

      gsap.to(track, {
        x: -distance,
        duration: distance / MARQUEE_SPEED,
        ease: "none",
        repeat: -1,
        force3D: true,
      });
    };

    setupTween();

    if (marquee.dataset.marqueeReady === "true") return;

    marquee.dataset.marqueeReady = "true";
    window.addEventListener("resize", setupTween, { passive: true });
  });
};

onAstroPageLoad(initHeroTechMarquee);
