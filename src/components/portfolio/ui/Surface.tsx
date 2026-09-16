import { cva } from "class-variance-authority";
import { cn } from "@/lib/helpers/cn";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

export const surfaceVariants = cva("border bg-panel", {
  variants: {
    variant: {
      panel: "border-line",
      prompt:
        "flex items-center gap-2.5 border-line px-3.25 py-2.75 transition-[border-color] duration-150 ease-out",
    },
    padding: {
      none: "",
      sm: "px-4 py-3.5",
      md: "px-4 py-3.75",
      lg: "p-5",
      card: "px-3.75 py-3.25",
    },
    active: {
      true: "border-accent",
      false: "",
    },
    interactive: {
      true: "transition-[border-color] duration-150 ease-out hover:border-accent",
      false: "",
    },
  },
  defaultVariants: {
    variant: "panel",
    padding: "sm",
    active: false,
    interactive: false,
  },
});

type SurfaceProperties = ComponentProps<"div"> &
  VariantProps<typeof surfaceVariants>;

export const Surface = ({
  className,
  variant = "panel",
  padding,
  active,
  interactive,
  ...properties
}: SurfaceProperties) => (
  <div
    className={cn(
      surfaceVariants({
        variant,
        padding: variant === "prompt" ? "none" : padding,
        active,
        interactive,
      }),
      className
    )}
    {...properties}
  />
);
