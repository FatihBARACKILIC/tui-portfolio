import { cva } from "class-variance-authority";
import { cn } from "@/lib/helpers/cn";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

export const buttonVariants = cva(
  "transition-[border-color,color,background-color] duration-150 ease-out",
  {
    variants: {
      variant: {
        chip: "border-line text-ok hover:border-accent hover:text-accent cursor-pointer border bg-transparent px-2.25 py-1 text-[0.72rem]",
        ghost:
          "text-muted hover:text-accent cursor-pointer border-none bg-transparent p-0.5 text-[0.7rem]",
        accent:
          "border-accent text-accent hover:bg-accent-soft cursor-pointer border bg-transparent px-3.5 py-2 text-[0.78rem]",
        link: "border-accent-line text-accent hover:border-fg hover:text-fg border-b text-[0.75rem]",
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
  const classes = cn(
    buttonVariants({ variant: properties.variant }),
    properties.className
  );

  if (typeof properties.href === "string") {
    const {
      className: _className,
      variant: _variant,
      href,
      rel,
      target,
      ...rest
    } = properties;
    return (
      <a
        className={classes}
        href={href}
        rel={rel ?? "noopener noreferrer"}
        target={target ?? "_blank"}
        {...rest}
      />
    );
  }

  const {
    className: _className,
    variant: _variant,
    href: _href,
    type,
    ...rest
  } = properties;
  return <button type={type ?? "button"} className={classes} {...rest} />;
};
