import { cva } from "class-variance-authority";
import { cn } from "@/lib/helpers/cn";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

export const contribCellVariants = cva("size-2.5", {
  variants: {
    level: {
      l0: "bg-white/6",
      l1: "bg-ok/22",
      l2: "bg-ok/40",
      l3: "bg-ok/65",
      l4: "bg-ok/90",
    },
  },
  defaultVariants: {
    level: "l0",
  },
});

type ContribCellProperties = ComponentProps<"span"> &
  VariantProps<typeof contribCellVariants>;

export const ContribCell = ({
  className,
  level,
  ...properties
}: ContribCellProperties) => (
  <span
    className={cn(contribCellVariants({ level }), className)}
    {...properties}
  />
);
