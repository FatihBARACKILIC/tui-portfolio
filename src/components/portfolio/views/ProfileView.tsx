import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { Rule } from "@/components/portfolio/ui/Rule";
import { Surface } from "@/components/portfolio/ui/Surface";
import { EXPERTISE_CONSTANTS } from "@/lib/constants/expertise.constants";
import { PROFILE_CONSTANTS } from "@/lib/constants/profile.constants";

export const ProfileView = () => (
  <div>
    <FadeUp delayMs={60} className="mb-6.5 max-w-[74ch]">
      <p className="mb-2.5 text-pretty">{PROFILE_CONSTANTS.PARAGRAPH_1}</p>
      <p className="text-muted text-pretty">{PROFILE_CONSTANTS.PARAGRAPH_2}</p>
    </FadeUp>
    <FadeUp delayMs={130}>
      <Rule label={PROFILE_CONSTANTS.EXPERTISE_LABEL} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {EXPERTISE_CONSTANTS.map((item) => (
          <Surface key={item.title} padding="card" interactive>
            <div className="mb-1.25">{item.title}</div>
            <div className="text-muted text-[0.78rem] leading-normal">
              {item.body}
            </div>
          </Surface>
        ))}
      </div>
    </FadeUp>
  </div>
);
