export const SESSION_CONSTANTS = {
  AVAILABLE: true,
  START_ROUTE: "/" as string,
  HISTORY_LIMIT: 30,
  POP_CLOSE_MS: 110,
  QUICK_JUMP: ["profile", "projects", "github", "contact", "help"] as const,
  HINT_READY: "Ready. Try commands: profile, projects, skills, contact, whoami",
  HINT_ROUTE_PREFIX: "Ready. Output below from: ",
  ERROR_SUFFIX: "command not found. type help or / for available commands.",
} as const;
