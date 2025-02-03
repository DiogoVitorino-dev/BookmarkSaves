import { MessageAPI } from "@api/message";
import {
  HelperVideoDownloadParams,
  HelperVideoSetCookiesParams,
} from "@background/helper/validation";
import { VideoHelperActions } from "@background/helper/video";
import { EncodedVideo } from "@background/helper/video/download/request";

export function VideoHelperAPI(port: Port) {
  const { sendRequest } = MessageAPI;

  async function downloadVideo(params: HelperVideoDownloadParams) {
    const request = await sendRequest<
      HelperVideoDownloadParams,
      EncodedVideo[]
    >(port, {
      action: VideoHelperActions.download,
      payload: params,
    });

    return request.result;
  }

  async function setCookies(params: HelperVideoSetCookiesParams) {
    return sendRequest<HelperVideoSetCookiesParams>(port, {
      action: VideoHelperActions.setCookies,
      payload: params,
    });
  }

  return { downloadVideo, setCookies };
}
