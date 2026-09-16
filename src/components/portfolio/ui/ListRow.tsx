import { cva } from "class-variance-authority";
import { cn } from "@/lib/helpers/cn";
import type { ComponentProps } from "react";

export const listRowVariants = cva("flex", {
  variants: {
    variant: {
      meta: "flex-wrap items-baseline gap-x-3.5 gap-y-1 border-b border-dotted border-line-strong py-2.75",
      social:
        "items-center gap-3.5 border-b border-dotted border-line-strong px-0.5 py-3 text-fg transition-colors duration-150 ease-out hover:text-accent",
      command: "cursor-pointer items-baseline gap-3 px-2.25 py-1.5",
    },
    active: {
      true: "bg-accent-soft text-accent",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "command",
      active: false,
      class: "bg-transparent text-fg",
    },
  ],
  defaultVariants: {
    variant: "meta",
    active: false,
  },
});

export const listMarkerVariants = cva("shrink-0", {
  variants: {
    variant: {
      meta: "text-accent",
      social: "w-6.5 text-[0.76rem] text-ok",
      command: "w-2.25",
    },
    active: {
      true: "text-accent",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "command",
      active: false,
      class: "text-transparent",
    },
  ],
  defaultVariants: {
    variant: "meta",
    active: false,
  },
});

type MetaRowProperties = {
  variant?: "meta";
  title: string;
  meta: string;
  date: string;
  className?: string;
};

type SocialRowProperties = {
  variant: "social";
  href: string;
  icon: string;
  label: string;
  handle: string;
  className?: string;
};

type CommandRowProperties = {
  variant: "command";
  name: string;
  desc: string;
  active?: boolean;
  className?: string;
} & Pick<ComponentProps<"div">, "onClick" | "onMouseEnter">;

export type ListRowProps =
  MetaRowProperties | SocialRowProperties | CommandRowProperties;

export const ListRow = (properties: ListRowProps) => {
  if (properties.variant === "social") {
    const { href, icon, label, handle, className } = properties;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(listRowVariants({ variant: "social" }), className)}
      >
        <span className={listMarkerVariants({ variant: "social" })}>
          {icon}
        </span>
        <span className="flex-auto text-[0.85rem]">{label}</span>
        <span className="text-muted text-[0.76rem]">{handle}</span>
      </a>
    );
  }

  if (properties.variant === "command") {
    const {
      name,
      desc,
      active = false,
      className,
      onClick,
      onMouseEnter,
    } = properties;
    return (
      <div
        data-pop-row="1"
        className={cn(
          listRowVariants({ variant: "command", active }),
          className
        )}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        <span className={listMarkerVariants({ variant: "command", active })}>
          ▸
        </span>
        <span className="shrink-0 text-[0.82rem]">/{name}</span>
        <span className="text-muted min-w-0 flex-auto overflow-hidden text-[0.72rem] text-ellipsis whitespace-nowrap">
          {desc}
        </span>
      </div>
    );
  }

  const { title, meta, date, className } = properties;
  return (
    <div className={cn(listRowVariants({ variant: "meta" }), className)}>
      <span className={listMarkerVariants({ variant: "meta" })}>▸</span>
      <span className="min-w-0 flex-[1_1_240px]">{title}</span>
      <span className="text-muted text-[0.78rem]">{meta}</span>
      <span className="text-muted w-11 shrink-0 text-right text-[0.7rem] tracking-widest">
        {date}
      </span>
    </div>
  );
};
