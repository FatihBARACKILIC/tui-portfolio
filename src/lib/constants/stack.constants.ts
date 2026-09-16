export interface StackCategory {
  label: string;
  note: string;
  items: readonly string[];
}

export const STACK_CONSTANTS: readonly StackCategory[] = [
  {
    label: "DAILY DRIVER",
    note: "in use this week",
    items: ["Go", "Postgres", "Kafka", "Kubernetes", "Neovim", "Linear"],
  },
  {
    label: "CURRENTLY EXPLORING",
    note: "learning in the open",
    items: ["Rust", "TigerBeetle", "NATS", "Zig"],
  },
  {
    label: "KEEPING WARM",
    note: "reach for when it fits",
    items: ["Python", "TypeScript", "Terraform", "dbt"],
  },
] as const;
