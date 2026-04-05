import { gsap } from "gsap";

const splitRevealText = (elements: NodeListOf<HTMLElement>) => {
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

const initAboutAnimation = () => {
  const sections = document.querySelectorAll<HTMLElement>("[data-about]");

  sections.forEach((section) => {
    if (section.dataset.animatedReady === "true") return;

    section.dataset.animatedReady = "true";

    const revealTextBlocks = section.querySelectorAll<HTMLElement>("[data-about-reveal-text]");
    const card = section.querySelector<HTMLElement>("[data-about-card]");
    const fadeItems = section.querySelectorAll<HTMLElement>("[data-about-fade]");
    const techPanel = section.querySelector<HTMLElement>("[data-about-tech-panel]");

    splitRevealText(revealTextBlocks);

    const revealWords = section.querySelectorAll<HTMLElement>("[data-reveal-word]");

    gsap.set(revealWords, { autoAlpha: 0, y: 18, filter: "blur(10px)" });
    gsap.set(fadeItems, { autoAlpha: 0, y: 26 });

    if (card) {
      gsap.set(card, { autoAlpha: 0, y: 34, scale: 0.98 });
    }

    if (techPanel) {
      gsap.set(techPanel, { autoAlpha: 0, y: 18 });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          timeline.to(fadeItems, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
          });

          timeline.to(
            revealWords,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.46,
              stagger: 0.018,
            },
            "-=0.34"
          );

          if (card) {
            timeline.to(
              card,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
              },
              "-=0.48"
            );
          }

          if (techPanel) {
            timeline.to(
              techPanel,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.52,
              },
              "-=0.48"
            );
          }

          observer.unobserve(section);
        });
      },
      {
        threshold: 0.22,
      }
    );

    observer.observe(section);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAboutAnimation, { once: true });
} else {
  initAboutAnimation();
}

document.addEventListener("astro:page-load", initAboutAnimation);
