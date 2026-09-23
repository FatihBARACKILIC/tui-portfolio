// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // GitHub Pages: https://<user>.github.io/<repo>/
  // Custom domain at root? Set site to that origin and remove `base`.
  integrations: [react(), sitemap()],
  site: "https://fatihbarackilic.github.io",
  base: "/tui-portfolio",
  vite: {
    plugins: [tailwindcss()],
  },
});
