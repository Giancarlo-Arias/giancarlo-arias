import { gsap, onAstroPageLoad, prefersReducedMotion } from "./animation";

const initAboutAnimation = () => {
  const section = document.querySelector<HTMLElement>("[data-about]");
  if (!section || section.dataset.motionReady === "true") return;
  section.dataset.motionReady = "true";
  if (prefersReducedMotion()) return;

  const intro = section.querySelector<HTMLElement>("[data-about-intro]");
  const copy = section.querySelector<HTMLElement>("[data-about-copy]");
  const system = section.querySelector<HTMLElement>("[data-about-system]");
  const core = section.querySelector<HTMLElement>("[data-about-core]");
  const nodes = section.querySelectorAll<HTMLElement>("[data-about-node]");
  const paths = section.querySelectorAll<SVGPathElement>("[data-system-path]");
  const capabilities = section.querySelector<HTMLElement>("[data-about-capabilities]");

  if (intro) gsap.from(intro, { autoAlpha: 0, y: 28, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: intro, start: "top 86%", once: true } });
  if (copy && system) {
    gsap.timeline({ scrollTrigger: { trigger: copy, start: "top 82%", once: true }, defaults: { ease: "power3.out" } })
      .from(copy, { autoAlpha: 0, y: 22, duration: 0.7 })
      .from(system, { autoAlpha: 0, y: 28, duration: 0.75 }, 0.08)
      .from(paths, { strokeDashoffset: 80, duration: 1.1, stagger: 0.08 }, 0.3)
      .from(core, { autoAlpha: 0, scale: 0.84, duration: 0.62 }, 0.46)
      .from(nodes, { autoAlpha: 0, y: 18, duration: 0.5, stagger: 0.08 }, 0.6);
  }
  if (capabilities) gsap.from(capabilities.children, { autoAlpha: 0, y: 16, duration: 0.55, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: capabilities, start: "top 88%", once: true } });

  if (system && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const onMove = (event: PointerEvent) => {
      const bounds = system.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      nodes.forEach((node, index) => {
        const factor = (index + 1) * 2.3;
        gsap.to(node, { x: x * factor, y: y * factor, duration: 0.42, ease: "power3.out", overwrite: "auto" });
      });
    };
    const onLeave = () => gsap.to(nodes, { x: 0, y: 0, duration: 0.55, ease: "power3.out", overwrite: "auto" });
    system.addEventListener("pointermove", onMove);
    system.addEventListener("pointerleave", onLeave);
  }
};

onAstroPageLoad(initAboutAnimation);
