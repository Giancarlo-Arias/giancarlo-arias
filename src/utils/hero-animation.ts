import {
  gsap,
  onAstroPageLoad,
  prefersReducedMotion,
  queueScrollRefresh,
  signalPageIntroReady,
  splitRevealText,
} from "./animation";

const setupSpotlight = (hero: HTMLElement) => {
  const mediaCard = hero.querySelector<HTMLElement>("[data-hero-media-card]");
  const spotlight = hero.querySelector<HTMLElement>("[data-hero-spotlight]");

  if (!mediaCard || !spotlight || mediaCard.dataset.spotlightReady === "true") return;

  mediaCard.dataset.spotlightReady = "true";

  const moveX = gsap.quickTo(mediaCard, "--spotlight-x", {
    duration: 0.3,
    ease: "power3.out",
  });
  const moveY = gsap.quickTo(mediaCard, "--spotlight-y", {
    duration: 0.3,
    ease: "power3.out",
  });

  mediaCard.addEventListener("pointerenter", () => {
    gsap.to(spotlight, {
      autoAlpha: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  });

  mediaCard.addEventListener("pointermove", (event) => {
    const bounds = mediaCard.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    moveX(`${x}%`);
    moveY(`${y}%`);
  });

  mediaCard.addEventListener("pointerleave", () => {
    gsap.to(spotlight, {
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    moveX("50%");
    moveY("50%");
  });
};

const createHeroRevealTimeline = (hero: HTMLElement) => {
  const copyItems = hero.querySelectorAll<HTMLElement>("[data-hero-copy] > *");
  const media = hero.querySelector<HTMLElement>("[data-hero-media]");
  const mediaCard = hero.querySelector<HTMLElement>("[data-hero-media-card]");
  const revealTextBlocks = hero.querySelectorAll<HTMLElement>("[data-reveal-text]");
  const techCopyItems = hero.querySelectorAll<HTMLElement>("[data-tech-text-block] > *");
  const techIconSlots = hero.querySelectorAll<HTMLElement>("[data-tech-icon-slot]");

  splitRevealText(revealTextBlocks);
  setupSpotlight(hero);

  const revealWords = hero.querySelectorAll<HTMLElement>("[data-reveal-word]");

  gsap.set(copyItems, { autoAlpha: 0, y: 42 });
  gsap.set(revealWords, { autoAlpha: 0, y: 20, filter: "blur(14px)" });
  gsap.set(techCopyItems, { autoAlpha: 0, y: 18, filter: "blur(10px)" });
  gsap.set(techIconSlots, { autoAlpha: 0, y: 20, scale: 0.92 });

  if (media) {
    gsap.set(media, { autoAlpha: 0, x: 60, y: 30, scale: 0.92, rotate: -3 });
  }

  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: "power3.out", overwrite: "auto" },
    onComplete: () => {
      signalPageIntroReady();
      queueScrollRefresh();
    },
  });

  timeline.to(copyItems, {
    autoAlpha: 1,
    y: 0,
    duration: 0.82,
    ease: "expo.out",
    stagger: {
      each: 0.13,
      from: "start",
    },
  });

  timeline.to(
    revealWords,
    {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.62,
      stagger: {
        each: 0.028,
        from: "start",
      },
      ease: "expo.out",
    },
    0.16
  );

  timeline.to(
    techCopyItems,
    {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.72,
      ease: "power3.out",
      stagger: {
        each: 0.08,
        from: "start",
      },
    },
    0.52
  );

  timeline.to(
    techIconSlots,
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.62,
      ease: "expo.out",
      stagger: {
        each: 0.035,
        from: "start",
      },
    },
    0.72
  );

  if (media) {
    timeline.to(
      media,
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 1.02,
        ease: "expo.out",
      },
      0.22
    );
  }

  if (mediaCard) {
    timeline.call(() => {
      gsap.killTweensOf(mediaCard);
      gsap.to(mediaCard, {
        y: -10,
        rotate: 0.6,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, undefined, "-=0.26");
  }

  return timeline;
};

const playHeroContent = (hero: HTMLElement) => {
  const revealTimeline = createHeroRevealTimeline(hero);
  revealTimeline.play(0);
};

const initHeroAnimation = () => {
  const heroRoots = document.querySelectorAll<HTMLElement>("[data-hero-root]");
  const reduceMotion = prefersReducedMotion();

  heroRoots.forEach((root, index) => {
    const hero = root.querySelector<HTMLElement>("[data-hero]");
    const loader = root.querySelector<HTMLElement>("[data-hero-loader]");

    if (!hero || hero.dataset.animated === "true") return;

    hero.dataset.animated = "true";

    if (reduceMotion) {
      loader?.remove();
      document.body.classList.remove("overflow-hidden");
      gsap.set(hero.querySelectorAll("[data-reveal-word], [data-hero-copy] > *, [data-hero-media], [data-tech-text-block] > *, [data-tech-icon-slot]"), {
        clearProps: "all",
      });
      gsap.set(hero, { clearProps: "all" });
      signalPageIntroReady();
      queueScrollRefresh();
      return;
    }

    if (index > 0 || !loader) {
      loader?.remove();
      playHeroContent(hero);
      return;
    }

    document.body.classList.add("overflow-hidden");

    const loaderLine = loader.querySelector<HTMLElement>("[data-loader-line]");
    const leftWord = loader.querySelector<HTMLElement>('[data-loader-word="left"]');
    const rightWord = loader.querySelector<HTMLElement>('[data-loader-word="right"]');

    if (!leftWord || !rightWord || !loaderLine) {
      loader.remove();
      document.body.classList.remove("overflow-hidden");
      playHeroContent(hero);
      return;
    }

    const revealTimeline = createHeroRevealTimeline(hero);

    gsap.set([leftWord, rightWord], { autoAlpha: 0, y: 28, filter: "blur(10px)" });
    gsap.set(loaderLine, { autoAlpha: 0, scaleY: 0, transformOrigin: "center center" });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out", overwrite: "auto" },
      onComplete: () => {
        loader.remove();
        document.body.classList.remove("overflow-hidden");
        queueScrollRefresh();
      },
    });

    timeline.to(loaderLine, {
      autoAlpha: 1,
      scaleY: 1,
      duration: 0.42,
      ease: "power2.inOut",
    });

    timeline.to(
      [leftWord, rightWord],
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.56,
        ease: "expo.out",
        stagger: 0.08,
      },
      "-=0.2"
    );

    timeline.to(leftWord, { xPercent: -112, autoAlpha: 0, duration: 0.48, ease: "power3.in" }, "+=0.08");
    timeline.to(rightWord, { xPercent: 112, autoAlpha: 0, duration: 0.48, ease: "power3.in" }, "<");
    timeline.to(loaderLine, { autoAlpha: 0, scaleY: 1.08, duration: 0.32, ease: "power2.in" }, "<");
    timeline.to(
      loader,
      {
        clipPath: "inset(0 0 100% 0)",
        autoAlpha: 0,
        duration: 0.62,
        ease: "power4.inOut",
      },
      "-=0.08"
    );
    timeline.call(() => {
      revealTimeline.play(0);
    }, undefined, "-=0.28");
  });
};

onAstroPageLoad(initHeroAnimation);
