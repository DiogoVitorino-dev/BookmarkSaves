import { ValidatedImage } from "../validation";


import { ConversionUtils } from "@utils/conversion";
import { ContentUtils } from "@content/utils";
import { MediaQualityOptions } from "@scripts/typing";

export async function getInstagramImage(
  images: ValidatedImage,
  quality?: MediaQualityOptions
): Promise<Media | null> {
  if (!images || images.candidates.length <= 0) return null;
  const { getByQuality } = ContentUtils.media;

  const result = getByQuality(quality, ...images.candidates);

  const dataUrl = await ConversionUtils.toDataUrlFile.fromUrl(result.url);

  if (!dataUrl || !result.url) return null;

  return { ...result, type: MediaType.Image, extra: { dataUrl } };
}
