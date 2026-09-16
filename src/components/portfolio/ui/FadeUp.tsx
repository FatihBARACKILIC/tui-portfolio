import { cn } from "@/lib/helpers/cn";
import type { CSSProperties, ReactNode } from "react";

type FadeUpProperties = {
  children: ReactNode;
  delayMs?: number;
  className?: string;
};

export const FadeUp = ({
  children,
  delayMs = 0,
  className,
}: FadeUpProperties) => {
  const style =
    delayMs > 0
      ? ({ "--fade-delay": `${delayMs}ms` } as CSSProperties)
      : undefined;

  return (
    <div
      className={cn(
        "animate-fade-up",
        delayMs > 0 && "[animation-delay:var(--fade-delay)]",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
