import { HelperUtils } from "@background/helper/utils";
import { HelperVideoDownloadParams } from "@background/helper/validation";
import { WebSocketClient } from "@background/websocket/client/typing";
import { request } from "./request";

export async function download(
  socket: WebSocketClient.Socket,
  params: HelperVideoDownloadParams
) {
  HelperUtils.disconnectOnError(socket);

  return request(socket, params);
}
