import type { APIRoute } from "astro";

const sitemapLine = (site: URL | undefined): string => {
  if (site === undefined) {
    return "";
  }
  const sitemapUrl = new URL("sitemap-index.xml", site);
  return `Sitemap: ${sitemapUrl.href}\n`;
};

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\n${sitemapLine(site)}`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
