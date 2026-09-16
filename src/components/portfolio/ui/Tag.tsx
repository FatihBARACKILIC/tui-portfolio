import { cva } from "class-variance-authority";
import { cn } from "@/lib/helpers/cn";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

export const tagVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      outline: "border border-line px-2.5 py-1 text-[0.76rem]",
      compact: "border border-line px-2 py-0.5 text-[0.72rem]",
      soft: "bg-ok-soft px-2.25 py-1 text-[0.76rem] text-ok",
      flag: "bg-ok-soft px-1.75 py-0.5 text-[0.68rem] text-ok",
    },
  },
  defaultVariants: {
    variant: "outline",
  },
});

type TagProperties = ComponentProps<"span"> & VariantProps<typeof tagVariants>;

export const Tag = ({ className, variant, ...properties }: TagProperties) => (
  <span className={cn(tagVariants({ variant }), className)} {...properties} />
);
