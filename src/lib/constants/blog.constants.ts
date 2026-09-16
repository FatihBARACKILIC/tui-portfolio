export interface BlogPost {
  date: string;
  title: string;
  excerpt: string;
}

export const BLOG_CONSTANTS: readonly BlogPost[] = [
  {
    date: "2026-08-14",
    title: "Retries are a distributed system",
    excerpt:
      "A retry policy is an architectural decision. Treating it as a config value is how you get thundering herds at 3am.",
  },
  {
    date: "2026-06-02",
    title: "The reconciliation job that ate our nights",
    excerpt:
      "How a 6-hour nightly batch became an 11-minute one, and which of the six rewrites actually mattered.",
  },
  {
    date: "2026-03-21",
    title: "Schema migrations without the maintenance window",
    excerpt:
      "Expand, backfill, contract. Plus the failure modes nobody writes on the diagram.",
  },
  {
    date: "2025-11-09",
    title: "On-call should be boring",
    excerpt:
      "Notes from cutting paging volume by 70% without hiding a single real problem.",
  },
] as const;
