import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { Surface } from "@/components/portfolio/ui/Surface";
import { StatusDot } from "@/components/portfolio/ui/Status";
import { AVAILABILITY_CONSTANTS } from "@/lib/constants/availability.constants";
import { SESSION_CONSTANTS } from "@/lib/constants/session.constants";

export const AvailabilityView = () => {
  const isAvailable = SESSION_CONSTANTS.AVAILABLE;
  const copy = isAvailable
    ? AVAILABILITY_CONSTANTS.OPEN
    : AVAILABILITY_CONSTANTS.CLOSED;
  const tone = isAvailable ? "ok" : "muted";

  return (
    <FadeUp delayMs={60}>
      <Surface padding="lg">
        <div className="mb-3 flex items-center gap-2.25">
          <StatusDot tone={tone} />
          <h2 className="text-muted text-[0.68rem] tracking-[0.14em]">
            {copy.HEADLINE}
          </h2>
        </div>
        <p className="mb-2 max-w-[66ch] text-[0.95rem] text-pretty">
          {copy.LINE}
        </p>
        <p className="text-muted max-w-[66ch] text-[0.82rem] text-pretty">
          {copy.DETAIL}
        </p>
      </Surface>
    </FadeUp>
  );
};
