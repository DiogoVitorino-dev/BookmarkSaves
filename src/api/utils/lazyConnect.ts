import { MessageAPI } from "@api/message";
import { BrowserTabsActions } from "@background/browser/tabs";

export async function lazyConnect<T extends Port | object>(
  contentName: string,
  connection: T
) {
  const tab = await getTab();

  if ("name" in connection) return true; // already connected

  if (tab) {
    Object.assign(
      connection,
      MessageAPI.connect({ to: "content", name: contentName, tabId: tab.id })
    );

    return true; // connected
  }

  console.log("Can't connect to content script", contentName);

  return false;
}

async function getTab() {
  const { connect, sendRequest, disconnect } = MessageAPI;

  const port = connect({ to: "background", name: "browser" });

  const tab = await sendRequest<_, Tab | null>(port, {
    action: BrowserTabsActions.findCurrentTab,
  }).then(({ result }) => result);

  disconnect(port);

  return tab;
}
