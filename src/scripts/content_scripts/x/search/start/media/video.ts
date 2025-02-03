import { MediaType } from "@content/common";
import { Media } from "@content/typing";
import { MediaRepository } from "@repository/media";
import { ConversionUtils } from "@utils/conversion";

const matchBySrc = /\/tweet_video\//;
const matchByPoster = /\/ext_tw_video_thumb\/|\/amplify_video_thumb\//;

export async function getVideo<T extends HTMLElement>(
  element: T,
  source: string
) {
  let media: Media | null = null;
  const result: Media[] = [];
  const { toBlobFile } = ConversionUtils;
  const { getSavedMedia, saveMedia } = MediaRepository();

  const videos = element.getElementsByTagName("video");

  for await (const video of videos) {
    if (video.src.match(matchBySrc)) {
      media = await getSavedMedia(video.src);

      if (!media) {
        media = {
          width: video.width,
          height: video.height,
          url: source,
          type: MediaType.Video,
          file: await toBlobFile.fromUrl(video.src),
        };

        await saveMedia(video.src, media);
      }

      result.push(media);
    } else if (video.poster.match(matchByPoster)) {
      window.__content__.videos.push(source)
      console.log(source);
    }
  }

  return result;
}
