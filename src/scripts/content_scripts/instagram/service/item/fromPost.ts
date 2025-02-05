import { getMedia } from "../media";
import { ValidatedImage, ValidatedVideo } from "../validation";

export interface FromPostProps extends Pick<Item, "source"> {
  images: ValidatedImage;
  videos?: ValidatedVideo;
}

export async function fromPost({
  images,
  videos,
  source,
}: FromPostProps): Promise<Item | null> {
  let media: Media | null = null;
  let preview: Media | null = null;
  const { image, video } = getMedia;

  if (videos) {
    preview = video(videos, "480p");
    media = video(videos);
  }

  if (!media) {
    // Failed to find video
    preview = await image(images, "480p");
    media = await image(images);
  }

  if (!media) {
    // Failed to find image
    console.log("Failed to retrieve data from", source);
    return null;
  }

  if (!preview) {
    // Failed to find preview
    if (media.type !== MediaType.Image) {
      preview = await image(images, "480p");

      if (!preview) {
        console.log("Failed to retrieve preview from", source);
        return null;
      }
    } else {
      preview = media;
    }
  }

  return { media, preview, source, download: true };
}
