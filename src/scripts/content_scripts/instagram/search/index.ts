import { cancel } from "./cancel";
import { IsRunning } from "./isRunning";
import { start } from "./start";
import { waitForResult } from "./waitForResult";

export enum InstagramSearchActions {
  start = "instagram/search/start",
  cancel = "instagram/search/cancel",
  isRunning = "instagram/search/isRunning",
  waitForResult = "instagram/search/waitForResult",
}

export const InstagramSearch = {
  start,
  cancel,
  IsRunning,
  waitForResult,
};
