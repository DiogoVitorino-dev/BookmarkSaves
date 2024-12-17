import { ContentUtils } from "@content/utils";
import { InstagramSearchActions } from "..";

export const waitForResult = () =>
  ContentUtils.search.onResult(InstagramSearchActions.waitForResult);
