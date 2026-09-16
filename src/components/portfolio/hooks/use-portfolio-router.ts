import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { SESSION_CONSTANTS } from "@/lib/constants/session.constants";
import {
  filterCommands,
  findCommand,
  readRouteFromPath,
  resolveCommand,
} from "@/lib/helpers/commands";
import { handlePromptKeyDown } from "@/lib/helpers/prompt-keys";
import {
  appendHistory,
  getInitialRoute,
  initialPortfolioState,
  pushRoute,
  replaceHome,
} from "@/lib/helpers/portfolio-state";
import type { KeyboardEvent } from "react";
import type { PortfolioState } from "@/lib/helpers/portfolio-state";

export const usePortfolioRouter = () => {
  const [state, setState] = useState<PortfolioState>(initialPortfolioState);
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
      setState((previous) => ({ ...previous, pop: null }));
    }, SESSION_CONSTANTS.POP_CLOSE_MS);
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
        box.scrollTop = Math.max(0, top - 5);
      } else if (bottom > box.scrollTop + box.clientHeight) {
        box.scrollTop = bottom - box.clientHeight + 5;
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
    inputReference.current?.focus();
  }, [closePop]);

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
    [clearSession, closePop]
  );

  const onPopState = useEffectEvent(() => {
    const route = readRouteFromPath(window.location.pathname);
    setState((previous) => ({ ...previous, err: null, route }));
  });

  useEffect(() => {
    const initial = getInitialRoute();
    if (initial !== null) {
      setState((previous) => ({ ...previous, route: initial }));
    }
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
        setState((previous) => ({ ...previous, pop: "open" }));
      } else if (value.length === 0) {
        closePop();
      }
    },
    [closePop]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      handlePromptKeyDown(event, {
        closePop,
        hist: state.hist,
        histIdx: state.histIdx,
        hl: state.hl,
        input: state.input,
        isOpen: state.pop === "open",
        list: filterCommands(state.input),
        openPop: () => {
          setState((previous) => ({ ...previous, hl: 0, pop: "open" }));
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
    closePop,
    filtered: filterCommands(state.input),
    inputRef: inputReference,
    onInputChange,
    onKeyDown,
    popBoxRef: popBoxReference,
    run,
    setState,
    state,
  };
};
