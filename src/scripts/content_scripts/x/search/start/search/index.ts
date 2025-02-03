import { ContentUtils } from "@content/utils";
import { XUtils } from "@content/x/utils";
import { fetchMedia } from "./fetchMedia";
import { Media } from "@content/typing";
import { TimeUtils } from "@utils/time";

export async function search(breaking: string = ""): Promise<BlobFile[]> {
  const { scroll } = ContentUtils.action;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  await TimeUtils.sleep(1500);

  const done = new Set<string>();
  let result: BlobFile[] = [];

  let url = "";
  let found = false;
  let media: Media[] = [];

  while (true) {
    if (!window.__content__.searching) throw new Error("Search canceled");

    for await (const item of XUtils.bookmark.getPosts()) {
      url = XUtils.post.findURL(item);
      if (!url || done.has(url)) continue;

      media = await fetchMedia(item);

      if (media) {
        result = result.concat(media.map(({ file }) => file));
        done.add(url);
      }

      found = breaking.includes(url);
      if (found) break;
    }

    if (found) break;

    const scrolling = await scroll({ deltaY: 500, wait: 1000 });

    if (scrolling) break;
  }

  return result;
}
