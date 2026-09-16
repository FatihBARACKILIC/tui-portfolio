export interface ChangelogItem {
  date: string;
  entry: string;
}

export const CHANGELOG_CONSTANTS: readonly ChangelogItem[] = [
  {
    date: "2026-09-01",
    entry: "Added /tech-stack and split it from /skills.",
  },
  {
    date: "2026-08-18",
    entry: "Command popover now filters as you type, with keyboard selection.",
  },
  {
    date: "2026-07-30",
    entry: "Published two new posts under /blog.",
  },
  {
    date: "2026-06-12",
    entry: "Rebuilt the whole site as a single command-driven page.",
  },
  {
    date: "2026-05-04",
    entry: "Retired the old navigation-based portfolio.",
  },
] as const;
