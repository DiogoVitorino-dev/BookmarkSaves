import { MediaQuality } from "@scripts/typing";
import { receivingData } from "./receivingData";

import { WebSocketClient } from "@background/websocket/client/typing";
import { HelperVideoDownloadParams } from "@background/helper/validation";

export interface VideoInformation {
  title: string;
  url: string;
  type: string;
  width: number;
  height: number;
}

export interface EncodedVideo extends VideoInformation {
  encodedData: BlobFile;
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
  { sendRequest, onMessage, disconnect, connection }: WebSocketClient.Socket,
  { cookie, items }: HelperVideoDownloadParams
): Promise<EncodedVideo[]> {
  if (!Array.isArray(items)) items = [items];

  connection.binaryType = "arraybuffer";

  const videos = items.map((item) => ({
    ...item,
    quality: qualities[item.quality || "best"],
  }));

  sendRequest({ action: "download", payload: { items: videos, cookie } });

  const result: EncodedVideo[] = [];

  try {
    result.push(...(await receivingData(items, onMessage)));
  } catch (error) {
    console.error("Erro ao processar mensagem:", error);
    disconnect();
  }

  return result;
}
