import { ContentUtils } from "@content/utils";
import { XSearchActions } from "..";

export const IsRunning = () =>
  ContentUtils.search.isRunning(XSearchActions.start);
