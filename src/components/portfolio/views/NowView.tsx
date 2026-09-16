import { NOW_CONSTANTS } from "@/lib/constants/now.constants";
import { FadeUp } from "@/components/portfolio/ui/FadeUp";

export function NowView() {
  const [first, second, third] = NOW_CONSTANTS.LINES;

  return (
    <FadeUp delayMs={60} className="max-w-[74ch]">
      <div className="text-muted mb-3 text-[0.68rem] tracking-[0.14em]">
        {NOW_CONSTANTS.LABEL}
      </div>
      <p className="mb-2.5 text-[0.95rem] text-pretty">{first}</p>
      <p className="text-muted mb-2.5 text-pretty">{second}</p>
      <p className="text-muted text-pretty">{third}</p>
    </FadeUp>
  );
}
