import { cancel } from "./cancel";
import { IsRunning } from "./isRunning";
import { start } from "./start";
import { waitForResult } from "./waitForResult";

export enum XSearchActions {
  start = "x/search/start",
  cancel = "x/search/cancel",
  isRunning = "x/search/isRunning",
  waitForResult = "x/search/waitForResult",
}

export const XSearch = {
  start,
  cancel,
  IsRunning,
  waitForResult,
};
