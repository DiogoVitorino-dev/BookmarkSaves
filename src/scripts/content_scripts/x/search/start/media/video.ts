import { MediaType } from "@content/common";
import { Media } from "@content/typing";
import { createImageMedia, ImageQualityList } from "./image";

const matchBySrc = /\/tweet_video\//;
const matchByPoster = /\/ext_tw_video_thumb\/|\/amplify_video_thumb\//;

export async function createVideoMedia<T extends HTMLElement>(
  element: T,
  source: string
) {
  let media: Media | null = null;
  const videos = element.getElementsByTagName("video");

  for await (const video of videos) {
    if (video.src.match(matchBySrc)) {
      media = {
        width: video.width,
        height: video.height,
        url: video.src,
        type: MediaType.Video,
      };
      break;
    } else if (video.poster.match(matchByPoster)) {
      console.log(source);      
    }
  }

  return media;
}

export async function getVideoPoster<T extends HTMLElement>(
  element: T,
  quality: ImageQualityList = "worst"
) {
  let media: Media | null = null;
  const videos = element.getElementsByTagName("video");

  for await (const video of videos) {
    if (video.src.match(matchBySrc) || video.poster.match(matchByPoster)) {
      media = await createImageMedia(video.poster, quality);
      break;
    }
  }

  return media;
}
