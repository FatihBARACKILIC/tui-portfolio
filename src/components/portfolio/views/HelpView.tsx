import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { COMMANDS } from "@/lib/constants/commands.constants";
import { withStagger } from "@/lib/helpers/stagger";

const HELP_LIST = withStagger(
  COMMANDS.map((command) => ({
    cmd: `/${command.name}`,
    desc: command.desc,
  })),
  40
);

export function HelpView() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-x-7 gap-y-0.5">
      {HELP_LIST.map((item) => (
        <FadeUp
          key={item.cmd}
          delayMs={item.delayMs}
          className="flex gap-3 py-0.75"
        >
          <span className="text-accent w-32.5 shrink-0">{item.cmd}</span>
          <span className="text-muted min-w-0 flex-auto text-[0.8rem]">
            {item.desc}
          </span>
        </FadeUp>
      ))}
    </div>
  );
}
