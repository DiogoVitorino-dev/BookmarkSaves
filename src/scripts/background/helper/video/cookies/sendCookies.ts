import { BrowserAPI } from "@api/browser";
import { HelperVideoSetCookiesParams } from "@background/helper/validation";
import { WebSocketClient } from "@background/websocket/client/typing";

export async function sendCookies(
  { sendRequest }: WebSocketClient.Socket,
  { url, options }: HelperVideoSetCookiesParams
) {
  const { getAllCookies, disconnect } = BrowserAPI();

  const cookies = await getAllCookies({
    url: new URL(url).origin,
    ...options,
  });

  disconnect();

  sendRequest({
    action: "cookies/set",
    payload: { url, cookies },
  });
}
