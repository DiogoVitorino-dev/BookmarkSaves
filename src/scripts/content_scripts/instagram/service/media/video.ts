import { ValidatedVideo } from "../validation";
import { MediaType } from "@content/common";
import { Media } from "@content/typing";
import { ContentUtils } from "@content/utils";
import { MediaQualityOptions } from "@scripts/typing";

export function getInstagramVideo(
  videos: ValidatedVideo,
  quality?: MediaQualityOptions
): Media | null {
  if (!videos || videos.length <= 0) return null;  
  const { getByQuality } = ContentUtils.media;

  const result = getByQuality(quality, ...videos);

  return { ...result, type: MediaType.Video };
}
