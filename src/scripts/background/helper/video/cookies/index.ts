import { WebSocketClient } from "@background/websocket/client/typing";
import { sendCookies } from "./sendCookies";
import { HelperUtils } from "@background/helper/utils";
import { HelperVideoSetCookiesParams } from "@background/helper/validation";

export async function setCookies(
  socket: WebSocketClient.Socket,
  params: HelperVideoSetCookiesParams
) {
  HelperUtils.disconnectOnError(socket);

  return sendCookies(socket, params);
}
