# TUI Portfolio

A terminal-style personal portfolio built with [Astro](https://astro.build) and React. Visitors navigate by typing commands (`/profile`, `/projects`, …). Content lives in plain TypeScript constant files — no CMS required.

**License:** MIT

---

## Quick start

Requirements:

- [Bun](https://bun.sh) (recommended), or Node.js `>= 22.12`
- Git

```bash
git clone https://github.com/FatihBARACKILIC/tui-portfolio.git
cd tui-portfolio
bun install
bun run dev
```

Open the URL printed in the terminal (usually `http://localhost:4321`).

Useful scripts:

| Command                         | What it does                 |
| ------------------------------- | ---------------------------- |
| `bun run dev`                   | Local development server     |
| `bun run build`                 | Production build → `dist/`   |
| `bun run preview`               | Preview the production build |
| `bun run typecheck`             | Astro + TypeScript check     |
| `bun run check` / `bun run fix` | Lint / format (Ultracite)    |

---

## Use this site as your own portfolio

Follow these steps in order.

### 1. Fork or clone

1. Fork the repo on GitHub (or clone it).
2. Create your own remote if you forked:
   ```bash
   git remote set-url origin https://github.com/<you>/<your-repo>.git
   ```
3. Install and run locally (`bun install` → `bun run dev`).

### 2. Replace identity and chrome

Edit **`src/lib/constants/app.constants.ts`**:

| Field | Appears in |
| --- | --- |
| `APP_NAME` | Name shown in the header bar (the tab title comes from `seo.constants.ts`) |
| `VERSION`, `ROLE`, `UPTIME`, `LOCATION`, `SHELL`, `DEPLOY` | Header meta row |
| `PROMPT_USER` | Prompt line (`visitor@tui`) |

Then **`src/lib/constants/session.constants.ts`**:

| Field | Purpose |
| --- | --- |
| `AVAILABLE` | Header status (open / closed to work) |
| `START_ROUTE` | Optional initial route (`""` or `"/"` = welcome; or e.g. `"profile"`) |
| `QUICK_JUMP` / `QUICK_JUMP_LABEL` | Header quick-jump chips and their caption |
| `HINT_READY` / `HINT_ROUTE_PREFIX` | Hint text under the prompt |
| `PROMPT_PLACEHOLDER` | Placeholder inside the prompt input |
| `POP_EMPTY` | Shown when nothing matches what you typed |
| `ERROR_SUFFIX` / `ERROR_CODE` | The “command not found” output |
| `NOT_FOUND_TITLE` | Page name used by `404.astro` |
| `PROMPT_LABEL` / `POP_LIST_LABEL` | Screen-reader names for the prompt and its suggestion list |
| `HISTORY_LIMIT` / `POP_CLOSE_MS` | Behaviour knobs — how many commands the prompt remembers, and the popover close animation |

Also update:

- `package.json` → `name`, `author`, `repository`, `bugs`
- Favicons under `public/` (`favicon.svg`, `favicon.ico`)

### 3. Replace all page content

Almost every screen is driven by a file under **`src/lib/constants/`**. Change the strings and arrays; keep the TypeScript shapes the same (field names and types).

| File                          | Command / screen                      |
| ----------------------------- | ------------------------------------- |
| `welcome.constants.ts`        | Home / MOTD (no route)                |
| `profile.constants.ts`        | `/profile` intro copy                 |
| `expertise.constants.ts`      | Expertise list (welcome + profile)    |
| `experience.constants.ts`     | `/experience`                         |
| `education.constants.ts`      | `/education`                          |
| `certifications.constants.ts` | `/certifications`                     |
| `skills.constants.ts`         | `/skills`                             |
| `stack.constants.ts`          | `/tech-stack`                         |
| `projects.constants.ts`       | `/projects`                           |
| `github.constants.ts`         | `/github` (stats + contrib grid size) |
| `blog.constants.ts`           | `/blog`                               |
| `articles.constants.ts`       | `/articles`                           |
| `resume.constants.ts`         | `/resume`                             |
| `timeline.constants.ts`       | `/career-timeline`                    |
| `contact.constants.ts`        | `/contact` labels and “direct” fields |
| `socials.constants.ts`        | `/socials` links                      |
| `availability.constants.ts`   | `/availability` + header status copy  |
| `now.constants.ts`            | `/now`                                |
| `changelog.constants.ts`      | `/changelog`                          |

Tips:

- Use `current: true` on experience, timeline or project items you want highlighted with the accent rail.
- After edits, run `bun run typecheck` — shape mismatches show up immediately.
- You do **not** need to touch React views for normal text changes.

### 4. Commands, aliases, and URLs

Commands are defined in **`src/lib/constants/commands.constants.ts`**:

- `COMMANDS` — names shown in Tab autocomplete and `/help`
- `COMMAND_ALIASES` — shortcuts (`whoami` → `profile`, `cv` → `resume`, …)
- `ROUTABLE_COMMANDS` — everything except `clear` (used for static paths)

Each routable command gets a URL like `/experience` via `src/pages/[command].astro`.

If you **add or remove** a command:

1. Update `CommandName`, `COMMANDS`, and aliases.
2. Wire the route in `src/components/portfolio/RouteOutput.tsx` (or remove the case).
3. Add or delete the matching `*.constants.ts` file.

Its URL, page title and meta description follow automatically — the title de-slugifies the name (`career-timeline` → `Career Timeline`) and the description reuses the `desc` you wrote. Only add a `LABEL_OVERRIDES` entry in `seo.constants.ts` if the casing needs help, the way `github` → `GitHub` does.

If you only rename copy in `desc`, no other files are required.

### 5. Contact form and resume (important)

**Contact** (`/contact`) is a **UI mock**: submit sets local “sent” state. Nothing is emailed or posted to an API.

It is a real `<form>` with labelled, `required` fields named `name`, `email` and `message`, so most form services accept it once you give the form an `action`.

To make it real you can, for example:

- Point the form at a service (Formspree, Basin, your own endpoint), or
- Keep the form as-is and rely on the “direct” mail/links in `contact.constants.ts` / `socials.constants.ts`

**Resume** download currently calls `window.print()` — it does not serve a PDF file. To offer a real PDF:

1. Put the file in `public/` (e.g. `public/cv.pdf`).
2. Change the button in `ResumeView.tsx` to an `<a href="/cv.pdf" download>` (or similar), and update `FILE_NAME` / `FILE_META` in `resume.constants.ts`.

### 6. SEO and link previews (important)

Two files drive everything search engines and link unfurlers see.

**`astro.config.mjs`** — set `site` to your deployed origin:

```js
site: "https://your-domain.com",
```

It ships as `https://example.com`. Canonical links, Open Graph URLs, `robots.txt` and `sitemap.xml` are all built from it, so leaving it unchanged points crawlers at the wrong domain.

**`src/lib/constants/seo.constants.ts`**:

| Field | Purpose |
| --- | --- |
| `SITE_NAME` | Suffix in every `<title>` — use your name |
| `DESCRIPTION` | Home page meta description and fallback |
| `DESCRIPTION_SUFFIX` | Appended to each command's `desc` on its own page |
| `OG_IMAGE` / `OG_IMAGE_ALT` | Social preview image (see below) |
| `LOCALE` | `og:locale` |
| `LABEL_OVERRIDES` | Casing a slug cannot infer, e.g. `github` → `GitHub` |
| `PERSON` | schema.org `Person` structured data |

Per-page titles and descriptions are derived automatically: `/career-timeline` becomes `Career Timeline | <SITE_NAME>`, described from that command's own `desc` in `commands.constants.ts`. Commands you add are covered without extra work.

**Social preview image:** `OG_IMAGE` is empty by default, so no `og:image` is emitted rather than a broken reference. To add one, drop a 1200×630 PNG in `public/` and set `OG_IMAGE: "/og.png"`. The Twitter card upgrades from `summary` to `summary_large_image` on its own.

`robots.txt` and `sitemap-index.xml` are generated at build time — there is nothing to maintain by hand. The sitemap matters more here than on a normal site: navigation is entirely client-side, so the site has no internal `<a>` links for a crawler to follow and the sitemap is the only way it discovers every command page.

### 7. Theme and fonts (optional)

Colors and the mono font tokens live in **`src/styles/global.css`** under `@theme` (`--color-accent`, `--color-ink`, `--font-mono`, …).

The IBM Plex Mono link is in **`src/layouts/AppLayout.astro`**. Swap the Google Fonts URL or self-host if you prefer.

### 8. Build and deploy

```bash
bun run build
```

Deploy the `dist/` folder to any static host, for example:

- [Cloudflare Pages](https://pages.cloudflare.com)
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- GitHub Pages — `site` is already covered in step 6; also set `base` in `astro.config.mjs` if the site is not served from the domain root

No server is required for the default mock contact flow.

---

## How navigation works

1. User types a command in the prompt (or uses Tab autocomplete / header chips).
2. The router updates the path with `history.pushState` (e.g. `/projects`) — repeating the command you are already on does not add a second history entry.
3. `RouteOutput` renders the matching view and fills it from constants.
4. Hard refresh on `/projects` still works: Astro prebuilds each command path and passes `initialRoute` into the app, so the static HTML already holds that command's output instead of the welcome screen.
5. An unknown URL falls through to `404.astro`, which renders the same `command not found` output the prompt shows.

`clear` (and aliases like `home`) resets output and returns to `/`.

---

## Project map

```
src/
  components/portfolio/   # App shell, prompt, views, UI primitives
  lib/constants/          # ← edit these for your content
  lib/helpers/            # routing, SEO titles, stagger, classnames
  pages/
    index.astro           # /
    [command].astro       # /profile, /projects, …
    404.astro             # unknown URLs → "command not found" output
    robots.txt.ts         # generated from `site`
  styles/global.css       # theme tokens
  layouts/AppLayout.astro
```

---

## Checklist for a personal fork

- [ ] `app.constants.ts` — name, role, location, prompt user
- [ ] `session.constants.ts` — availability, quick jumps, hints
- [ ] Every content file under `src/lib/constants/`
- [ ] `socials.constants.ts` — real URLs
- [ ] Contact: keep mock or wire a backend
- [ ] Resume: print mock or real PDF in `public/`
- [ ] Favicon + `package.json` metadata
- [ ] `site` in `astro.config.mjs` — real domain, not `example.com`
- [ ] `seo.constants.ts` — site name, description, `PERSON`
- [ ] Optional: `public/og.png` + `OG_IMAGE` for link previews
- [ ] Optional: theme colors in `global.css`
- [ ] `bun run typecheck` && `bun run build`
- [ ] Deploy `dist/`

---

## Contributing

Issues and PRs are welcome. Please run `bun run fix` and `bun run typecheck` before opening a PR. Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, …).

---

## License

MIT — see the repository license. Keep the license file when you redistribute; replace the sample content with your own.
