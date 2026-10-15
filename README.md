# Giancarlo Arias Dev

Personal portfolio built with Astro, Tailwind CSS, and GSAP. Spanish is the default language; English pages live under `/en`.

## Development

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Localization

- Translation strings live in `src/i18n/es.ts` and `src/i18n/en.ts`.
- `src/i18n/types.ts` defines the required message shape. Both language files must satisfy it, so TypeScript flags missing or incorrectly shaped translations.
- Astro's official i18n router is configured in `astro.config.mjs`. It owns the available locales, the default locale, and URL prefixes.
- Generate internal localized links with `getRelativeLocaleUrl()` from `astro:i18n`; do not hardcode localized URLs.
- Pages pass their locale to `MainLayout` and localized components. Keep user-facing copy in the message files instead of embedding it in markup.
- For repeatable content entries such as projects or articles, use `Localized<T>` from `src/i18n/types.ts` for each translated field. This requires an `es` and an `en` value on every entry at compile time.

To add another language, add it to Astro's `i18n.locales`, create the corresponding `src/pages/[locale]/` pages, and add a typed message file. The message type makes each locale cover the same copy keys.
