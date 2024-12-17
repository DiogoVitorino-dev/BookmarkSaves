import { WebSocketClient } from "@background/websocket/client/typing";
import { EncodedVideo, VideoInformation } from "./request";
import { ConversionUtils } from "@utils/conversion";

type DownloadStarted = { download: "started" };

interface DownloadSending extends VideoInformation {
  download: "sending";
}

interface DownloadVideoChunks {
  index: number;
  chunk: string;
}

type DownloadCompleted = { download: "done" };

type ReceiveMessages =
  | DownloadStarted
  | DownloadSending
  | DownloadVideoChunks
  | DownloadCompleted;

export const receivingData = (onMessage: WebSocketClient.onMessage) =>
  new Promise<EncodedVideo>((resolve, reject) => {
    const data: Uint8Array[] = [];
    let info: VideoInformation;

    onMessage((event) => {
      const message: ReceiveMessages = JSON.parse(event.data);

      if ("download" in message === false) {
        data[message.index] = Uint8Array.from(atob(message.chunk), (c) =>
          c.charCodeAt(0)
        );
      } else {
        switch (message.download) {
          case "started":
            console.log("Requesting video");
            break;

          case "sending":
            info = {
              width: message.width,
              height: message.height,
              format: message.format || "mp4",
              title: message.title,
              url: message.url,
            };
            break;

          case "done": {
            console.log("Video received!");
            const blob = new Blob(data, { type: `video/${info.format}` });

            ConversionUtils.toDataUrlFile
              .fromBlob(blob, info.title)
              .then((encodedData) => resolve({ ...info, encodedData }))
              .catch((reason) => reject(reason));
            break;
          }
        }
      }
    });
  });
