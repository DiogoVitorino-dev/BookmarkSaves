import { Bookmark } from "@content/typing";
import { TimeUtils } from "@utils/time";

export const onResult = async (fromAction: string) => {
  let result: Bookmark | null = null;

  TimeUtils.retry(
    () => {
      result = window.__content.searchResult;
      return !window.__content.searching.has(fromAction);
    },
    -1,
    300
  );

  return result;
};
