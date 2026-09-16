// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Replace before deploying: canonical, OG and sitemap URLs all derive from this.
  integrations: [react(), sitemap()],
  site: "https://example.com",
  vite: {
    plugins: [tailwindcss()],
  },
});
