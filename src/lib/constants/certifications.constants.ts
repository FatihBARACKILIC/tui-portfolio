export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
}

export const CERTIFICATIONS_CONSTANTS: readonly CertificationItem[] = [
  {
    name: "AWS Solutions Architect — Professional",
    issuer: "Amazon Web Services",
    date: "2025",
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "CNCF",
    date: "2024",
  },
  {
    name: "Google Professional Data Engineer",
    issuer: "Google Cloud",
    date: "2022",
  },
] as const;
