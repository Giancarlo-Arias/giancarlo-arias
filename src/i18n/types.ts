export type Locale = "es" | "en";
export type PageId = "home" | "contact" | "notFound";
export type Localized<T> = Record<Locale, T>;

export interface Messages {
  site: { name: string; description: string };
  navigation: { home: string; about: string; contact: string; whatsapp: string; language: string };
  home: {
    title: string; description: string; heroEyebrow: string; heroHeading: string;
    heroIntro: string; profileCta: string; whatsappCta: string; webDevelopment: string;
    webParagraphOne: string; webParagraphTwo: string; profilePhotoAlt: string;
    onlineStatus: string; contactMe: string; aboutEyebrow: string; aboutHeading: string;
    aboutSummary: string; aboutParagraphOne: string; aboutParagraphTwo: string;
    aboutParagraphThree: string; softSkillsEyebrow: string; softSkillsHeading: string;
    softSkills: [string, string, string, string, string];
  };
  contact: {
    title: string; description: string; eyebrow: string; heading: string; intro: string;
    whatsappCta: string; homeCta: string; channelEyebrow: string; channelDescription: string;
    focusLabel: string; focusValue: string; stackLabel: string; stackValue: string;
    formEyebrow: string; formHeading: string; nameLabel: string; emailLabel: string;
    messageLabel: string; messagePlaceholder: string; submitLabel: string; sendingLabel: string;
    successMessage: string; errorMessage: string;
  };
  notFound: { title: string; description: string; heading: string; body: string; homeCta: string; contactCta: string };
  footer: { copyright: string; home: string; about: string; contact: string };
}
