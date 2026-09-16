export interface GithubStat {
  value: string;
  label: string;
}

export interface GithubRepo {
  name: string;
  body: string;
  lang: string;
  stars: string;
}

export const GITHUB_CONSTANTS = {
  STATS: [
    { value: "1,284", label: "CONTRIBUTIONS / YR" },
    { value: "38", label: "PUBLIC REPOS" },
    { value: "2.1k", label: "STARS EARNED" },
  ] as const satisfies readonly GithubStat[],
  REPOS: [
    {
      name: "fatih/pgdiff",
      body: "Schema diffing for Postgres, with a plan you can read.",
      lang: "Rust",
      stars: "912",
    },
    {
      name: "fatih/relaykit",
      body: "Event handling helpers for Kafka consumers.",
      lang: "Go",
      stars: "634",
    },
    {
      name: "fatih/slobench",
      body: "SLO dashboards from YAML.",
      lang: "Go",
      stars: "371",
    },
    {
      name: "fatih/dotfiles",
      body: "Neovim, tmux, and a shell that boots fast.",
      lang: "Lua",
      stars: "188",
    },
  ] as const satisfies readonly GithubRepo[],
  WEEKS_LABEL: "LAST 26 WEEKS",
  CONTRIB_CELLS: 182,
} as const;
