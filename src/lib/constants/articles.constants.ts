export interface ArticleItem {
  title: string;
  publication: string;
  date: string;
}

export const ARTICLES_CONSTANTS: readonly ArticleItem[] = [
  {
    title: "Designing for replay in event-driven systems",
    publication: "InfoQ",
    date: "2026",
  },
  {
    title: "What SLOs get wrong about user experience",
    publication: "Pragmatic Eng.",
    date: "2025",
  },
  {
    title: "A practical guide to Kafka consumer semantics",
    publication: "Confluent",
    date: "2024",
  },
  {
    title: "Migrating a ledger without losing a cent",
    publication: "ACM Queue",
    date: "2023",
  },
] as const;
