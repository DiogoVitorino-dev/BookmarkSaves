import { XPost } from "@content/x/typing";
import { createItems } from "../item";
import { Gallery, Item, Media } from "@content/typing";
import { createImageMedia } from "../media/image";
import { XUtils } from "@content/x/utils";
import { MediaType } from "@content/common";
import { getVideoPoster } from "../media/video";

export async function createGallery(post: XPost): Promise<Gallery | null> {
  const source = XUtils.post.findURL(post);
  const items = await createItems(post);
  const preview = await getPreview(post, items);

  if (!items.length || !preview || !source) return null;

  return {
    items,
    preview,
    source,
  };
}

async function getPreview(post: XPost, items: Item[]): Promise<Media | null> {
  let media: Media | null = null;

  if (items.length) {
    if (items[0].media.type === MediaType.Video) {
      media = await getVideoPoster(post, "worst");
    } else {
      media = await createImageMedia(post, "worst");
    }
  }

  return media;
}
