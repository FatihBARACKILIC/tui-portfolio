export interface SeoPerson {
  name: string;
  jobTitle: string;
  sameAs: readonly string[];
}

export const SEO_CONSTANTS = {
  SITE_NAME: "TUI Portfolio",
  DESCRIPTION:
    "Terminal-style portfolio of a backend and platform engineer. Type a command to read about experience, projects, writing and availability.",
  DESCRIPTION_SUFFIX:
    "Part of a terminal-style portfolio you navigate by typing commands.",
  OG_IMAGE: "",
  OG_IMAGE_ALT: "Terminal-style portfolio home screen",
  LOCALE: "en_US",
  LABEL_OVERRIDES: {
    github: "GitHub",
  } as Readonly<Record<string, string | undefined>>,
  PERSON: {
    name: "Fatih",
    jobTitle: "Backend and Platform Engineer",
    sameAs: ["https://github.com", "https://linkedin.com"],
  } as const satisfies SeoPerson,
} as const;
