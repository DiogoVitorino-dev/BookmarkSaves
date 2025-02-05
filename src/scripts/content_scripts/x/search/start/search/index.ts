import { ContentUtils } from "@content/utils";
import { XUtils } from "@content/x/utils";
import { fetchMedia } from "./fetchMedia";
import { TimeUtils } from "@utils/time";
import { HelperAPI } from "@api/helper";
import Configuration from "@constants/Configuration";

export async function search(breaking: string = ""): Promise<BlobFile[]> {
  const { scroll } = ContentUtils.action;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  const helper = await HelperAPI("video");

  await TimeUtils.sleep(1500);

  await helper.setCookies({
    url: Configuration.supportedOrigins.x,
    options: { secure: true },
  });

  const done = new Set<string>();
  let result: BlobFile[] = [];

  let url = "";
  let found = false;
  let collection: Collection | null = null;

  while (true) {
    if (!window.__content__.searching) throw new Error("Search canceled");

    for await (const item of XUtils.bookmark.getPosts()) {
      url = XUtils.post.findURL(item);

      if (!url || done.has(url)) continue;

      collection = await fetchMedia(item, url, helper);

      if (collection) {
        result = result.concat(collection.medias.map(({ file }) => file));

        done.add(url);
      }

      found = breaking.includes(url);
      if (found) break;
    }

    if (found) break;

    const scrolling = await scroll({ deltaY: 500, wait: 1000 });

    if (scrolling) break;
  }
  helper.disconnect();

  return result;
}
