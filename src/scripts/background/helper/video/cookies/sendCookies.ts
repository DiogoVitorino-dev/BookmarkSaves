import { BrowserCookies } from "@background/browser/cookies";
import { HelperVideoSetCookiesParams } from "@background/helper/validation";
import { WebSocketClient } from "@background/websocket/client/typing";

export async function sendCookies(
  { sendRequest }: WebSocketClient.Socket,
  { url, options }: HelperVideoSetCookiesParams
) {
  const cookie = await BrowserCookies.getAll({
    url: new URL(url).origin,
    ...options,
  });

  sendRequest({ action: "cookies/set", payload: cookie });
}
