import { cancel } from "./cancel";
import { isSearching } from "./isSearching";
import { waitForResult } from "./waitForResult";

export enum SearchToolsActions {
  isSearching = "tools/search/isSearching",
  waitForResult = "tools/search/waitForResult",
  cancel = "tools/search/cancel",
}

export const SearchTools = {
  waitForResult,
  cancel,
  isSearching,
};
