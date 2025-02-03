import { BrowserAPI } from "@api/browser";
import { HelperAPI } from "@api/helper";
import { HelperVideoDownload } from "@background/helper/validation";
import Configuration from "@constants/Configuration";
import { MediaType } from "@content/common";
import { Media } from "@content/typing";
import { MediaRepository } from "@repository/media";

export async function downloadVideos(): Promise<BlobFile[]> {
  const { videos } = window.__content__;

  const downloaded: BlobFile[] = [];

  if (videos.length) {
    const { getSavedMedia, saveMedia } = MediaRepository();

    const helper = await HelperAPI("video");

    const cookie = await BrowserAPI().getAllCookies({
      url: Configuration.supportedOrigins.x,
      secure: true,
    });

    const items: HelperVideoDownload[] = [];
    let saved: Media<BlobFile> | null = null;

    for await (const url of videos) {
      saved = await getSavedMedia(url);

      if (saved) downloaded.push(saved.file);
      else items.push({ url });
    }

    const result = await helper.downloadVideo({ items, cookie });

    for await (const { encodedData, url, ...props } of result) {
      saved = { ...props, url, type: MediaType.Video, file: encodedData };

      downloaded.push(saved.file);
      await saveMedia(url, saved);
    }

    helper.disconnect()
  }

  return downloaded;
}
