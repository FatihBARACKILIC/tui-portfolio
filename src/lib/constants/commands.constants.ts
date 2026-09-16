export type CommandName =
  | "help"
  | "profile"
  | "experience"
  | "education"
  | "certifications"
  | "skills"
  | "tech-stack"
  | "projects"
  | "github"
  | "blog"
  | "articles"
  | "resume"
  | "career-timeline"
  | "contact"
  | "socials"
  | "availability"
  | "now"
  | "changelog"
  | "clear";

export interface Command {
  name: CommandName;
  desc: string;
}

export const COMMANDS: readonly Command[] = [
  { name: "help", desc: "list every available command" },
  { name: "profile", desc: "who I am and what I do" },
  { name: "experience", desc: "work history" },
  { name: "education", desc: "academic background" },
  { name: "certifications", desc: "certificates and issuers" },
  { name: "skills", desc: "languages, frameworks, tools" },
  { name: "tech-stack", desc: "what I actually use daily" },
  { name: "projects", desc: "selected work" },
  { name: "github", desc: "repos and activity" },
  { name: "blog", desc: "technical writing" },
  { name: "articles", desc: "published elsewhere" },
  { name: "resume", desc: "CV summary and PDF" },
  { name: "career-timeline", desc: "milestones by year" },
  { name: "contact", desc: "send a message" },
  { name: "socials", desc: "where else to find me" },
  { name: "availability", desc: "current openness to work" },
  { name: "now", desc: "what I'm working on" },
  { name: "changelog", desc: "updates to this site" },
  { name: "clear", desc: "reset the session output" },
] as const;

export const COMMAND_ALIASES: Readonly<Record<string, CommandName>> = {
  about: "profile",
  whoami: "profile",
  work: "experience",
  cv: "resume",
  ls: "help",
  "?": "help",
  man: "help",
  social: "socials",
  stack: "tech-stack",
  exit: "clear",
  home: "clear",
};

export const ROUTABLE_COMMANDS = COMMANDS.filter((c) => c.name !== "clear");
