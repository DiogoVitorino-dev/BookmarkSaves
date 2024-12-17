import { getMedia } from "../media";
import { InstagramApiResponse } from "../response";
import {
  ResponseValidation,
  ValidatedCarousel,
  ValidatedImage,
} from "../validation";
import { createItem } from "../item";
import { Gallery, Media } from "@content/typing";

async function getPreview(
  images: ValidatedImage | ValidatedCarousel
): Promise<Media | null> {
  let preview: Media | null = null;
  const { image } = getMedia;

  if (!images) return null;

  if ("candidates" in images) {
    preview = await image(images, "240p");
    if (preview) return preview;
    
  } else {
    for await (const item of images.entries()) {
      preview = await image(item[1].image_versions2, "240p");

      if (preview) break;
    }

    if (preview) return preview;
  }

  console.log("failed to retrieve gallery preview", images);
  return null;
}

interface CreateGalleryProps
  extends Pick<
    InstagramApiResponse.Item,
    "carousel_media" | "image_versions2" | "video_versions"
  > {
  source: string;
}

export async function createGallery({
  carousel_media,
  image_versions2,
  video_versions,
  source,
}: CreateGalleryProps): Promise<Gallery | null> {
  const { fromCarousel, fromPost } = createItem;
  let preview: Media | null = null;

  const carousel = await ResponseValidation.carousel.validate(carousel_media);

  if (carousel) {
    preview = await getPreview(carousel);
    const items = await fromCarousel({ source, carousel });
    if (items.length !== 0 && preview) return { items, preview, source };
  }

  const images = await ResponseValidation.image.validate(image_versions2);
  const videos = await ResponseValidation.video.validate(video_versions);

  preview = await getPreview(images);
  const item = await fromPost({ images, videos, source });
  
  if (item && preview) return { items: [item], preview, source };

  return null;
}
