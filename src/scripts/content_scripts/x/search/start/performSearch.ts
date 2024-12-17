import { ContentUtils } from "@content/utils";
import { XUtils } from "@content/x/utils";
import { XPost } from "@content/x/typing";
import { XSearchActions } from "..";

export async function performSearch(breaking: string = "") {  
  const { scroll } = ContentUtils.action;
  const posts: Map<string, XPost> = new Map();

  let key = "";
  let current: XPost[] = [];
  let found = false;

  while (true) {
    if (!window.__content.searching.has(XSearchActions.start))
      throw new Error("Search canceled");

    current = XUtils.bookmark.getPosts()

    found = current.some((item) => {
      key = XUtils.post.findURL(item);

      if (key) {
        posts.set(key, item);
      }

      return breaking.includes(key)
    });

    if (found) break;

    const scrolling = await scroll({ deltaY: 500, wait: 500 });

    if (scrolling) break;
  }

  return posts;
}
