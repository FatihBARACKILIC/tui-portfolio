import { APP_CONSTANTS } from "../constants/app.constants";

export const pageTitle = (title?: string) => {
  if (title === undefined || title.length === 0) {
    return APP_CONSTANTS.APP_NAME;
  }
  return `${title} | ${APP_CONSTANTS.APP_NAME}`;
};
