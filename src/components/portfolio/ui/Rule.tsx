import { cva } from "class-variance-authority";
import { cn } from "@/lib/helpers/cn";
import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

export const ruleVariants = cva("flex items-center gap-2.5", {
  variants: {
    variant: {
      section: "mb-3.5",
      command: "mb-5.5 animate-fade-up",
    },
  },
  defaultVariants: {
    variant: "section",
  },
});

export const metaLabelVariants = cva(
  "text-[0.68rem] tracking-widest text-muted"
);

type SectionRuleProperties = {
  variant?: "section";
  label: string;
  className?: string;
};

type CommandRuleProperties = {
  variant: "command";
  command: string;
  exitCode?: string;
  className?: string;
};

type RuleProperties = SectionRuleProperties | CommandRuleProperties;

export const Rule = (properties: RuleProperties) => {
  if (properties.variant === "command") {
    const { command, exitCode = "exit 0", className } = properties;
    return (
      <div className={cn(ruleVariants({ variant: "command" }), className)}>
        <span className="text-accent">$</span>
        <span>{command}</span>
        <span className="border-line-dot flex-auto border-t border-dotted" />
        <span className="text-muted text-[0.65rem] tracking-[0.12em]">
          {exitCode}
        </span>
      </div>
    );
  }

  const { label, className } = properties;
  return (
    <div className={cn(ruleVariants({ variant: "section" }), className)}>
      <span className="text-muted text-[0.68rem] tracking-[0.14em]">
        {label}
      </span>
      <span className="border-line-dot flex-auto border-t border-dotted" />
    </div>
  );
};

type MetaLabelProperties = {
  children: ReactNode;
  className?: string;
} & VariantProps<typeof metaLabelVariants>;

export const MetaLabel = ({ children, className }: MetaLabelProperties) => (
  <span className={cn(metaLabelVariants(), className)}>{children}</span>
);
