import { Button } from "@/components/portfolio/ui/Button";
import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { Rule } from "@/components/portfolio/ui/Rule";
import { Surface } from "@/components/portfolio/ui/Surface";
import { RESUME_CONSTANTS } from "@/lib/constants/resume.constants";
import { withStagger } from "@/lib/helpers/stagger";

const SECTIONS = withStagger(RESUME_CONSTANTS.SECTIONS, 130);

export const ResumeView = () => (
  <div>
    <FadeUp delayMs={60} className="mb-6">
      <Surface
        padding="md"
        className="flex flex-wrap items-center justify-between gap-3.5"
      >
        <div>
          <div className="mb-0.75">{RESUME_CONSTANTS.FILE_NAME}</div>
          <div className="text-muted text-[0.72rem]">
            {RESUME_CONSTANTS.FILE_META}
          </div>
        </div>
        <Button variant="accent" onClick={() => window.print()}>
          {RESUME_CONSTANTS.DOWNLOAD_LABEL}
        </Button>
      </Surface>
    </FadeUp>

    {SECTIONS.map((section) => (
      <FadeUp key={section.label} delayMs={section.delayMs} className="mb-5.5">
        <Rule label={section.label} className="mb-2.5" />
        {section.lines.map((line) => (
          <div
            key={line}
            className="mb-1.25 max-w-[74ch] text-[0.82rem] text-pretty"
          >
            {line}
          </div>
        ))}
      </FadeUp>
    ))}
  </div>
);
