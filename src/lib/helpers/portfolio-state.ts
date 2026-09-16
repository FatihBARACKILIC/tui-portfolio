import { SESSION_CONSTANTS } from "@/lib/constants/session.constants";
import {
  findRoutableCommand,
  readPathSegment,
  routePath,
} from "@/lib/helpers/commands";
import type { CommandName } from "@/lib/constants/commands.constants";

export type PopState = null | "open" | "closing";

export interface PortfolioState {
  cEmail: string;
  cMsg: string;
  cName: string;
  err: string | null;
  focused: boolean;
  hist: string[];
  histIdx: number;
  hl: number;
  input: string;
  pop: PopState;
  route: CommandName | null;
  sent: boolean;
}

export interface PortfolioLocation {
  err: string | null;
  route: CommandName | null;
}

export const initialPortfolioState: PortfolioState = {
  cEmail: "",
  cMsg: "",
  cName: "",
  err: null,
  focused: false,
  hist: [],
  histIdx: -1,
  hl: 0,
  input: "",
  pop: null,
  route: null,
  sent: false,
};

/**
 * Maps a pathname onto what the output pane should show. An unknown segment is
 * reported as a failed command, which is how the static 404 page renders the
 * usual "command not found" output.
 */
export const readLocation = (pathname: string): PortfolioLocation => {
  const segment = readPathSegment(pathname);
  if (segment === null) {
    return { err: null, route: null };
  }

  const route = findRoutableCommand(segment);
  if (route === null) {
    return { err: segment, route: null };
  }
  return { err: null, route };
};

export const getInitialLocation = (): PortfolioLocation => {
  const fromUrl = readLocation(window.location.pathname);
  if (fromUrl.route !== null || fromUrl.err !== null) {
    return fromUrl;
  }

  const start = SESSION_CONSTANTS.START_ROUTE.trim();
  if (start.length === 0) {
    return fromUrl;
  }

  return { err: null, route: findRoutableCommand(start) };
};

const stripTrailingSlashes = (value: string): string => {
  let end = value.length;
  while (end > 0 && value[end - 1] === "/") {
    end -= 1;
  }
  return value.slice(0, end);
};

/**
 * Pushes a route unless the browser is already on it, so repeating a command
 * does not stack duplicate history entries that the back button has to unwind.
 */
export const pushRoute = (name: string): void => {
  const target = routePath(name);
  if (stripTrailingSlashes(window.location.pathname) === target) {
    return;
  }

  try {
    history.pushState({ r: name }, "", target);
  } catch {
    // ignore history failures in constrained environments
  }
};

export const replaceHome = (): void => {
  try {
    history.replaceState({}, "", "/");
  } catch {
    // ignore history failures in constrained environments
  }
};

export const appendHistory = (hist: string[], entry: string): string[] =>
  [...hist, entry].slice(-SESSION_CONSTANTS.HISTORY_LIMIT);
