import { ConversionUtils } from "@utils/conversion";

enum ImageQuality {
  "best" = "4096x4096",
  "2048p" = "large",
  "1200p" = "medium",
  "900p" = "900x900",
  "660p" = "small",
  "worst" = "360x360",
}

export async function getImage<T extends Element | string>(
  source: T
): Promise<Media<BlobFile> | null> {
  // from url
  if (typeof source === "string") return fetchImage(source);

  // from element
  const imgs = source.getElementsByTagName("img");

  for await (const img of imgs) {
    if (img.src.match(/\/pbs.twimg.com\/media\//)) {
      return fetchImage(img.src);
    }
  }

  return null
}

async function fetchImage(src: string): Promise<Media<BlobFile> | null> {
  src = applyingQuality(src, ImageQuality.best);

  const file = await ConversionUtils.toBlobFile.fromUrl(src);

  if (file) {
    const { width, height } = await getImageMeta(src);
    return {
      type: "image",
      width,
      height,
      file,
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
