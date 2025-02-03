import { WebSocketClient } from "@background/websocket/client/typing";
import { EncodedVideo, VideoInformation } from "./request";
import { HelperVideoDownload } from "@background/helper/validation";

type ResponseStatus = "starting" | "downloaded" | "sending" | "completed";

type Response<Status extends ResponseStatus, Payload> = {
  status: Status;
  response: Payload;
};

type AllResponse =
  | Response<"starting", string>
  | Response<"sending", string>
  | Response<"completed", string>
  | Response<"downloaded", VideoInformation>;

export const receivingData = (
  requestedVideos: HelperVideoDownload[],
  onMessage: WebSocketClient.onMessage
) =>
  new Promise<EncodedVideo[]>((resolve) => {
    let current = "";
    let info: VideoInformation | null = null;
    let chunks: Uint8Array[] = [];

    let video: EncodedVideo;
    const result: EncodedVideo[] = [];

    onMessage(handleResponse);

    function handleResponse(event: MessageEvent) {
      console.log(event.data);
      try {
        if (event.data instanceof ArrayBuffer) {
          chunks.push(new Uint8Array(event.data));
        } else {
          const message: AllResponse = JSON.parse(event.data);

          switch (message.status) {
            case "starting":
              current = message.response;
              break;
            case "downloaded":
              info = message.response;
              break;
            case "completed":
              if (info && chunks.length) {
                video = {
                  ...info,
                  encodedData: {
                    name: info.title,
                    type: info.type,
                    data: new Blob(chunks, { type: info.type }),
                  },
                };
                result.push(video);
                isAllCompleted(video);
              } else {
                failed(current, info, chunks);
              }

              chunks = [];
              info = null;
              current = "";
              break;
          }
        }
      } catch (error) {
        console.error(error);
        failed(current, info, chunks);
      }
    }

    function isAllCompleted(lastReceived: EncodedVideo) {
      requestedVideos = requestedVideos.filter(
        (item) => item.url !== lastReceived.url
      );

      if (requestedVideos.length === 0) resolve(result);
    }

    function failed(
      expectedVideo: string,
      infoReceived?: Partial<VideoInformation> | null,
      chunksReceived?: Uint8Array[]
    ) {
      requestedVideos = requestedVideos.filter(
        (item) => item.url !== expectedVideo
      );

      console.error(
        `Error ao baixar o video: ${expectedVideo} |Received:`,
        infoReceived,
        chunksReceived
      );

      if (requestedVideos.length === 0) resolve(result);
    }
  });
