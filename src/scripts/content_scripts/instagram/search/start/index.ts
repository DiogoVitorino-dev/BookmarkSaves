import { InstagramUtils } from "@content/instagram/utils";
import { Bookmark } from "@content/typing";
import { performSearch } from "./performSearch";
import { InstagramSearchActions } from "..";
import { fetchGalleries } from "./fetchGalleries";
import { InstagramStartSearchParams } from "@content/instagram/validation";
import { InstagramRepository } from "@repository/instagram";

export async function start(
  port: Port,
  breakpoint: InstagramStartSearchParams = ""
): Promise<Bookmark | null> {
  let bookmark: Bookmark | null = null;
  try {
    window.__content.searching.add(InstagramSearchActions.start);

    const posts = await performSearch(breakpoint);
    const gallery = await fetchGalleries(posts);

    if (gallery.length > 0) {
      bookmark = {
        domain: window.location.hostname,
        name: InstagramUtils.bookmark.getName(),
        preview: gallery[0].preview,
        gallery,
        source: window.location.href,
      };

      await InstagramRepository().saveBookmark(bookmark.source, bookmark);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("InstagramSearch", error.message);      
    }
  } finally {
    window.__content.searching.delete(InstagramSearchActions.start);
    window.__content.searchResult = bookmark;
  }

  return bookmark;
}
