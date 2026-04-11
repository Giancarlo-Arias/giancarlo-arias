import {
  gsap,
  onAstroPageLoad,
  prefersReducedMotion,
  queueScrollRefresh,
  splitRevealText,
} from "./animation";

const initAboutAnimation = () => {
  const sections = document.querySelectorAll<HTMLElement>("[data-about]");
  const reduceMotion = prefersReducedMotion();

  sections.forEach((section) => {
    if (section.dataset.animatedReady === "true") return;

    section.dataset.animatedReady = "true";

    const revealTextBlocks = section.querySelectorAll<HTMLElement>("[data-about-reveal-text]");
    const card = section.querySelector<HTMLElement>("[data-about-card]");
    const fadeItems = section.querySelectorAll<HTMLElement>("[data-about-fade]");
    const techPanel = section.querySelector<HTMLElement>("[data-about-tech-panel]");
    const skillPills = techPanel?.querySelectorAll<HTMLElement>("span") ?? [];

    splitRevealText(revealTextBlocks);

    const revealWords = section.querySelectorAll<HTMLElement>("[data-reveal-word]");
    const revealTargets = [
      ...fadeItems,
      ...revealWords,
      ...(card ? [card] : []),
      ...(techPanel ? [techPanel] : []),
      ...skillPills,
    ];

    if (reduceMotion) {
      gsap.set(revealTargets, { clearProps: "all" });
      queueScrollRefresh();
      return;
    }

    gsap.set(revealWords, { autoAlpha: 0, y: 22, filter: "blur(12px)" });
    gsap.set(fadeItems, { autoAlpha: 0, y: 32 });

    if (card) {
      gsap.set(card, { autoAlpha: 0, y: 42, scale: 0.975 });
    }

    if (techPanel) {
      gsap.set(techPanel, { autoAlpha: 0, y: 28, scale: 0.985 });
    }

    if (skillPills.length > 0) {
      gsap.set(skillPills, { autoAlpha: 0, y: 14, scale: 0.97 });
    }

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
        overwrite: "auto",
      },
      scrollTrigger: {
        trigger: section,
        start: "top 74%",
        end: "bottom 28%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(fadeItems, {
        autoAlpha: 1,
        y: 0,
        duration: 0.78,
        ease: "expo.out",
        stagger: {
          each: 0.1,
          from: "start",
        },
      })
      .to(
        revealWords,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "expo.out",
          stagger: {
            each: 0.024,
            from: "start",
          },
        },
        0.12
      );

    if (card) {
      timeline.to(
        card,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.88,
          ease: "expo.out",
        },
        0.18
      );
    }

    if (techPanel) {
      timeline.to(
        techPanel,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.76,
          ease: "power3.out",
        },
        0.26
      );
    }

    if (skillPills.length > 0) {
      timeline.to(
        skillPills,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          stagger: {
            each: 0.05,
            from: "start",
          },
        },
        0.46
      );
    }
  });

  queueScrollRefresh();
};

onAstroPageLoad(initAboutAnimation);
