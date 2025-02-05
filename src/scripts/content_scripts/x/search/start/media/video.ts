import { HelperApiContexts } from "@api/helper/typing";
import { EncodedVideo } from "@background/helper/video/download/request";
import { ConversionUtils } from "@utils/conversion";

const matchBySrc = /\/tweet_video\//;
const matchByPoster = /\/ext_tw_video_thumb\/|\/amplify_video_thumb\//;

export async function getVideo<T extends HTMLElement>(
  element: T,
  source: string,
  helper: HelperApiContexts["video"]
): Promise<Media<BlobFile>[]> {
  const result: Media<BlobFile>[] = [];
  let downloaded = false;
  const { toBlobFile } = ConversionUtils;

  let encodedVideos: EncodedVideo[] | undefined = [];

  const videos = element.getElementsByTagName("video");

  for await (const video of videos) {
    if (video.src.match(matchBySrc)) {
      const file = await toBlobFile.fromUrl(video.src);
      file.name += `.${file.type}`; // Fix JSZip

      result.push({
        width: video.width,
        height: video.height,
        type: "video",
        file,
      });
    } else if (!downloaded && video.poster.match(matchByPoster)) {
      encodedVideos = (
        await helper.downloadVideo({ items: { url: source } })
      ).get(source);

      if (encodedVideos) {
        result.push(
          ...encodedVideos.map<Media<BlobFile>>((encoded) => ({
            file: encoded.encodedData,
            height: encoded.height,
            width: encoded.width,
            type: "video",
          }))
        );
      }

      downloaded = true;
    }
  }

  return result;
}
