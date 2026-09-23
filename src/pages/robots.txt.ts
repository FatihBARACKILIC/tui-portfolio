import type { APIRoute } from "astro";

const normalizeBase = (base: string): string => {
  if (base === "" || base === "/") {
    return "/";
  }
  return base.endsWith("/") ? base : `${base}/`;
};

const sitemapLine = (site: URL | undefined): string => {
  if (site === undefined) {
    return "";
  }
  const baseUrl = new URL(normalizeBase(import.meta.env.BASE_URL), site);
  const sitemapUrl = new URL("sitemap-index.xml", baseUrl);
  return `Sitemap: ${sitemapUrl.href}\n`;
};

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\n${sitemapLine(site)}`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
