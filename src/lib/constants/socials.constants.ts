export interface SocialItem {
  icon: string;
  label: string;
  handle: string;
  href: string;
}

export const SOCIALS_CONSTANTS: readonly SocialItem[] = [
  {
    icon: "gh",
    label: "GitHub",
    handle: "@fatih",
    href: "https://github.com",
  },
  {
    icon: "in",
    label: "LinkedIn",
    handle: "/in/fatih",
    href: "https://linkedin.com",
  },
  {
    icon: "x",
    label: "X",
    handle: "@fatihbuilds",
    href: "https://x.com",
  },
  {
    icon: "@",
    label: "Email",
    handle: "hello@fatih.dev",
    href: "mailto:hello@fatih.dev",
  },
] as const;
