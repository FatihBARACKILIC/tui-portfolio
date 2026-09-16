import { COMMAND_ALIASES, COMMANDS } from "@/lib/constants/commands.constants";
import type { Command, CommandName } from "@/lib/constants/commands.constants";

export const resolveCommand = (name: string): string =>
  COMMAND_ALIASES[name] ?? name;

export const findCommand = (name: string): Command | undefined => {
  const resolved = resolveCommand(name);
  return COMMANDS.find((command) => command.name === resolved);
};

export const isCommandName = (name: string): name is CommandName =>
  COMMANDS.some((command) => command.name === name);

export const filterCommands = (input: string): Command[] => {
  const query = input.replace(/^\//u, "").toLowerCase().trim();
  if (query.length === 0) {
    return [...COMMANDS];
  }

  const starts = COMMANDS.filter((command) => command.name.startsWith(query));
  const rest = COMMANDS.filter(
    (command) => command.name.includes(query) && !command.name.startsWith(query)
  );
  return [...starts, ...rest];
};

export const readRouteFromPath = (pathname: string): CommandName | null => {
  const segment = pathname.split("/").findLast((part) => part.length > 0);
  if (segment === undefined) {
    return null;
  }

  return findCommand(segment)?.name ?? null;
};

export const routePath = (name: string): string => `/${name}`;
