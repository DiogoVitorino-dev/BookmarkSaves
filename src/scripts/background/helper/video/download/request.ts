import { MediaQuality } from "@scripts/typing";
import { receivingData } from "./receivingData";

import { WebSocketClient } from "@background/websocket/client/typing";
import { HelperVideoDownloadParams } from "@background/helper/validation";

export interface VideoInformation {
  title: string;
  format: string;
  url: string;
  width: number;
  height: number;
}

export interface EncodedVideo extends VideoInformation {
  encodedData: DataUrlFile;
}

const qualities: MediaQuality<string> = {
  best: "bestvideo+bestaudio",
  "4320p": "best[height<=4320]+bestaudio",
  "2160p": "best[height<=2160]+bestaudio",
  "1440p": "best[height<=1440]+bestaudio",
  "1080p": "best[height<=1080]+bestaudio",
  "720p": "best[height<=720]+bestaudio",
  "480p": "best[height<=480]+bestaudio",
  "360p": "best[height<=360]+bestaudio",
  "240p": "best[height<=240]+bestaudio",
  worst: "worstvideo+worstaudio",
};

export async function request(
  { sendRequest, onMessage, disconnect }: WebSocketClient.Socket,
  { url, quality, title, cookies }: HelperVideoDownloadParams
): Promise<EncodedVideo | null> {
  sendRequest({
    action: "download",
    payload: { url, title, quality: qualities[quality || "best"], cookies },
  });

  try {
    const video = await receivingData(onMessage);
    return video;
  } catch (error) {
    console.error("Erro ao processar mensagem:", error);
    disconnect({ done: true });
  }
  return null;
}
