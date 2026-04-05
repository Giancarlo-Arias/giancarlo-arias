import { gsap } from "gsap";

const splitRevealText = (elements: NodeListOf<HTMLElement>) => {
  elements.forEach((element) => {
    if (element.dataset.splitReady === "true") return;

    const text = element.textContent?.trim();
    if (!text) return;

    element.dataset.splitReady = "true";
    element.setAttribute("aria-label", text);

    const words = text.split(/\s+/);
    element.textContent = "";

    words.forEach((word, index) => {
      const wordSpan = document.createElement("span");
      wordSpan.dataset.revealWord = "true";
      wordSpan.setAttribute("aria-hidden", "true");
      wordSpan.style.display = "inline-block";
      wordSpan.style.willChange = "transform, filter, opacity";
      wordSpan.textContent = word;
      element.appendChild(wordSpan);

      if (index < words.length - 1) {
        element.appendChild(document.createTextNode(" "));
      }
    });
  });
};

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

  splitRevealText(revealTextBlocks);
  setupSpotlight(hero);

  const revealWords = hero.querySelectorAll<HTMLElement>("[data-reveal-word]");

  gsap.set(copyItems, { autoAlpha: 0, y: 34 });
  gsap.set(revealWords, { autoAlpha: 0, y: 14, filter: "blur(10px)" });

  if (media) {
    gsap.set(media, { autoAlpha: 0, x: 52, y: 18, scale: 0.95, rotate: -2.5 });
  }

  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: "power3.out" },
  });

  timeline.to(copyItems, {
    autoAlpha: 1,
    y: 0,
    duration: 0.52,
    stagger: 0.06,
  });

  timeline.to(
    revealWords,
    {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.36,
      stagger: 0.016,
      ease: "power2.out",
    },
    "-=0.42"
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
        duration: 0.62,
      },
      "-=0.34"
    );
  }

  if (mediaCard) {
    timeline.add(() => {
      gsap.to(mediaCard, {
        y: -8,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, "-=0.08");
  }

  return timeline;
};

const playHeroContent = (hero: HTMLElement) => {
  const revealTimeline = createHeroRevealTimeline(hero);
  revealTimeline.play(0);
};

const initHeroAnimation = () => {
  const heroRoots = document.querySelectorAll<HTMLElement>("[data-hero-root]");

  heroRoots.forEach((root, index) => {
    const hero = root.querySelector<HTMLElement>("[data-hero]");
    const loader = root.querySelector<HTMLElement>("[data-hero-loader]");

    if (!hero || hero.dataset.animated === "true") return;

    hero.dataset.animated = "true";

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

    gsap.set([leftWord, rightWord], { autoAlpha: 0, y: 24 });
    gsap.set(loaderLine, { autoAlpha: 0, scaleY: 0, transformOrigin: "center center" });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        loader.remove();
        document.body.classList.remove("overflow-hidden");
      },
    });

    timeline.to(loaderLine, {
      autoAlpha: 1,
      scaleY: 1,
      duration: 0.36,
      ease: "power2.inOut",
    });

    timeline.to(
      [leftWord, rightWord],
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.38,
        stagger: 0.05,
      },
      "-=0.18"
    );

    timeline.to(leftWord, { xPercent: -112, autoAlpha: 0, duration: 0.42 }, "+=0.02");
    timeline.to(rightWord, { xPercent: 112, autoAlpha: 0, duration: 0.42 }, "<");
    timeline.to(loaderLine, { autoAlpha: 0, scaleY: 1.06, duration: 0.28 }, "<");
    timeline.to(loader, { clipPath: "inset(0 0 100% 0)", duration: 0.48, ease: "power4.inOut" }, "-=0.02");
    timeline.call(() => {
      revealTimeline.play(0);
    }, undefined, "-=0.12");
  });
};

const bootHeroAnimation = () => {
  window.requestAnimationFrame(() => {
    initHeroAnimation();
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootHeroAnimation, { once: true });
} else {
  bootHeroAnimation();
}

document.addEventListener("astro:page-load", bootHeroAnimation);
