import { cva } from "class-variance-authority";
import { cn } from "@/lib/helpers/cn";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

export const railVariants = cva("border-l-2 pl-4", {
  variants: {
    tone: {
      accent: "border-accent",
      line: "border-line",
    },
    spacing: {
      none: "",
      default: "pb-5.5",
      loose: "pb-6",
      timeline: "pb-5",
    },
  },
  defaultVariants: {
    tone: "line",
    spacing: "default",
  },
});

type RailProperties = ComponentProps<"div"> & VariantProps<typeof railVariants>;

export const Rail = ({
  className,
  tone,
  spacing,
  ...properties
}: RailProperties) => (
  <div
    className={cn(railVariants({ tone, spacing }), className)}
    {...properties}
  />
);
