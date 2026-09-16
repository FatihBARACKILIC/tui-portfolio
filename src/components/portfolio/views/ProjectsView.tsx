import { Button } from "@/components/portfolio/ui/Button";
import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { Rail } from "@/components/portfolio/ui/Rail";
import { Tag } from "@/components/portfolio/ui/Tag";
import { PROJECTS_CONSTANTS } from "@/lib/constants/projects.constants";
import { withStagger } from "@/lib/helpers/stagger";

const ITEMS = withStagger(PROJECTS_CONSTANTS, 40);

export const ProjectsView = () => (
  <div>
    {ITEMS.map((project) => (
      <FadeUp key={project.title} delayMs={project.delayMs}>
        <Rail tone={project.tone} spacing="loose">
          <div className="mb-0.75 flex flex-wrap items-baseline gap-2.5">
            <span>{project.title}</span>
            <span className="text-ok text-[0.78rem]">{project.role}</span>
          </div>
          <div className="text-muted mb-2 text-[0.68rem] tracking-widest">
            {project.duration}
          </div>
          <div className="text-soft mb-2.5 max-w-[72ch] text-[0.82rem] text-pretty">
            {project.body}
          </div>
          <div className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-1.5">
            <span className="text-muted mr-0.5 text-[0.65rem] tracking-[0.12em]">
              STACK
            </span>
            {project.stack.map((item) => (
              <Tag key={item} variant="compact">
                {item}
              </Tag>
            ))}
          </div>
          <div className="mb-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-1.5">
            <span className="text-muted mr-0.5 text-[0.65rem] tracking-[0.12em]">
              TAGS
            </span>
            {project.tags.map((tag) => (
              <Tag key={tag} variant="flag">
                --{tag}
              </Tag>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3.5 gap-y-1.5">
            {project.links.map((link) => (
              <Button variant="link" key={link.label} href={link.href}>
                ↗ {link.label}
              </Button>
            ))}
          </div>
        </Rail>
      </FadeUp>
    ))}
  </div>
);
