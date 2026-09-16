export interface ExpertiseItem {
  title: string;
  body: string;
}

export const EXPERTISE_CONSTANTS: readonly ExpertiseItem[] = [
  {
    title: "Distributed systems",
    body: "Event-driven services, queue semantics, and making retries boring.",
  },
  {
    title: "Data platforms",
    body: "Streaming and batch pipelines, schema evolution, warehouse modelling.",
  },
  {
    title: "Developer tooling",
    body: "Internal CLIs, CI ergonomics, and cutting build times in half.",
  },
  {
    title: "Reliability",
    body: "SLOs that mean something, incident review, on-call people sleep through.",
  },
] as const;
