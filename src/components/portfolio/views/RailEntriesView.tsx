import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { Rail } from "@/components/portfolio/ui/Rail";
import { withStagger } from "@/lib/helpers/stagger";
import type { RailTone } from "@/lib/helpers/stagger";

type DetailEntry = {
  key: string;
  title: string;
  subtitle: string;
  meta: string;
  body: string;
  current?: boolean;
  tone?: RailTone;
};

type TimelineEntry = {
  key: string;
  year: string;
  event: string;
  current?: boolean;
  tone?: RailTone;
};

type DetailProperties = {
  variant?: "detail" | "stacked";
  items: readonly DetailEntry[];
  baseDelay?: number;
};

type TimelineProperties = {
  variant: "timeline";
  items: readonly TimelineEntry[];
  baseDelay?: number;
};

export type RailEntriesViewProps = DetailProperties | TimelineProperties;

export const RailEntriesView = (properties: RailEntriesViewProps) => {
  const baseDelay = properties.baseDelay ?? 60;

  if (properties.variant === "timeline") {
    const items = withStagger(properties.items, baseDelay);
    return (
      <div>
        {items.map((item) => (
          <FadeUp key={item.key} delayMs={item.delayMs}>
            <Rail
              tone={item.tone ?? "line"}
              spacing="timeline"
              className="flex gap-4"
            >
              <span className="text-muted w-11 shrink-0 text-[0.78rem]">
                {item.year}
              </span>
              <span className="min-w-0 flex-auto text-[0.85rem] text-pretty">
                {item.event}
              </span>
            </Rail>
          </FadeUp>
        ))}
      </div>
    );
  }

  const isStacked = properties.variant === "stacked";
  const items = withStagger(properties.items, baseDelay);

  return (
    <div>
      {items.map((item) => (
        <FadeUp key={item.key} delayMs={item.delayMs}>
          <Rail tone={item.tone ?? "line"}>
            {isStacked ? (
              <>
                <div className="mb-0.75">{item.title}</div>
                <div className="text-ok mb-0.75 text-[0.78rem]">
                  @ {item.subtitle}
                </div>
              </>
            ) : (
              <div className="mb-0.75 flex flex-wrap items-baseline gap-2.5">
                <span>{item.title}</span>
                <span className="text-ok text-[0.78rem]">
                  @ {item.subtitle}
                </span>
              </div>
            )}
            <div className="text-muted mb-2 text-[0.68rem] tracking-widest">
              {item.meta}
            </div>
            <div className="text-soft max-w-[72ch] text-[0.82rem] text-pretty">
              {item.body}
            </div>
          </Rail>
        </FadeUp>
      ))}
    </div>
  );
};
