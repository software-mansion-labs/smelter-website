import { createRequire } from "node:module";
import path from "node:path";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
// @ts-check
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import starlightLinksValidator from "starlight-links-validator";
import { viteStaticCopy } from "vite-plugin-static-copy";

import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

const require = createRequire(import.meta.url);

export default defineConfig({
  site: "https://smelter.dev",

  redirects: {
    "/docs": "/fundamentals/getting-started", // TODO: temporary to avoid empty page
    "/fundamentals": "/fundamentals/getting-started",
    "/deployment": "/deployment/setup",
    "/ts-sdk": "/ts-sdk/overview",
    "/ts-sdk/renderers": "/ts-sdk/renderers/overview",
    "/http-api": "/http-api/overview",
    "/http-api/renderers": "/http-api/renderers/overview",
  },
  experimental: {
    svg: true,
  },
  prefetch: true,
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: path.join(
              path.dirname(require.resolve("@swmansion/smelter-browser-render")),
              "smelter.wasm"
            ),
            dest: ".",
          },
        ],
      }),
    ],
    optimizeDeps: {
      exclude: ["@swmansion/smelter-web-wasm"],
      include: ["@swmansion/smelter-web-wasm > pino"],
    },
  },
  integrations: [
    starlight({
      title: "Smelter",
      plugins: process.env.ENABLE_LINK_CHECKER ? [starlightLinksValidator()] : [],
      description:
        "Low-latency video compositing tool with seamless developer experience. Use it for live streaming, broadcasting, video conferencing and more.",
      social: {
        github: "https://github.com/software-mansion/smelter",
        discord: "https://discord.com/invite/Cxj3rzTTag",
        "x.com": "https://x.com/swmansion",
      },
      favicon: "favicons/favicon.ico",
      customCss: ["./styles/font-face.scss", "./styles/headings.css", "./styles/starlight.scss"],
      logo: {
        light: "./src/assets/navigation/smelter-logo-docs-light.svg",
        dark: "./src/assets/navigation/smelter-logo-docs.svg",
        alt: "Smelter logo",
        replacesTitle: true,
      },
      head: [
        {
          tag: "meta",
          attrs: { property: "og:image", content: "https://smelter.dev/og-image.png" },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:alt",
            content:
              "Low-latency video compositing tool with seamless developer experience. Use it for live streaming, broadcasting, video conferencing and more.",
          },
        },
        {
          tag: "meta",
          attrs: {
            "data-rh": "true",
            name: "keywords",
            content:
              "video compositing, react video compositing, compositing software, real time video editing, live video editing, video mixing, live stream mixing",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "twitter:title",
            content: "Smelter: Real-time video compositing software",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "twitter:description",
            content:
              "Low-latency video compositing tool with seamless developer experience. Use it for live streaming, broadcasting, video conferencing and more.",
          },
        },
        {
          tag: "meta",
          attrs: { property: "twitter:image”", content: "https://smelter.dev/og-image.png" },
        },
      ],
      sidebar: [
        {
          label: "Fundamentals",
          items: [
            { label: "Getting started", slug: "fundamentals/getting-started" },
            { label: "Glossary of terms", slug: "fundamentals/glossary" },
            {
              label: "Concepts",
              autogenerate: { directory: "fundamentals/concepts" },
            },
          ],
        },
        {
          label: "Deployment",
          items: [
            { label: "Setup", slug: "deployment/setup" },
            { label: "Configuration", slug: "deployment/configuration" },
            {
              label: "Variants",
              autogenerate: { directory: "deployment/variants" },
            },
          ],
        },
        {
          label: "TypeScript SDK",
          items: [
            { label: "Overview", slug: "ts-sdk/overview" },
            { label: "Project configuration", slug: "ts-sdk/configuration" },
            { label: "Smelter", slug: "ts-sdk/smelter" },
            { label: "OfflineSmelter", slug: "ts-sdk/smelter-offline" },
            {
              label: "Smelter Managers",
              collapsed: true,
              autogenerate: { directory: "ts-sdk/managers" },
            },
            {
              label: "Components",
              collapsed: true,
              autogenerate: { directory: "ts-sdk/components" },
            },
            {
              label: "Props",
              collapsed: true,
              autogenerate: { directory: "ts-sdk/props" },
            },
            {
              label: "Hooks",
              collapsed: true,
              autogenerate: { directory: "ts-sdk/hooks" },
            },
            {
              label: "Inputs",
              collapsed: true,
              autogenerate: { directory: "ts-sdk/inputs" },
            },
            {
              label: "Outputs",
              collapsed: true,
              autogenerate: { directory: "ts-sdk/outputs" },
            },
            {
              label: "Resources",
              collapsed: true,
              autogenerate: { directory: "ts-sdk/resources" },
            },
            {
              label: "Guides",
              collapsed: true,
              autogenerate: { directory: "ts-sdk/guides" },
            },
          ],
        },
        {
          label: "HTTP API",
          items: [
            { label: "Overview", slug: "http-api/overview" },
            { label: "Routes", slug: "http-api/routes" },
            {
              label: "Events",
              slug: "http-api/events",
            },
            {
              label: "Components",
              collapsed: true,
              autogenerate: { directory: "http-api/components" },
            },
            {
              label: "Inputs",
              collapsed: true,
              autogenerate: { directory: "http-api/inputs" },
            },
            {
              label: "Outputs",
              collapsed: true,
              autogenerate: { directory: "http-api/outputs" },
            },
            {
              label: "Resources",
              collapsed: true,
              autogenerate: { directory: "http-api/resources" },
            },
            {
              label: "Guides",
              collapsed: true,
              autogenerate: { directory: "http-api/guides" },
            },
          ],
        },
      ],
    }),
    mdx(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      changefreq: "weekly",
      lastmod: new Date("2025-04-17"),
    }),
    react(),
  ],

  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
  },

  adapter: vercel(),
});
