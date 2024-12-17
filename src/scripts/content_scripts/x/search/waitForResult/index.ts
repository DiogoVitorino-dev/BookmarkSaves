import { ContentUtils } from "@content/utils";
import { XSearchActions } from "..";

export const waitForResult = () =>
  ContentUtils.search.onResult(XSearchActions.waitForResult);
