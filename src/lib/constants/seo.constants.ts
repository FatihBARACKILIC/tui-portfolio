export interface SeoPerson {
  name: string;
  jobTitle: string;
  sameAs: readonly string[];
}

export const SEO_CONSTANTS = {
  /**
   * Shown after the page name in the browser tab and in search results.
   * Replace with your own name — this is the highest-leverage text on the site.
   */
  SITE_NAME: "TUI Portfolio",
  /**
  Fallback description for the home page and any route without its own.
  */
  DESCRIPTION:
    "Terminal-style portfolio of a backend and platform engineer. Type a command to read about experience, projects, writing and availability.",
  /**
  Appended to each command's own description to give it useful length.
  */
  DESCRIPTION_SUFFIX:
    "Part of a terminal-style portfolio you navigate by typing commands.",
  /**
   * Absolute path to a 1200x630 image under public/, e.g. "/og.png".
   * Leave empty to ship no og:image rather than a broken reference.
   */
  OG_IMAGE: "",
  OG_IMAGE_ALT: "Terminal-style portfolio home screen",
  LOCALE: "en_US",
  /**
  Casing that de-slugifying a command name cannot infer on its own.
  */
  LABEL_OVERRIDES: {
    github: "GitHub",
  } as Readonly<Record<string, string | undefined>>,
  /**
  Emitted as schema.org Person structured data.
  */
  PERSON: {
    name: "Fatih",
    jobTitle: "Backend and Platform Engineer",
    sameAs: ["https://github.com", "https://linkedin.com"],
  } as const satisfies SeoPerson,
} as const;
