import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { Rule } from "@/components/portfolio/ui/Rule";
import { SESSION_CONSTANTS } from "@/lib/constants/session.constants";

type ErrorViewProperties = {
  input: string;
};

export function ErrorView({ input }: ErrorViewProperties) {
  return (
    <FadeUp className="text-[0.85rem]">
      <Rule
        variant="command"
        command={input}
        exitCode={SESSION_CONSTANTS.ERROR_CODE}
        className="mb-3.5"
      />
      <div className="text-muted">{SESSION_CONSTANTS.ERROR_SUFFIX}</div>
    </FadeUp>
  );
}
