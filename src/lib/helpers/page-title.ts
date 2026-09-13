import { APP_CONSTANTS } from "../constants/app.constants";

export const pageTitle = (title?: string) => {
  return title ? `${title} | ${APP_CONSTANTS.APP_NAME}` : APP_CONSTANTS.APP_NAME;
};