import { cva } from "class-variance-authority";
import { cn } from "@/lib/helpers/cn";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

export const fieldVariants = cva(
  "border-line bg-panel text-fg caret-accent caret-block focus:border-accent w-full border px-3 py-2.5 text-[0.82rem] transition-[border-color] duration-150 ease-out outline-none"
);

type InputProperties = ComponentProps<"input"> & {
  multiline?: false;
};

type TextAreaProperties = ComponentProps<"textarea"> & {
  multiline: true;
};

export type FieldProps = (InputProperties | TextAreaProperties) &
  VariantProps<typeof fieldVariants>;

export const Field = (properties: FieldProps) => {
  if (properties.multiline === true) {
    const { className, multiline: _multiline, ...rest } = properties;
    return <textarea className={cn(fieldVariants(), className)} {...rest} />;
  }

  const { className, multiline: _multiline, ...rest } = properties;
  return <input className={cn(fieldVariants(), className)} {...rest} />;
};
