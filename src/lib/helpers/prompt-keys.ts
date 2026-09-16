import { findCommand } from "@/lib/helpers/commands";
import type { KeyboardEvent } from "react";
import type { Command } from "@/lib/constants/commands.constants";

interface PromptKeyContext {
  closePop: () => void;
  hist: string[];
  histIdx: number;
  hl: number;
  input: string;
  isOpen: boolean;
  list: Command[];
  openPop: () => void;
  run: (raw: string) => void;
  setHighlight: (index: number) => void;
  setHistoryBrowse: (histIndex: number, input: string) => void;
  setInput: (value: string) => void;
  syncPopScroll: (index: number) => void;
}

const didHandleOpenNav = (
  event: KeyboardEvent<HTMLInputElement>,
  context: PromptKeyContext
): boolean => {
  if (!context.isOpen) {
    return false;
  }

  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
    return false;
  }

  event.preventDefault();
  if (context.list.length === 0) {
    return true;
  }

  const direction = event.key === "ArrowDown" ? 1 : -1;
  const next =
    (context.hl + direction + context.list.length) % context.list.length;
  context.setHighlight(next);
  context.syncPopScroll(next);
  return true;
};

const didHandleOpenComplete = (
  event: KeyboardEvent<HTMLInputElement>,
  context: PromptKeyContext
): boolean => {
  if (!context.isOpen) {
    return false;
  }

  if (event.key !== "Enter" && event.key !== "Tab") {
    return false;
  }

  if (context.list.length === 0) {
    return event.key === "Tab";
  }

  event.preventDefault();
  const pickIndex = Math.min(context.hl, context.list.length - 1);
  const pick = context.list[pickIndex];
  const typed = context.input.replace(/^\//u, "").toLowerCase().trim();
  const matched = findCommand(typed);
  const shouldRun =
    event.key === "Enter" && (matched !== undefined || typed === pick.name);

  if (shouldRun) {
    context.run(matched === undefined ? pick.name : typed);
  } else {
    context.setInput(`/${pick.name}`);
    context.closePop();
  }

  return true;
};

const nextHistoryIndex = (
  key: string,
  histIndex: number,
  historyLength: number
): number => {
  if (key === "ArrowUp") {
    if (histIndex < 0) {
      return historyLength - 1;
    }
    return Math.max(0, histIndex - 1);
  }

  if (histIndex < 0) {
    return -1;
  }
  return Math.min(historyLength - 1, histIndex + 1);
};

const didHandleHistoryBrowse = (
  event: KeyboardEvent<HTMLInputElement>,
  context: PromptKeyContext
): boolean => {
  if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
    return false;
  }
  if (context.input.length > 0) {
    return false;
  }
  if (context.hist.length === 0) {
    return false;
  }

  event.preventDefault();
  const index = nextHistoryIndex(
    event.key,
    context.histIdx,
    context.hist.length
  );
  const entry = index < 0 ? "" : (context.hist[index] ?? "");
  context.setHistoryBrowse(index, entry);
  return true;
};

export const handlePromptKeyDown = (
  event: KeyboardEvent<HTMLInputElement>,
  context: PromptKeyContext
): void => {
  if (!context.isOpen && event.key === "Tab") {
    event.preventDefault();
    context.openPop();
    return;
  }

  if (didHandleOpenNav(event, context)) {
    return;
  }

  if (didHandleOpenComplete(event, context)) {
    return;
  }

  if (context.isOpen && event.key === "Escape") {
    event.preventDefault();
    context.closePop();
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    context.run(context.input);
    return;
  }

  didHandleHistoryBrowse(event, context);
};
