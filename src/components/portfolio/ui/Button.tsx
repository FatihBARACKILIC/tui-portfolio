import { cva } from "class-variance-authority";
import { cn } from "@/lib/helpers/cn";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

export const buttonVariants = cva(
  "transition-[border-color,color,background-color] duration-150 ease-out",
  {
    variants: {
      variant: {
        chip: "cursor-pointer border border-line bg-transparent px-2.25 py-1 text-[0.72rem] text-ok hover:border-accent hover:text-accent",
        ghost:
          "cursor-pointer border-none bg-transparent p-0.5 text-[0.7rem] text-muted hover:text-accent",
        accent:
          "cursor-pointer border border-accent bg-transparent px-3.5 py-2 text-[0.78rem] text-accent hover:bg-accent-soft",
        link: "border-b border-accent-line text-[0.75rem] text-accent hover:border-fg hover:text-fg",
      },
    },
    defaultVariants: {
      variant: "chip",
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonAsButton = ButtonVariants &
  Omit<ComponentProps<"button">, "href"> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonVariants &
  ComponentProps<"a"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = (properties: ButtonProps) => {
  const { className, variant, ...rest } = properties;
  const classes = cn(buttonVariants({ variant }), className);

  if (typeof properties.href === "string") {
    const linkProperties = rest as ComponentProps<"a">;
    return (
      <a
        className={classes}
        rel={linkProperties.rel ?? "noopener noreferrer"}
        target={linkProperties.target ?? "_blank"}
        {...linkProperties}
      />
    );
  }

  const buttonProperties = rest as ComponentProps<"button">;
  return (
    <button
      type={buttonProperties.type ?? "button"}
      className={classes}
      {...buttonProperties}
    />
  );
};
