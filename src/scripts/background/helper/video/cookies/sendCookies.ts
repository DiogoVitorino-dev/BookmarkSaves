import { CookiesAPI } from "@api/cookies";
import { HelperVideoSetCookiesParams } from "@background/helper/validation";
import { WebSocketClient } from "@background/websocket/client/typing";

export async function sendCookies(
  { sendRequest }: WebSocketClient.Socket,
  { url, options }: HelperVideoSetCookiesParams
) {
  const { getAll, disconnect } = CookiesAPI();

  const cookies = await getAll({
    url: new URL(url).origin,
    ...options,
  });

  disconnect();

  sendRequest({
    action: "cookies/set",
    payload: { url, cookies },
  });
}
