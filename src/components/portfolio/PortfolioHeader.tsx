import { Button } from "@/components/portfolio/ui/Button";
import { MetaLabel } from "@/components/portfolio/ui/Rule";
import { StatusBadge, StatusDot } from "@/components/portfolio/ui/Status";
import { APP_CONSTANTS } from "@/lib/constants/app.constants";
import { AVAILABILITY_CONSTANTS } from "@/lib/constants/availability.constants";
import { SESSION_CONSTANTS } from "@/lib/constants/session.constants";

type PortfolioHeaderProperties = {
  onRun: (command: string) => void;
  onClear: () => void;
};

const META = [
  { label: "ROLE", value: APP_CONSTANTS.ROLE },
  { label: "UPTIME", value: APP_CONSTANTS.UPTIME },
  { label: "LOCATION", value: APP_CONSTANTS.LOCATION },
  { label: "SHELL", value: APP_CONSTANTS.SHELL },
  { label: "DEPLOY", value: APP_CONSTANTS.DEPLOY },
] as const;

export const PortfolioHeader = ({
  onRun,
  onClear,
}: PortfolioHeaderProperties) => {
  const isAvailable = SESSION_CONSTANTS.AVAILABLE;
  const status = isAvailable
    ? AVAILABILITY_CONSTANTS.OPEN
    : AVAILABILITY_CONSTANTS.CLOSED;
  const tone = isAvailable ? "ok" : "muted";

  return (
    <aside className="border-line bg-panel flex w-full flex-wrap items-center gap-x-5.5 gap-y-2.5 border-b px-6.5 py-3.25">
      <div className="flex flex-wrap items-baseline gap-2.5">
        <div className="text-[1.05rem] font-semibold tracking-widest">
          {APP_CONSTANTS.APP_NAME}
        </div>
        <div className="text-muted text-[0.72rem] tracking-[0.14em]">
          {APP_CONSTANTS.VERSION}
        </div>
        <StatusBadge label={status.TAG} tone={tone} pulse />
      </div>

      <div className="flex flex-wrap items-baseline gap-x-4.5 gap-y-1.5">
        {META.map((item) => (
          <div key={item.label} className="flex items-baseline gap-1.75">
            <MetaLabel>{item.label}</MetaLabel>
            <span className="text-right text-[0.75rem]">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="text-muted text-[0.68rem] tracking-[0.14em]">
          {SESSION_CONSTANTS.QUICK_JUMP_LABEL}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SESSION_CONSTANTS.QUICK_JUMP.map((chip) => (
            <Button key={chip} variant="chip" onClick={() => onRun(chip)}>
              {chip}
            </Button>
          ))}
        </div>
      </div>

      <div className="text-muted ml-auto flex items-center gap-3.5 text-[0.68rem] tracking-widest">
        <span className="flex items-center gap-1.75">
          <StatusDot tone="ok" size="sm" />
          <span>SESSION ACTIVE</span>
        </span>
        <Button variant="ghost" onClick={onClear}>
          clear
        </Button>
      </div>
    </aside>
  );
};
