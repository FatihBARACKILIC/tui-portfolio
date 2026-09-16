export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectItem {
  current?: boolean;
  title: string;
  role: string;
  duration: string;
  body: string;
  stack: readonly string[];
  tags: readonly string[];
  links: readonly ProjectLink[];
}

const GITHUB_URL = "https://github.com";

export const PROJECTS_CONSTANTS: readonly ProjectItem[] = [
  {
    current: true,
    title: "pgdiff",
    role: "solo · maintained",
    duration: "2025 — present · 7 mo build",
    body: "CLI that diffs two Postgres schemas and emits a reviewable migration plan. Used in CI by four teams at Meridian.",
    stack: ["Rust", "Postgres", "clap", "GitHub Actions"],
    tags: ["rust", "postgres"],
    links: [
      { label: "repo", href: GITHUB_URL },
      { label: "docs", href: GITHUB_URL },
    ],
  },
  {
    current: true,
    title: "this site",
    role: "solo · maintained",
    duration: "2026 · 3 weeks",
    body: "A portfolio with no navigation. Client-side command router, live suggestion popover, keyboard history.",
    stack: ["React", "TypeScript", "Vite"],
    tags: ["react", "typescript"],
    links: [
      { label: "repo", href: GITHUB_URL },
      { label: "live", href: GITHUB_URL },
    ],
  },
  {
    title: "relaykit",
    role: "solo · 340 downloads/wk",
    duration: "2024 — 2025 · 5 mo build",
    body: "Library for exactly-once-ish event handling on Kafka consumer groups. Handles offset commits, dedupe windows and poison messages.",
    stack: ["Go", "Kafka", "Redis"],
    tags: ["go", "kafka"],
    links: [
      { label: "repo", href: GITHUB_URL },
      { label: "post", href: GITHUB_URL },
    ],
  },
  {
    title: "slobench",
    role: "2 contributors",
    duration: "2024 · 6 weeks",
    body: "Turns Prometheus queries into SLO burn-rate dashboards from a single YAML file. Replaced 40 hand-built Grafana panels.",
    stack: ["Go", "Prometheus", "Grafana"],
    tags: ["go", "prometheus"],
    links: [{ label: "repo", href: GITHUB_URL }],
  },
  {
    title: "tracecut",
    role: "solo · internal → OSS",
    duration: "2023 · 4 weeks",
    body: "Trims OpenTelemetry traces down to the spans that actually explain the latency. Started as a debugging hack during an incident.",
    stack: ["Go", "OpenTelemetry"],
    tags: ["go", "otel"],
    links: [{ label: "repo", href: GITHUB_URL }],
  },
  {
    title: "warehouse-lint",
    role: "solo · archived",
    duration: "2022 · 3 weeks",
    body: "Static checks for dbt projects: naming, missing tests, orphaned models. Superseded by dbt's own linting.",
    stack: ["Python", "dbt"],
    tags: ["python", "dbt"],
    links: [{ label: "repo", href: GITHUB_URL }],
  },
] as const;
