import { cn } from "@/lib/helpers/cn";
import type { ReactNode } from "react";

interface FadeUpProperties {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

export const FadeUp = ({
  children,
  delayMs = 0,
  className,
}: FadeUpProperties) => (
  <div
    className={cn("animate-fade-up", className)}
    style={delayMs > 0 ? { animationDelay: `${delayMs}ms` } : undefined}
  >
    {children}
  </div>
);
