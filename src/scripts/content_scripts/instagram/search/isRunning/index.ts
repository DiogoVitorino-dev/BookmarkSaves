import { ContentUtils } from "@content/utils";
import { InstagramSearchActions } from "..";

export const IsRunning = () =>
  ContentUtils.search.isRunning(InstagramSearchActions.start);
