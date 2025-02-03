import { MediaType } from "@content/common";
import { Media } from "@content/typing";
import { MediaRepository } from "@repository/media";
import { ConversionUtils } from "@utils/conversion";

enum ImageQuality {
  "best" = "4096x4096",
  "2048p" = "large",
  "1200p" = "medium",
  "900p" = "900x900",
  "660p" = "small",
  "worst" = "360x360",
}

export async function getImage<T extends HTMLElement | string>(
  source: T,
  url: string
): Promise<Media | null> {
  let media: Media | null = null;

  // from url
  if (typeof source === "string") return fetchImage(source, url);

  // from element
  const imgs = source.getElementsByTagName("img");

  for await (const img of imgs) {
    if (img.src.match(/\/pbs.twimg.com\/media\//)) {
      media = await fetchImage(img.src, url);
      break;
    }
  }

  return media;
}

async function fetchImage(src: string, url: string): Promise<Media | null> {
  const { getSavedMedia, saveMedia } = MediaRepository();
  let media: Media | null = null;

  src = applyingQuality(src, ImageQuality.best);

  media = await getSavedMedia(src);
  if (media) return media;

  const file = await ConversionUtils.toBlobFile.fromUrl(src);

  if (file) {
    const { width, height } = await getImageMeta(src);
    media = {
      type: MediaType.Image,
      width,
      height,
      url,
      file,
    };
    
    await saveMedia(src, media);
  }

  return media;
}

function getImageMeta(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (reason) => reject(reason);
    img.src = src;
  });
}

function applyingQuality(url: string, quality: ImageQuality) {
  const [currentUrl, currentParams] = url.split("?");

  const params = new URLSearchParams(currentParams || "");
  params.set("format", "jpg");
  params.set("name", quality);

  return `${currentUrl}?${params.toString()}`;
}
