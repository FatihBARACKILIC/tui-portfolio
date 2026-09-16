export interface ResumeSection {
  label: string;
  lines: readonly string[];
}

export const RESUME_CONSTANTS = {
  FILE_NAME: "fatih_yilmaz_cv.pdf",
  FILE_META: "updated 2026 — 08 · 2 pages · 184 KB",
  DOWNLOAD_LABEL: "↓ Download PDF",
  SECTIONS: [
    {
      label: "SUMMARY",
      lines: [
        "Backend and platform engineer, 12 years. Distributed services, data platforms, developer tooling.",
        "Currently Staff Engineer at Meridian Logistics, leading a group of eight.",
      ],
    },
    {
      label: "SELECTED IMPACT",
      lines: [
        "Cut median deploy time from 22 minutes to 4 across 40 services.",
        "Reduced nightly reconciliation runtime by 97% on a payments ledger.",
        "Brought paging volume down 70% while improving incident detection.",
      ],
    },
    {
      label: "EDUCATION",
      lines: [
        "MSc Computer Science, TU Delft (2014)",
        "BSc Software Engineering, Boğaziçi University (2012)",
      ],
    },
  ] as const satisfies readonly ResumeSection[],
} as const;
