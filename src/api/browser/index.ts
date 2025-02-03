import { MessageAPI } from "@api/message";
import { BrowserCookiesActions } from "@background/browser/cookies";
import { BrowserTabsActions } from "@background/browser/tabs";
import { BrowserGetAllCookiesParams } from "@background/browser/validation";

export const BrowserAPI = () => {
  const { connect, sendRequest } = MessageAPI;

  const connection = connect({ to: "background", name: "browser" });

  async function getAllCookies(params: BrowserGetAllCookiesParams) {
    const { result } = await sendRequest<BrowserGetAllCookiesParams, Cookies>(
      connection,
      {
        action: BrowserCookiesActions.getAll,
        payload: params,
      }
    );

    return result;
  }

  async function findCurrentTab() {
    const { result } = await sendRequest<_, Tab | null>(connection, {
      action: BrowserTabsActions.findCurrentTab,
    });

    return result;
  }

  function disconnect() {
    MessageAPI.disconnect(connection);
  }

  return {
    getAllCookies,
    findCurrentTab,
    disconnect,
  };
};
