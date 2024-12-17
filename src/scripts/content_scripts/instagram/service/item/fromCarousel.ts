import { Item } from "@content/typing";

import { fromPost } from "./fromPost";
import { ValidatedCarousel } from "../validation";

export interface FromCarouselProps extends Pick<Item, "source"> {
  carousel: ValidatedCarousel;
}

export async function fromCarousel({
  carousel,
  source,
}: FromCarouselProps): Promise<Item[]> {
  if (!carousel) return [];

  let items: Item[] = [];

  for await (const [
    index,
    { image_versions2, video_versions },
  ] of carousel.entries()) {
    const newItem = await fromPost({
      videos: video_versions,
      images: image_versions2,
      source: `${source}?img_index=${index + 1}`,
    });

    if (newItem) {
      items = [...items, newItem];
    }
  }

  return items;
}
