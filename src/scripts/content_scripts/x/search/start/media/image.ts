import { MediaType } from "@content/common";
import { Media } from "@content/typing";
import { ConversionUtils } from "@utils/conversion";

export enum ImageQuality {
  "best" = "4096x4096",
  "2048p" = "large",
  "1200p" = "medium",
  "900p" = "900x900",
  "660p" = "small",
  "worst" = "360x360",
}

export type ImageQualityList = keyof typeof ImageQuality;

export async function createImageMedia<T extends HTMLElement | string>(
  source: T,
  quality: ImageQualityList = "best"
): Promise<Media | null> {
  let media: Media | null = null;

  // from url
  if (typeof source === "string")
    return createImage(source, ImageQuality[quality]);

  // from element
  const imgs = source.getElementsByTagName("img");

  for await (const img of imgs) {
    if (img.src.match(/\/pbs.twimg.com\/media\//)) {
      media = await createImage(img.src, ImageQuality[quality]);
      break;
    }
  }

  return media;
}

async function createImage(source: string, quality: ImageQuality) {
  const url = applyingQuality(source, quality);
  const dataUrl = await ConversionUtils.toDataUrlFile.fromUrl(url);

  if (dataUrl) {
    const { width, height } = await getImageMeta(url);
    return {
      type: MediaType.Image,
      width,
      height,
      url,
      extra: { dataUrl },
    };
  }

  return null;
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
