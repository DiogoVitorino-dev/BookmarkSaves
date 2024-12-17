import Strings from "@constants/Strings";
import { Bookmark } from "@content/typing";
import { performSearch } from "./performSearch";
import { XSearchActions } from "..";
import { XStartSearchParams } from "@content/x/validation";
import { XRepository } from "@repository/x";
import { fetchGalleries } from "./fetchGalleries";

export async function start(
  breakpoint: XStartSearchParams = ""
): Promise<Bookmark | null> {
  let bookmark: Bookmark | null = null;
  try {
    window.__content.searching.add(XSearchActions.start);

    const posts = await performSearch(breakpoint);    

    const gallery = await fetchGalleries(posts);

    if (gallery.length > 0) {
      bookmark = {
        domain: window.location.hostname,
        name: Strings.bookmarkDefault_.replace("_", "Twitter"),
        preview: gallery[0].preview,
        gallery,
        source: window.location.href,
      };

      await XRepository().saveBookmark(bookmark);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("XSearch", error.message);
    }
  } finally {
    window.__content.searching.delete(XSearchActions.start);
    window.__content.searchResult = bookmark;
  }

  return bookmark;
}
