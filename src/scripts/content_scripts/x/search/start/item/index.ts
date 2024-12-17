import { Item, Media } from "@content/typing";
import { createImageMedia } from "../media/image";
import { createVideoMedia } from "../media/video";

export async function createItems<T extends HTMLElement>(
  element: T
): Promise<Item[]> {
  const result: Item[] = [];

  let source = "";
  let preview: Media | null = null;
  let media: Media | null = null;

  const anchors = element.getElementsByTagName("a");

  for await (const a of anchors) {
    // image
    if (a.href.match(/\/status\/[^/]+\/photo\/[^/]/)) {
      source = a.href;
      media = await createImageMedia(a, "best");
      preview = await createImageMedia(a, "660p");

      if (source && media && preview) {
        result.push({ source, media, preview, download: true });
      }
      // video
    }
    if (a.href.match(/\/status\//) && !a.href.match(/analytics|photo/)) {
      media = await createVideoMedia(element, a.href);
      if (media) {
        source = a.href;
        preview = media;
        result.push({ source, media, preview, download: true });
      }
    }
  }

  return result;
}
