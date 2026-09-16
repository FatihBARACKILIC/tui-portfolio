import { cva } from "class-variance-authority";
import { cn } from "@/lib/helpers/cn";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

export const statusDotVariants = cva("rounded-full", {
  variants: {
    tone: {
      ok: "bg-ok",
      muted: "bg-muted",
    },
    size: {
      sm: "size-1.5",
      md: "size-1.75",
    },
    pulse: {
      true: "animate-dot-pulse",
      false: "",
    },
  },
  defaultVariants: {
    tone: "ok",
    size: "md",
    pulse: false,
  },
});

type StatusDotProperties = ComponentProps<"span"> &
  VariantProps<typeof statusDotVariants>;

export const StatusDot = ({
  className,
  tone,
  size,
  pulse,
  ...properties
}: StatusDotProperties) => (
  <span
    className={cn(statusDotVariants({ tone, size, pulse }), className)}
    {...properties}
  />
);

type StatusBadgeProperties = {
  label: string;
  tone?: "ok" | "muted";
  pulse?: boolean;
  className?: string;
};

export const StatusBadge = ({
  label,
  tone = "ok",
  pulse = false,
  className,
}: StatusBadgeProperties) => (
  <div
    className={cn(
      "flex items-center gap-2 text-[0.72rem] tracking-widest",
      tone === "ok" ? "text-ok" : "text-muted",
      className
    )}
  >
    <StatusDot tone={tone} pulse={pulse} />
    <span>{label}</span>
  </div>
);
