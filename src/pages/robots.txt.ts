import type { APIRoute } from "astro";

const sitemapLine = (site: URL | undefined): string => {
  if (site === undefined) {
    return "";
  }
  const sitemapUrl = new URL("sitemap-index.xml", site);
  return `Sitemap: ${sitemapUrl.href}\n`;
};

/**
 * Generated rather than dropped in public/ so the sitemap URL always tracks
 * the `site` value in astro.config.mjs instead of drifting from it.
 */
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\n${sitemapLine(site)}`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
