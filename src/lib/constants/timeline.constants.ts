export interface TimelineItem {
  current?: boolean;
  year: string;
  event: string;
}

export const TIMELINE_CONSTANTS: readonly TimelineItem[] = [
  {
    current: true,
    year: "2026",
    event:
      "Leading the platform group at Meridian; eight engineers, one event bus.",
  },
  {
    year: "2023",
    event: "Joined Meridian Logistics as Staff Engineer.",
  },
  {
    year: "2020",
    event:
      "Moved into fintech at Ledgerline, took ownership of the payments ledger.",
  },
  {
    year: "2017",
    event: "First full-time product engineering role at Kestrel Studio.",
  },
  {
    year: "2014",
    event: "Finished MSc at TU Delft, started contracting independently.",
  },
  {
    year: "2012",
    event: "Graduated Boğaziçi, wrote a compiler I still think about.",
  },
] as const;
