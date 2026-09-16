export interface ExperienceItem {
  current?: boolean;
  role: string;
  company: string;
  duration: string;
  body: string;
}

export const EXPERIENCE_CONSTANTS: readonly ExperienceItem[] = [
  {
    current: true,
    role: "Staff Engineer",
    company: "Meridian Logistics",
    duration: "2023 — present",
    body: "Lead the platform group. Moved 40 services onto a shared event bus and cut median deploy time from 22 to 4 minutes.",
  },
  {
    role: "Senior Backend Engineer",
    company: "Ledgerline",
    duration: "2020 — 2023",
    body: "Owned the payments ledger. Rewrote reconciliation in Go, taking a nightly 6-hour job down to 11 minutes.",
  },
  {
    role: "Backend Engineer",
    company: "Kestrel Studio",
    duration: "2017 — 2020",
    body: "Built APIs for client products across retail and media. First exposure to running things I had also designed.",
  },
  {
    role: "Independent Contractor",
    company: "self-employed",
    duration: "2014 — 2017",
    body: "Django and Postgres work for small teams. Learned to write scopes before writing code.",
  },
] as const;
