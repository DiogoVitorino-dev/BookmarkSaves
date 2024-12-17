import { InstagramUtils } from "@content/instagram/utils";
import { InstagramPost } from "@content/instagram/typing";
import { InstagramSearchActions } from "..";
import { ContentUtils } from "@content/utils";

export async function performSearch(breaking: string = "") {
  const { scroll } = ContentUtils.action;
  const posts: Map<string, InstagramPost> = new Map();

  let key = "";
  let current: InstagramPost[] = [];
  let found = false;

  while (true) {
    if (!window.__content.searching.has(InstagramSearchActions.start))
      throw new Error("Search canceled");

    current = InstagramUtils.bookmark.getPosts();

    found = current.some((item) => {
      key = InstagramUtils.post.findURL(item);

      if (key) {
        posts.set(key, item);
      }

      return key === breaking;
    });

    if (found) break;

    const scrolling = await scroll({ deltaY: 500, wait: 8000 });

    if (scrolling) break;
  }

  return posts;
}
