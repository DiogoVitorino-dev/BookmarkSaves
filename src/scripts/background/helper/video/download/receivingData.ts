import { WebSocketClient } from "@background/websocket/client/typing";
import { EncodedVideo, VideoInformation } from "./request";
import { HelperVideoDownload } from "@background/helper/validation";

type ResponseStatus =
  | "starting"
  | "downloaded"
  | "transmitting"
  | "completed"
  | "finalized"
  | "error";

type Response<Status extends ResponseStatus, Payload> = {
  status: Status;
  response: Payload;
};

interface DownloadedResponse {
  playlist: {
    index: number;
    total: number;
  };
  metadata: VideoInformation;
}

type AllResponse =
  | Response<"starting", string>
  | Response<"transmitting", string>
  | Response<"completed", string>
  | Response<"error", string>
  | Response<"finalized", string>
  | Response<"downloaded", DownloadedResponse>;

export const receivingData = (
  requestedVideos: HelperVideoDownload[],
  onMessage: WebSocketClient.onMessage
) =>
  new Promise<Map<string, EncodedVideo[]>>((resolve) => {
    let current = "";
    let info: VideoInformation | null = null;
    let chunks: Uint8Array[] = [];

    let video: EncodedVideo;
    let videosReceived: EncodedVideo[] = [];
    const result: Map<string, EncodedVideo[]> = new Map();

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
              info = message.response.metadata;
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
                
                videosReceived.push(video);
              }

              chunks = [];
              info = null;
              break;
              
              case "finalized":
              if (videosReceived.length) {
                result.set(message.response, videosReceived);
              }
              isAllCompleted(message.response);
              
              current = "";
              videosReceived = [];
              break;

            case "error":
              throw message.response;
          }
        }
      } catch (error) {
        console.error(error);
        failed(current, info, chunks);
      }
    }

    function isAllCompleted(url: string) {
      requestedVideos = requestedVideos.filter((item) => item.url !== url);

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
