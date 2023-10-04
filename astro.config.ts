import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkCallouts from "remark-callouts";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { tqblogExpressiveCode } from "./integrations/expressive-code";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    preact(),
    sitemap(),
    tqblogExpressiveCode(),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
      remarkCallouts,
    ],
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
