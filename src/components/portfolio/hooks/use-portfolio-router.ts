import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { SESSION_CONSTANTS } from "@/lib/constants/session.constants";
import {
  filterCommands,
  findCommand,
  resolveCommand,
} from "@/lib/helpers/commands";
import { handlePromptKeyDown } from "@/lib/helpers/prompt-keys";
import {
  appendHistory,
  getInitialLocation,
  initialPortfolioState,
  pushRoute,
  readLocation,
  replaceHome,
} from "@/lib/helpers/portfolio-state";
import type { KeyboardEvent } from "react";
import type { CommandName } from "@/lib/constants/commands.constants";
import type { PortfolioState } from "@/lib/helpers/portfolio-state";

const scrollPadding = 5;

export const usePortfolioRouter = (initialRoute: CommandName | null = null) => {
  const [state, setState] = useState<PortfolioState>(() => ({
    ...initialPortfolioState,
    route: initialRoute,
  }));
  const inputReference = useRef<HTMLInputElement>(null);
  const popTimeoutReference = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const scrollTimeoutReference = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const popBoxReference = useRef<HTMLDivElement>(null);

  const closePop = useCallback(() => {
    setState((previous) => {
      if (previous.pop === null) {
        return previous;
      }
      return { ...previous, pop: "closing" };
    });

    if (popTimeoutReference.current !== null) {
      clearTimeout(popTimeoutReference.current);
    }
    popTimeoutReference.current = setTimeout(() => {
      // Guard: a popover reopened mid-animation must not be closed by this timer.
      setState((previous) =>
        previous.pop === "closing" ? { ...previous, pop: null } : previous
      );
    }, SESSION_CONSTANTS.POP_CLOSE_MS);
  }, []);

  const openPop = useCallback(() => {
    if (popTimeoutReference.current !== null) {
      clearTimeout(popTimeoutReference.current);
      popTimeoutReference.current = null;
    }
    setState((previous) => ({ ...previous, pop: "open" }));
  }, []);

  const focusInput = useCallback(() => {
    inputReference.current?.focus();
  }, []);

  const syncPopScroll = useCallback((index: number) => {
    if (scrollTimeoutReference.current !== null) {
      clearTimeout(scrollTimeoutReference.current);
    }
    scrollTimeoutReference.current = setTimeout(() => {
      const box = popBoxReference.current;
      if (box === null) {
        return;
      }
      const rows = [...box.querySelectorAll<HTMLElement>("[data-pop-row]")];
      if (index < 0 || index >= rows.length) {
        return;
      }
      const row = rows[index];
      const top = row.offsetTop;
      const bottom = top + row.offsetHeight;
      if (top < box.scrollTop) {
        box.scrollTop = Math.max(0, top - scrollPadding);
      } else if (bottom > box.scrollTop + box.clientHeight) {
        box.scrollTop = bottom - box.clientHeight + scrollPadding;
      }
    }, 0);
  }, []);

  const clearSession = useCallback(() => {
    replaceHome();
    setState((previous) => ({
      ...previous,
      err: null,
      input: "",
      route: null,
      sent: false,
    }));
    closePop();
    focusInput();
  }, [closePop, focusInput]);

  const run = useCallback(
    (raw: string) => {
      const txt = raw.trim();
      if (txt.length === 0) {
        return;
      }

      const name = resolveCommand(txt.replace(/^\//u, "").toLowerCase());

      setState((previous) => {
        const hist = appendHistory(previous.hist, txt);
        return { ...previous, hist, histIdx: -1 };
      });
      closePop();
      focusInput();

      if (name === "clear") {
        clearSession();
        return;
      }

      const command = findCommand(name);
      if (command !== undefined) {
        pushRoute(command.name);
        setState((previous) => ({
          ...previous,
          err: null,
          input: "",
          route: command.name,
          sent: false,
        }));
        return;
      }

      setState((previous) => ({
        ...previous,
        err: txt,
        input: "",
        route: null,
      }));
    },
    [clearSession, closePop, focusInput]
  );

  const onPopState = useEffectEvent(() => {
    const location = readLocation(window.location.pathname);
    setState((previous) => ({
      ...previous,
      err: location.err,
      route: location.route,
    }));
  });

  useEffect(() => {
    const initial = getInitialLocation();
    setState((previous) =>
      previous.route === initial.route && previous.err === initial.err
        ? previous
        : { ...previous, err: initial.err, route: initial.route }
    );
    inputReference.current?.focus();

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      if (popTimeoutReference.current !== null) {
        clearTimeout(popTimeoutReference.current);
      }
      if (scrollTimeoutReference.current !== null) {
        clearTimeout(scrollTimeoutReference.current);
      }
    };
  }, []);

  const onInputChange = useCallback(
    (value: string) => {
      setState((previous) => ({
        ...previous,
        err: null,
        histIdx: -1,
        hl: 0,
        input: value,
      }));

      if (value.startsWith("/")) {
        openPop();
      } else if (value.length === 0) {
        closePop();
      }
    },
    [closePop, openPop]
  );

  const filtered = useMemo(() => filterCommands(state.input), [state.input]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      handlePromptKeyDown(event, {
        closePop,
        hist: state.hist,
        histIdx: state.histIdx,
        hl: state.hl,
        input: state.input,
        isOpen: state.pop === "open",
        list: filtered,
        openPop: () => {
          setState((previous) => ({ ...previous, hl: 0 }));
          openPop();
        },
        run,
        setHighlight: (index) => {
          setState((previous) => ({ ...previous, hl: index }));
        },
        setHistoryBrowse: (histIndex, input) => {
          setState((previous) => ({ ...previous, histIdx: histIndex, input }));
        },
        setInput: (value) => {
          setState((previous) => ({ ...previous, input: value }));
        },
        syncPopScroll,
      });
    },
    [
      closePop,
      filtered,
      openPop,
      run,
      state.hist,
      state.histIdx,
      state.hl,
      state.input,
      state.pop,
      syncPopScroll,
    ]
  );

  return {
    clearSession,
    filtered,
    inputRef: inputReference,
    onInputChange,
    onKeyDown,
    popBoxRef: popBoxReference,
    run,
    setState,
    state,
  };
};
