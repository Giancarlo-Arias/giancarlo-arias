import type { Messages } from "./types";

const en = {
  site: {
    name: "Giancarlo Arias Dev",
    description: "Giancarlo Arias is a systems engineer and software developer building efficient, accessible, and easy-to-use web experiences."
  },
  navigation: { home: "Home", about: "About", contact: "Contact", whatsapp: "WhatsApp", language: "Español", openMenu: "Open menu", closeMenu: "Close menu" },
  home: {
    title: "Home",
    description: "Welcome to Giancarlo Arias Dev, the personal website of Giancarlo Arias, a software developer focused on web development. Explore my profile and experience building efficient, easy-to-use solutions.",
    heroEyebrow: "Software developer",
    heroHeading: "Giancarlo Arias",
    heroIntro: "Systems engineer passionate about the full software development lifecycle, focused on building robust and scalable solutions.",
    profileCta: "View profile", whatsappCta: "WhatsApp", webDevelopment: "Web development",
    webParagraphOne: "I build modern web solutions with thoughtful interfaces, strong performance, and solid technical implementation from start to finish. I aim to balance design, speed, usability, and quality in every project.",
    webParagraphTwo: "My work spans frontend experiences, backend logic and integrations when needed, best practices, technical SEO, and optimization to deliver complete, efficient, well-structured websites.",
    profilePhotoAlt: "Photo of Giancarlo Arias", onlineStatus: "Available", contactMe: "Get in touch",
    aboutEyebrow: "Professional profile", aboutHeading: "About me",
    aboutSummary: "I take a holistic approach to software development, prioritizing structure, scalability, and practical results in every solution.",
    aboutParagraphOne: "Full-stack developer focused on building modern solutions with an emphasis on scalability, performance, and sound architecture.",
    aboutParagraphTwo: "I work on backend systems with .NET, APIs, Python, and FastAPI, as well as frontend applications with Astro, React, Next.js, and TypeScript, creating dynamic and well-structured experiences.",
    aboutParagraphThree: "I have also built n8n automations and AI integrations, and optimized business websites and WordPress projects to improve user experience, performance, and search rankings.",
    softSkillsEyebrow: "People skills", softSkillsHeading: "Collaborative and solution-focused",
    softSkills: ["Self-directed learner", "Teamwork", "Problem-solving", "Analytical thinking", "Effective communication"]
  },
  contact: {
    title: "Contact", description: "Get in touch with Giancarlo Arias to discuss web development, software architecture, and automation.",
    eyebrow: "Contact", heading: "Let’s talk about your project or the next improvement to your website.",
    intro: "If you need a better-structured website or support with frontend, backend, or automation, we can review it together and map out a clear plan.",
    whatsappCta: "Message me on WhatsApp", homeCta: "Back to home", channelEyebrow: "Main contact channel",
    channelDescription: "For questions, quotes, and follow-up on new ideas or improvements to existing projects.",
    focusLabel: "Focus", focusValue: "Modern websites, clean architecture, and a strong user experience.",
    stackLabel: "Tech stack", stackValue: "Astro, React, Next.js, .NET, Python, FastAPI, and automation.",
    formEyebrow: "Direct email", formHeading: "Tell me what you need.", nameLabel: "Name", emailLabel: "Email",
    messageLabel: "Message", messagePlaceholder: "Briefly tell me about your project, need, or idea.", submitLabel: "Send message", sendingLabel: "Sending…",
    successMessage: "Message sent. I’ll get back to you soon.", errorMessage: "The message could not be sent. Please try again or contact me on WhatsApp."
  },
  notFound: { title: "404", description: "The page you are looking for does not exist or has moved.", heading: "We can’t find that page.", body: "The URL may have changed or the page may not exist yet. You can head back home or go straight to the contact page.", homeCta: "Back to home", contactCta: "Go to contact" },
  footer: { copyright: "Astro, Tailwind, and carefully crafted animations.", home: "Home", about: "About", contact: "Contact" }
} satisfies Messages;

export default en;
