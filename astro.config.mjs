// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // REPLACE THIS with your deployed origin before going live. It is what
  // canonical links, Open Graph URLs and sitemap.xml are built from, so a
  // stale value points search engines at the wrong domain.
  integrations: [react(), sitemap()],
  site: "https://example.com",
  vite: {
    plugins: [tailwindcss()],
  },
});
