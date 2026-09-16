export interface EducationItem {
  degree: string;
  school: string;
  duration: string;
  body: string;
}

export const EDUCATION_CONSTANTS: readonly EducationItem[] = [
  {
    degree: "MSc Computer Science",
    school: "TU Delft",
    duration: "2012 — 2014",
    body: "Thesis on scheduling for heterogeneous compute clusters.",
  },
  {
    degree: "BSc Software Engineering",
    school: "Boğaziçi University",
    duration: "2008 — 2012",
    body: "Focus on operating systems and compilers.",
  },
] as const;
