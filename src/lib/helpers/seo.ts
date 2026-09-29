import { SEO_CONSTANTS } from "@/lib/constants/seo.constants";
import { findCommand } from "@/lib/helpers/commands";

export const commandLabel = (name: string): string =>
  SEO_CONSTANTS.LABEL_OVERRIDES[name] ??
  name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const pageTitle = (name?: string): string =>
  name === undefined || name.length === 0
    ? SEO_CONSTANTS.SITE_NAME
    : `${commandLabel(name)} | ${SEO_CONSTANTS.SITE_NAME}`;

export const pageDescription = (name?: string): string => {
  if (name === undefined || name.length === 0) {
    return SEO_CONSTANTS.DESCRIPTION;
  }

  const desc = findCommand(name)?.desc;
  return desc === undefined
    ? SEO_CONSTANTS.DESCRIPTION
    : `${commandLabel(name)} — ${desc}. ${SEO_CONSTANTS.DESCRIPTION_SUFFIX}`;
};
