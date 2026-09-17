import { ListRow } from "@/components/portfolio/ui/ListRow";
import { Surface } from "@/components/portfolio/ui/Surface";
import { APP_CONSTANTS } from "@/lib/constants/app.constants";
import { SESSION_CONSTANTS } from "@/lib/constants/session.constants";
import { cn } from "@/lib/helpers/cn";
import type { Command } from "@/lib/constants/commands.constants";
import type { PopState } from "@/lib/helpers/portfolio-state";
import type { KeyboardEvent, RefObject } from "react";

const POP_LIST_ID = "command-suggestions";

const optionId = (name: string): string => `command-option-${name}`;

type PortfolioPromptProperties = {
  input: string;
  focused: boolean;
  pop: PopState;
  hl: number;
  route: string | null;
  filtered: Command[];
  inputRef: RefObject<HTMLInputElement | null>;
  popBoxRef: RefObject<HTMLDivElement | null>;
  onInputChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onHover: (index: number) => void;
  onPick: (name: string) => void;
};

export const PortfolioPrompt = ({
  input,
  focused,
  pop,
  hl,
  route,
  filtered,
  inputRef,
  popBoxRef,
  onInputChange,
  onKeyDown,
  onFocus,
  onBlur,
  onHover,
  onPick,
}: PortfolioPromptProperties) => {
  const hintLine = route
    ? `${SESSION_CONSTANTS.HINT_ROUTE_PREFIX}${route}`
    : SESSION_CONSTANTS.HINT_READY;
  const isPopVisible = pop !== null;
  const isPopOpen = pop === "open";
  const highlight = Math.min(hl, Math.max(0, filtered.length - 1));
  const activeOption = filtered[highlight];
  const activeDescendant =
    isPopOpen && activeOption !== undefined
      ? optionId(activeOption.name)
      : undefined;

  return (
    <div className="border-line bg-ink sticky bottom-0 z-5 border-t px-6.5 pt-3 pb-3.5">
      <div className="relative">
        <Surface variant="prompt" active={focused || isPopVisible}>
          <span className="text-ok shrink-0 text-[0.8rem] whitespace-nowrap">
            {APP_CONSTANTS.PROMPT_USER}
            <span className="text-muted">:~</span>{" "}
            <span className="text-accent">$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label={SESSION_CONSTANTS.PROMPT_LABEL}
            aria-expanded={isPopOpen}
            aria-controls={POP_LIST_ID}
            aria-autocomplete="list"
            aria-activedescendant={activeDescendant}
            value={input}
            spellCheck={false}
            autoComplete="off"
            placeholder={SESSION_CONSTANTS.PROMPT_PLACEHOLDER}
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            className="text-fg caret-accent caret-block min-w-0 flex-auto border-none bg-transparent p-0 text-[0.85rem] outline-none"
          />
          <span className="text-muted flex shrink-0 gap-1.5 text-[0.68rem]">
            <span className="border-line border px-1.5 py-0.5">↵ run</span>
            <span className="border-line hidden border px-1.5 py-0.5 sm:inline">
              tab complete
            </span>
          </span>
        </Surface>

        {isPopVisible ? (
          <div
            ref={popBoxRef}
            id={POP_LIST_ID}
            role="listbox"
            aria-label={SESSION_CONSTANTS.POP_LIST_LABEL}
            data-pop-box="1"
            className={cn(
              "border-line bg-panel absolute right-0 bottom-[calc(100%+8px)] left-0 max-h-[min(300px,48vh)] overflow-y-auto overscroll-contain border p-1.25",
              pop === "closing" ? "animate-pop-out" : "animate-pop-in"
            )}
          >
            {filtered.map((option, index) => (
              <ListRow
                key={option.name}
                variant="command"
                id={optionId(option.name)}
                name={option.name}
                desc={option.desc}
                active={index === highlight}
                onClick={() => onPick(option.name)}
                onMouseEnter={() => onHover(index)}
              />
            ))}
            {filtered.length === 0 ? (
              <div
                role="presentation"
                className="text-muted py-3 text-center text-[0.78rem]"
              >
                {SESSION_CONSTANTS.POP_EMPTY}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="text-muted px-0.5 pt-2 text-[0.7rem]">{hintLine}</div>
    </div>
  );
};
