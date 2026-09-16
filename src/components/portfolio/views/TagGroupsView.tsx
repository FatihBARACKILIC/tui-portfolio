import { cva } from "class-variance-authority";
import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { Rule } from "@/components/portfolio/ui/Rule";
import { Surface } from "@/components/portfolio/ui/Surface";
import { Tag } from "@/components/portfolio/ui/Tag";
import { cn } from "@/lib/helpers/cn";
import { withStagger } from "@/lib/helpers/stagger";
import type { VariantProps } from "class-variance-authority";

export const tagGroupVariants = cva("", {
  variants: {
    variant: {
      flat: "mb-6",
      panel: "mb-3.5",
    },
  },
  defaultVariants: {
    variant: "flat",
  },
});

type TagGroup = {
  key: string;
  label: string;
  note?: string;
  items: readonly string[];
};

type TagGroupsViewProperties = {
  items: readonly TagGroup[];
  baseDelay?: number;
  tagVariant?: "outline" | "soft";
} & VariantProps<typeof tagGroupVariants>;

export const TagGroupsView = ({
  items,
  baseDelay = 60,
  variant = "flat",
  tagVariant = variant === "panel" ? "soft" : "outline",
}: TagGroupsViewProperties) => {
  const staggered = withStagger(items, baseDelay);

  return (
    <div>
      {staggered.map((group) => (
        <FadeUp
          key={group.key}
          delayMs={group.delayMs}
          className={cn(tagGroupVariants({ variant }))}
        >
          {variant === "panel" ? (
            <Surface>
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2.5">
                <span className="text-accent text-[0.68rem] tracking-[0.14em]">
                  {group.label}
                </span>
                {group.note ? (
                  <span className="text-muted text-[0.7rem]">{group.note}</span>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Tag key={item} variant={tagVariant}>
                    {item}
                  </Tag>
                ))}
              </div>
            </Surface>
          ) : (
            <>
              <Rule label={group.label} className="mb-2.75" />
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Tag key={item} variant={tagVariant}>
                    {item}
                  </Tag>
                ))}
              </div>
            </>
          )}
        </FadeUp>
      ))}
    </div>
  );
};
