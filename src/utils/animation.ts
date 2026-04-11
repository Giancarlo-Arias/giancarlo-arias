import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

const PAGE_INTRO_READY_EVENT = "page:intro-ready";
let refreshFrame = 0;

export const splitRevealText = (elements: NodeListOf<HTMLElement>) => {
  elements.forEach((element) => {
    if (element.dataset.splitReady === "true") return;

    const text = element.textContent?.trim();
    if (!text) return;

    element.dataset.splitReady = "true";
    element.setAttribute("aria-label", text);
    element.textContent = "";

    text.split(/\s+/).forEach((word, index, words) => {
      const span = document.createElement("span");
      span.dataset.revealWord = "true";
      span.setAttribute("aria-hidden", "true");
      span.style.display = "inline-block";
      span.style.willChange = "transform, filter, opacity";
      span.textContent = word;
      element.appendChild(span);

      if (index < words.length - 1) {
        element.appendChild(document.createTextNode(" "));
      }
    });
  });
};

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const queueScrollRefresh = () => {
  if (refreshFrame) {
    window.cancelAnimationFrame(refreshFrame);
  }

  refreshFrame = window.requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    refreshFrame = 0;
  });
};

export const revealDeferredNavigation = () => {
  const nav = document.querySelector<HTMLElement>('[data-nav-reveal="deferred"]');
  if (!nav || nav.dataset.navReady === "true") return;

  nav.dataset.navReady = "true";

  if (prefersReducedMotion()) {
    nav.classList.remove("pointer-events-none", "-translate-y-4", "opacity-0", "blur-md");
    nav.dataset.navReveal = "ready";
    gsap.set(nav, { clearProps: "all" });
    return;
  }

  gsap.to(nav, {
    autoAlpha: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.72,
    ease: "expo.out",
    onStart: () => {
      nav.classList.remove("pointer-events-none");
    },
    onComplete: () => {
      nav.classList.remove("-translate-y-4", "opacity-0", "blur-md");
      nav.dataset.navReveal = "ready";
      gsap.set(nav, { clearProps: "all" });
    },
  });
};

export const signalPageIntroReady = () => {
  revealDeferredNavigation();
  document.dispatchEvent(new CustomEvent(PAGE_INTRO_READY_EVENT));
};

export const onAstroPageLoad = (callback: () => void) => {
  const run = () => {
    window.requestAnimationFrame(callback);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }

  document.addEventListener("astro:page-load", run);
};
