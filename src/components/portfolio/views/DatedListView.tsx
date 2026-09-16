import { cva } from "class-variance-authority";
import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { cn } from "@/lib/helpers/cn";
import { withStagger } from "@/lib/helpers/stagger";

export const datedItemVariants = cva("", {
  variants: {
    variant: {
      post: "mb-4 border-b border-dotted border-line-strong pb-4",
      log: "flex gap-4 pb-3.5",
    },
  },
  defaultVariants: {
    variant: "post",
  },
});

type PostItem = {
  key: string;
  date: string;
  title: string;
  body: string;
};

type LogItem = {
  key: string;
  date: string;
  body: string;
};

type PostProperties = {
  variant?: "post";
  items: readonly PostItem[];
  baseDelay?: number;
};

type LogProperties = {
  variant: "log";
  items: readonly LogItem[];
  baseDelay?: number;
};

export type DatedListViewProps = PostProperties | LogProperties;

export const DatedListView = (properties: DatedListViewProps) => {
  const baseDelay = properties.baseDelay ?? 60;

  if (properties.variant === "log") {
    const items = withStagger(properties.items, baseDelay);
    return (
      <div>
        {items.map((item) => (
          <FadeUp
            key={item.key}
            delayMs={item.delayMs}
            className={cn(datedItemVariants({ variant: "log" }))}
          >
            <span className="text-muted w-23 shrink-0 text-[0.76rem]">
              {item.date}
            </span>
            <span className="min-w-0 flex-auto text-[0.83rem] text-pretty">
              {item.body}
            </span>
          </FadeUp>
        ))}
      </div>
    );
  }

  const items = withStagger(properties.items, baseDelay);
  return (
    <div>
      {items.map((item) => (
        <FadeUp
          key={item.key}
          delayMs={item.delayMs}
          className={cn(datedItemVariants({ variant: "post" }))}
        >
          <div className="mb-1.5 flex flex-wrap items-baseline gap-3">
            <span className="text-muted text-[0.7rem] tracking-widest">
              {item.date}
            </span>
            <span>{item.title}</span>
          </div>
          <div className="text-muted max-w-[74ch] text-[0.8rem] text-pretty">
            {item.body}
          </div>
        </FadeUp>
      ))}
    </div>
  );
};
