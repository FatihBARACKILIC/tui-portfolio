import { FadeUp } from "@/components/portfolio/ui/FadeUp";

type ErrorViewProperties = {
  input: string;
};

export function ErrorView({ input }: ErrorViewProperties) {
  return (
    <FadeUp className="text-[0.85rem]">
      <div className="mb-3.5 flex items-center gap-2.5">
        <span className="text-accent">$</span>
        <span>{input}</span>
        <span className="border-line-dot flex-auto border-t border-dotted" />
        <span className="text-muted text-[0.65rem] tracking-[0.12em]">
          exit 127
        </span>
      </div>
      <div className="text-muted">
        command not found. type <span className="text-accent">help</span> or{" "}
        <span className="text-accent">/</span> for available commands.
      </div>
    </FadeUp>
  );
}
