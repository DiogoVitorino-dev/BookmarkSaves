import { Media } from "@content/typing";
import { XPost } from "@content/x/typing";
import { getImage } from "../media/image";
import { getVideo } from "../media/video";

export async function fetchMedia(element: XPost): Promise<Media[]> {
  let media: Media | null = null;
  const result: Media[] = [];

  const anchors = element.getElementsByTagName("a");

  for await (const a of anchors) {
    // image
    if (a.href.match(/\/status\/[^/]+\/photo\/[^/]/)) {
      media = await getImage(a, a.href);

      if (media) result.push(media);
    }

    // video
    if (a.href.match(/\/status\//) && !a.href.match(/analytics|photo/)) {
      result.push(...(await getVideo(element, a.href)));
    }
  }

  return result;
}
