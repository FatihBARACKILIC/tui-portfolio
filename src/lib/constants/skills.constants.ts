export interface SkillCategory {
  label: string;
  items: readonly string[];
}

export const SKILLS_CONSTANTS: readonly SkillCategory[] = [
  {
    label: "LANGUAGES",
    items: ["Go", "Python", "TypeScript", "Rust", "SQL", "Bash"],
  },
  {
    label: "FRAMEWORKS",
    items: ["gRPC", "FastAPI", "Django", "Temporal", "React", "dbt"],
  },
  {
    label: "TOOLS",
    items: [
      "Postgres",
      "Kafka",
      "Kubernetes",
      "Terraform",
      "ClickHouse",
      "Grafana",
    ],
  },
] as const;
