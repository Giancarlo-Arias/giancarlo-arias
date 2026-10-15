import type { Messages } from "./types";

const es = {
  site: {
    name: "Giancarlo Arias Dev",
    description: "Giancarlo Arias es ingeniero de sistemas y desarrollador de software. Creo experiencias web eficientes, accesibles y fáciles de usar."
  },
  navigation: { home: "Inicio", about: "Sobre mí", contact: "Contacto", whatsapp: "WhatsApp", language: "English" },
  home: {
    title: "Inicio",
    description: "Bienvenido a Giancarlo Arias Dev, el sitio personal de Giancarlo Arias, desarrollador de software especializado en desarrollo web. Explora mi perfil y experiencia creando soluciones eficientes y fáciles de usar.",
    heroEyebrow: "Desarrollo web e ingeniería de sistemas",
    heroHeading: "Giancarlo Arias",
    heroIntro: "Ingeniero de Sistemas apasionado por el ciclo de vida completo del desarrollo de software, enfocado en crear soluciones robustas y escalables.",
    profileCta: "Ver perfil", whatsappCta: "WhatsApp", webDevelopment: "Desarrollo web",
    webParagraphOne: "Desarrollo soluciones web modernas con interfaces cuidadas, alto rendimiento y una implementación técnica sólida de principio a fin. Busco que cada proyecto mantenga el equilibrio entre diseño, velocidad, usabilidad y calidad.",
    webParagraphTwo: "Mi trabajo abarca experiencias frontend, integración de lógica backend cuando hace falta, buenas prácticas, SEO técnico y optimización para construir proyectos web completos, eficientes y bien estructurados.",
    profilePhotoAlt: "Foto de Giancarlo Arias", onlineStatus: "Disponible", contactMe: "Contactarme",
    aboutEyebrow: "Perfil profesional", aboutHeading: "Sobre mí",
    aboutSummary: "Desarrollo software con enfoque integral, priorizando estructura, escalabilidad y resultados reales en cada solución.",
    aboutParagraphOne: "Desarrollador Full Stack orientado a crear soluciones modernas con foco en escalabilidad, rendimiento y una arquitectura sólida.",
    aboutParagraphTwo: "Trabajo tanto en backend con .NET, APIs, Python y FastAPI, como en frontend con Astro, React, Next.js y TypeScript, construyendo experiencias dinámicas y bien estructuradas.",
    aboutParagraphThree: "También he desarrollado automatizaciones con n8n e integraciones con inteligencia artificial, además de optimizar sitios comerciales y proyectos en WordPress con mejoras reales en experiencia, rendimiento y posicionamiento.",
    softSkillsEyebrow: "Habilidades blandas", softSkillsHeading: "Perfil colaborativo y orientado a soluciones",
    softSkills: ["Autodidacta", "Trabajo en equipo", "Resolución de problemas", "Pensamiento analítico", "Comunicación efectiva"]
  },
  contact: {
    title: "Contacto", description: "Ponte en contacto con Giancarlo Arias para conversar sobre desarrollo web, arquitectura de software y automatizaciones.",
    eyebrow: "Contacto", heading: "Hablemos de tu proyecto o de la próxima mejora para tu sitio.",
    intro: "Si necesitas una web mejor estructurada, apoyo en frontend, backend o automatizaciones, podemos revisarlo juntos y definir una ruta clara.",
    whatsappCta: "Escribirme por WhatsApp", homeCta: "Volver al inicio", channelEyebrow: "Canal principal",
    channelDescription: "Ideal para consultas, cotizaciones y seguimiento de ideas nuevas o mejoras para proyectos existentes.",
    focusLabel: "Enfoque", focusValue: "Sitios modernos, arquitectura limpia y experiencia de usuario sólida.",
    stackLabel: "Tecnologías", stackValue: "Astro, React, Next.js, .NET, Python, FastAPI y automatizaciones.",
    formEyebrow: "Correo directo", formHeading: "Cuéntame qué necesitas.", nameLabel: "Nombre", emailLabel: "Correo electrónico",
    messageLabel: "Mensaje", messagePlaceholder: "Cuéntame brevemente sobre tu proyecto, necesidad o idea.", submitLabel: "Enviar mensaje", sendingLabel: "Enviando…",
    successMessage: "Mensaje enviado. Te responderé pronto.", errorMessage: "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por WhatsApp."
  },
  notFound: { title: "404", description: "La página que buscas no existe o se ha movido.", heading: "La página que buscas no aparece por aquí.", body: "Puede que la ruta haya cambiado o que todavía no exista. Desde aquí puedes volver al inicio o ir directo a contacto.", homeCta: "Volver al inicio", contactCta: "Ir a contacto" },
  footer: { copyright: "Astro, Tailwind y animaciones cuidadas.", home: "Inicio", about: "Sobre mí", contact: "Contacto" }
} satisfies Messages;

export default es;
