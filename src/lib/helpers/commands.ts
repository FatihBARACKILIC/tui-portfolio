import { COMMAND_ALIASES, COMMANDS } from "@/lib/constants/commands.constants";
import type { Command, CommandName } from "@/lib/constants/commands.constants";

const clearCommand: CommandName = "clear";

export const resolveCommand = (name: string): string =>
  COMMAND_ALIASES[name] ?? name;

export const findCommand = (name: string): Command | undefined => {
  const resolved = resolveCommand(name);
  return COMMANDS.find((command) => command.name === resolved);
};

/**
 * Resolves a name to a command that owns a URL. `clear` runs as an action only,
 * so it never becomes a route even if someone types the path by hand.
 */
export const findRoutableCommand = (name: string): CommandName | null => {
  const command = findCommand(name);
  if (command === undefined || command.name === clearCommand) {
    return null;
  }
  return command.name;
};

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

export const readPathSegment = (pathname: string): string | null =>
  pathname.split("/").findLast((part) => part.length > 0) ?? null;

export const routePath = (name: string): string => `/${name}`;
