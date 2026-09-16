import { Rule } from "@/components/portfolio/ui/Rule";
import { AvailabilityView } from "@/components/portfolio/views/AvailabilityView";
import { ContactView } from "@/components/portfolio/views/ContactView";
import { DatedListView } from "@/components/portfolio/views/DatedListView";
import { ErrorView } from "@/components/portfolio/views/ErrorView";
import { GithubView } from "@/components/portfolio/views/GithubView";
import { HelpView } from "@/components/portfolio/views/HelpView";
import { MetaListView } from "@/components/portfolio/views/MetaListView";
import { NowView } from "@/components/portfolio/views/NowView";
import { ProfileView } from "@/components/portfolio/views/ProfileView";
import { ProjectsView } from "@/components/portfolio/views/ProjectsView";
import { RailEntriesView } from "@/components/portfolio/views/RailEntriesView";
import { ResumeView } from "@/components/portfolio/views/ResumeView";
import { TagGroupsView } from "@/components/portfolio/views/TagGroupsView";
import { WelcomeView } from "@/components/portfolio/views/WelcomeView";
import { ARTICLES_CONSTANTS } from "@/lib/constants/articles.constants";
import { BLOG_CONSTANTS } from "@/lib/constants/blog.constants";
import { CERTIFICATIONS_CONSTANTS } from "@/lib/constants/certifications.constants";
import { CHANGELOG_CONSTANTS } from "@/lib/constants/changelog.constants";
import { EDUCATION_CONSTANTS } from "@/lib/constants/education.constants";
import { EXPERIENCE_CONSTANTS } from "@/lib/constants/experience.constants";
import { SKILLS_CONSTANTS } from "@/lib/constants/skills.constants";
import { SOCIALS_CONSTANTS } from "@/lib/constants/socials.constants";
import { STACK_CONSTANTS } from "@/lib/constants/stack.constants";
import { TIMELINE_CONSTANTS } from "@/lib/constants/timeline.constants";
import type { CommandName } from "@/lib/constants/commands.constants";
import type { ReactNode } from "react";

type ContactHandlers = {
  sent: boolean;
  cName: string;
  cEmail: string;
  cMsg: string;
  onName: (value: string) => void;
  onEmail: (value: string) => void;
  onMsg: (value: string) => void;
  onSubmit: () => void;
};

type RouteOutputProperties = {
  route: CommandName | null;
  err: string | null;
} & ContactHandlers;

const EXPERIENCE_ITEMS = EXPERIENCE_CONSTANTS.map((job) => ({
  key: `${job.role}-${job.company}`,
  title: job.role,
  subtitle: job.company,
  meta: job.duration,
  body: job.body,
  current: job.current,
}));

const EDUCATION_ITEMS = EDUCATION_CONSTANTS.map((ed) => ({
  key: ed.degree,
  title: ed.degree,
  subtitle: ed.school,
  meta: ed.duration,
  body: ed.body,
}));

const TIMELINE_ITEMS = TIMELINE_CONSTANTS.map((item) => ({
  key: item.year,
  year: item.year,
  event: item.event,
  current: item.current,
}));

const CERTIFICATION_ITEMS = CERTIFICATIONS_CONSTANTS.map((item) => ({
  key: item.name,
  title: item.name,
  meta: item.issuer,
  date: item.date,
}));

const ARTICLE_ITEMS = ARTICLES_CONSTANTS.map((article) => ({
  key: article.title,
  title: article.title,
  meta: article.publication,
  date: article.date,
}));

const SOCIAL_ITEMS = SOCIALS_CONSTANTS.map((social) => ({
  key: social.label,
  href: social.href,
  icon: social.icon,
  label: social.label,
  handle: social.handle,
}));

const BLOG_ITEMS = BLOG_CONSTANTS.map((post) => ({
  key: post.title,
  date: post.date,
  title: post.title,
  body: post.excerpt,
}));

const CHANGELOG_ITEMS = CHANGELOG_CONSTANTS.map((item) => ({
  key: item.date,
  date: item.date,
  body: item.entry,
}));

const SKILL_GROUPS = SKILLS_CONSTANTS.map((category) => ({
  key: category.label,
  label: category.label,
  items: category.items,
}));

const STACK_GROUPS = STACK_CONSTANTS.map((category) => ({
  key: category.label,
  label: category.label,
  note: category.note,
  items: category.items,
}));

const renderRoute = (
  route: CommandName,
  contact: ContactHandlers
): ReactNode => {
  switch (route) {
    case "help": {
      return <HelpView />;
    }
    case "profile": {
      return <ProfileView />;
    }
    case "experience": {
      return <RailEntriesView items={EXPERIENCE_ITEMS} />;
    }
    case "education": {
      return <RailEntriesView variant="stacked" items={EDUCATION_ITEMS} />;
    }
    case "certifications": {
      return <MetaListView items={CERTIFICATION_ITEMS} />;
    }
    case "skills": {
      return <TagGroupsView items={SKILL_GROUPS} />;
    }
    case "tech-stack": {
      return <TagGroupsView variant="panel" items={STACK_GROUPS} />;
    }
    case "projects": {
      return <ProjectsView />;
    }
    case "github": {
      return <GithubView />;
    }
    case "blog": {
      return <DatedListView items={BLOG_ITEMS} />;
    }
    case "articles": {
      return <MetaListView items={ARTICLE_ITEMS} />;
    }
    case "resume": {
      return <ResumeView />;
    }
    case "career-timeline": {
      return <RailEntriesView variant="timeline" items={TIMELINE_ITEMS} />;
    }
    case "contact": {
      return <ContactView {...contact} />;
    }
    case "socials": {
      return <MetaListView variant="social" items={SOCIAL_ITEMS} />;
    }
    case "availability": {
      return <AvailabilityView />;
    }
    case "now": {
      return <NowView />;
    }
    case "changelog": {
      return <DatedListView variant="log" items={CHANGELOG_ITEMS} />;
    }
    default: {
      return null;
    }
  }
};

export const RouteOutput = ({
  route,
  err,
  sent,
  cName,
  cEmail,
  cMsg,
  onName,
  onEmail,
  onMsg,
  onSubmit,
}: RouteOutputProperties) => {
  if (err) {
    return <ErrorView input={err} />;
  }

  if (!route) {
    return <WelcomeView />;
  }

  return (
    <>
      <Rule variant="command" command={`/${route}`} />
      {renderRoute(route, {
        cEmail,
        cMsg,
        cName,
        onEmail,
        onMsg,
        onName,
        onSubmit,
        sent,
      })}
    </>
  );
};
