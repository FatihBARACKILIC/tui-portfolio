import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";
import { PortfolioPrompt } from "@/components/portfolio/PortfolioPrompt";
import { RouteOutput } from "@/components/portfolio/RouteOutput";
import { usePortfolioRouter } from "@/components/portfolio/hooks/use-portfolio-router";
import type { CommandName } from "@/lib/constants/commands.constants";

type PortfolioAppProperties = {
  /**
  Route the page was prerendered for, so the static HTML matches the URL.
  */
  initialRoute?: CommandName | null;
};

export default function PortfolioApp({
  initialRoute = null,
}: PortfolioAppProperties) {
  const {
    state,
    setState,
    inputRef,
    popBoxRef,
    run,
    clearSession,
    onInputChange,
    onKeyDown,
    filtered,
  } = usePortfolioRouter(initialRoute);

  return (
    <div className="bg-ink text-fg flex min-h-screen flex-col text-[0.875rem] leading-[1.55]">
      <PortfolioHeader onRun={run} onClear={clearSession} />

      <main className="flex min-w-0 flex-auto flex-col">
        <div className="max-w-205 flex-auto px-6.5 pt-5.5 pb-6.5">
          <RouteOutput
            route={state.route}
            err={state.err}
            sent={state.sent}
            cName={state.cName}
            cEmail={state.cEmail}
            cMsg={state.cMsg}
            onName={(value) =>
              setState((previous) => ({ ...previous, cName: value }))
            }
            onEmail={(value) =>
              setState((previous) => ({ ...previous, cEmail: value }))
            }
            onMsg={(value) =>
              setState((previous) => ({ ...previous, cMsg: value }))
            }
            onSubmit={() =>
              setState((previous) => ({ ...previous, sent: true }))
            }
          />
        </div>

        <PortfolioPrompt
          input={state.input}
          focused={state.focused}
          pop={state.pop}
          hl={state.hl}
          route={state.route}
          filtered={filtered}
          inputRef={inputRef}
          popBoxRef={popBoxRef}
          onInputChange={onInputChange}
          onKeyDown={onKeyDown}
          onFocus={() =>
            setState((previous) => ({ ...previous, focused: true }))
          }
          onBlur={() =>
            setState((previous) => ({ ...previous, focused: false }))
          }
          onHover={(index) =>
            setState((previous) => ({ ...previous, hl: index }))
          }
          onPick={run}
        />
      </main>
    </div>
  );
}
