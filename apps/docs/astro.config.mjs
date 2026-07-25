import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

const docsBasePath = process.env.PUBLIC_DOCS_BASE_PATH ?? '/';

// Replace this placeholder after the GitHub repository exists:
// const GITHUB_REPOSITORY_URL = 'REPLACE_WITH_GITHUB_REPOSITORY_URL';

export default defineConfig({
  base: docsBasePath,
  integrations: [
    starlight({
      title: 'Призма',
      description: 'Архитектурная книга и инженерная документация платформы «Призма».',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'Русский',
          lang: 'ru',
        },
      },
      logo: {
        replacesTitle: true,
        src: './src/assets/sborka-prizma.svg',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Главная', link: '/' },
        {
          label: 'Архитектурная книга',
          items: [{ autogenerate: { directory: 'architecture-book' } }],
        },
        {
          label: 'Продукт',
          items: [{ autogenerate: { directory: 'product' } }],
        },
        {
          label: 'ADR',
          items: [{ autogenerate: { directory: 'adr' } }],
        },
        {
          label: 'RFC',
          items: [{ autogenerate: { directory: 'rfc' } }],
        },
      ],
    }),
  ],
});
