import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { Rail } from "@/components/portfolio/ui/Rail";
import { EXPERTISE_CONSTANTS } from "@/lib/constants/expertise.constants";
import { WELCOME_CONSTANTS } from "@/lib/constants/welcome.constants";

export const WelcomeView = () => (
  <FadeUp>
    <div className="text-muted mb-3 text-[0.68rem] tracking-[0.14em]">
      {WELCOME_CONSTANTS.LABEL}
    </div>
    <p className="mb-2.5 max-w-[72ch] text-pretty">{WELCOME_CONSTANTS.INTRO}</p>
    <p className="text-muted mb-6 max-w-[72ch] text-pretty">
      {WELCOME_CONSTANTS.HINT}
    </p>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
      {EXPERTISE_CONSTANTS.map((item) => (
        <Rail key={item.title} tone="accent" spacing="none" className="py-0.5">
          <div className="mb-0.75">{item.title}</div>
          <div className="text-muted text-[0.76rem] leading-normal">
            {item.body}
          </div>
        </Rail>
      ))}
    </div>
  </FadeUp>
);
