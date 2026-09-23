/**
 * Normalize Astro/Vite `BASE_URL` so it always ends with `/`
 * (`/` at site root, `/tui-portfolio/` on project pages).
 * Astro 7 may emit `base` without a trailing slash.
 */
export const appBase = (): string => {
  const base = import.meta.env.BASE_URL;
  if (base === "" || base === "/") {
    return "/";
  }
  return base.endsWith("/") ? base : `${base}/`;
};

/**
Base without trailing slash (`""` at site root, `/tui-portfolio` on project pages).
*/
export const appBasePath = (): string => {
  const base = appBase();
  return base === "/" ? "" : base.slice(0, -1);
};

/**
Prefix a path with the configured base (`profile` → `/tui-portfolio/profile`).
*/
export const withBase = (path: string): string => {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${appBase()}${normalized}`;
};

/**
Strip the configured base so routers see `/profile` instead of `/tui-portfolio/profile`.
*/
export const stripBase = (pathname: string): string => {
  const base = appBasePath();
  if (base.length === 0) {
    return pathname;
  }
  if (pathname === base || pathname === `${base}/`) {
    return "/";
  }
  if (pathname.startsWith(`${base}/`)) {
    return pathname.slice(base.length);
  }
  return pathname;
};
