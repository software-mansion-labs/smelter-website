// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/fundamentials': '/fundamentials/getting-started',
    '/deployment': '/deployment/setup',
    '/ts-sdk': '/ts-sdk/overview',
    '/ts-sdk/renderers': '/ts-sdk/renderers/overview',
    '/http-api': '/http-api/overview',
    '/http-api/renderers': '/http-api/renderers/overview',
  },
  integrations: [
    starlight({
      title: 'Live compositor',
      social: {
        github: 'https://github.com/software-mansion/live-compositor',
      },
      sidebar: [
        {
          label: 'Fundamentials',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Getting started', slug: 'fundamentials/getting-started' },
            { label: 'How it works', slug: 'fundamentials/how-it-works' },
            { label: 'Glossary of terms', slug: 'fundamentials/glossary' },
          ],
        },
        {
          label: 'Deployment',
          items: [
            { label: 'Setup', slug: 'deployment/setup' },
            { label: 'Configuration', slug: 'deployment/configuration' },
            {
              label: 'Examples',
              autogenerate: { directory: 'deployment/examples' },
            },
          ],
        },
        {
          label: 'TypeScript SDK',
          items: [
            { label: 'Overview', slug: 'ts-sdk/overview' },
            { label: 'LiveCompositor', slug: 'ts-sdk/live-compositor' },
            {
              label: 'Components',
              collapsed: true,
              autogenerate: { directory: 'ts-sdk/components' },
            },
            {
              label: 'Hooks',
              collapsed: true,
              autogenerate: { directory: 'ts-sdk/hooks' },
            },
            {
              label: 'Inputs',
              collapsed: true,
              autogenerate: { directory: 'ts-sdk/inputs' },
            },
            {
              label: 'Outputs',
              collapsed: true,
              autogenerate: { directory: 'ts-sdk/outputs' },
            },
            {
              label: 'Renderers',
              collapsed: true,
              autogenerate: { directory: 'ts-sdk/renderers' },
            },
            {
              label: 'Props',
              collapsed: true,
              autogenerate: { directory: 'ts-sdk/props' },
            },
          ],
        },
        {
          label: 'HTTP API',
          items: [
            { label: 'Overview', slug: 'http-api/overview' },
            {
              label: 'Events',
              slug: 'http-api/events',
            },
            {
              label: 'Components',
              collapsed: true,
              autogenerate: { directory: 'http-api/components' },
            },
            {
              label: 'Inputs',
              collapsed: true,
              autogenerate: { directory: 'http-api/inputs' },
            },
            {
              label: 'Outputs',
              collapsed: true,
              autogenerate: { directory: 'http-api/outputs' },
            },
            {
              label: 'Renderers',
              collapsed: true,
              autogenerate: { directory: 'http-api/renderers' },
            },
          ],
        },
      ],
    }),
    tailwind(),
    react(),
    mdx(),
  ],
});
