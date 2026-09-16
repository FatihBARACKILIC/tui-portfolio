import { ContribGraph } from "@/components/portfolio/ui/ContribGraph";
import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { Rule } from "@/components/portfolio/ui/Rule";
import { Surface } from "@/components/portfolio/ui/Surface";
import { GITHUB_CONSTANTS } from "@/lib/constants/github.constants";
import { withStagger } from "@/lib/helpers/stagger";

const REPOS = withStagger(GITHUB_CONSTANTS.REPOS, 200);

export const GithubView = () => (
  <div>
    <FadeUp delayMs={60} className="mb-5.5">
      <Surface className="flex flex-wrap gap-6">
        {GITHUB_CONSTANTS.STATS.map((stat) => (
          <div key={stat.label}>
            <div className="text-[1.15rem]">{stat.value}</div>
            <div className="text-muted text-[0.65rem] tracking-[0.12em]">
              {stat.label}
            </div>
          </div>
        ))}
      </Surface>
    </FadeUp>

    <FadeUp delayMs={130} className="mb-6.5">
      <Rule label={GITHUB_CONSTANTS.WEEKS_LABEL} className="mb-3" />
      <div className="overflow-x-auto pb-1">
        <ContribGraph />
      </div>
    </FadeUp>

    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
      {REPOS.map((repo) => (
        <FadeUp key={repo.name} delayMs={repo.delayMs}>
          <Surface interactive>
            <div className="mb-1.5">{repo.name}</div>
            <div className="text-muted mb-2.5 text-[0.78rem] leading-normal text-pretty">
              {repo.body}
            </div>
            <div className="text-muted flex gap-3.5 text-[0.7rem]">
              <span>{repo.lang}</span>
              <span>★ {repo.stars}</span>
            </div>
          </Surface>
        </FadeUp>
      ))}
    </div>
  </div>
);
