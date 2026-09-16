import { SESSION_CONSTANTS } from "@/lib/constants/session.constants";
import {
  findCommand,
  readRouteFromPath,
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

export const getInitialRoute = (): CommandName | null => {
  const fromUrl = readRouteFromPath(window.location.pathname);
  if (fromUrl !== null) {
    return fromUrl;
  }

  const start = SESSION_CONSTANTS.START_ROUTE.trim();
  if (start.length === 0) {
    return null;
  }

  return findCommand(start)?.name ?? null;
};

export const pushRoute = (name: string): void => {
  try {
    history.pushState({ r: name }, "", routePath(name));
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
