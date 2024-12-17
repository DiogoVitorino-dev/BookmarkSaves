import { MessageAPI } from "@api/message";

export async function lazyConnect<T extends Port | object>(
  contentName: string,
  connection: T
) {
  const { findCurrentTab, connect } = MessageAPI;

  if ("name" in connection) return true; // already connected

  const tab = await findCurrentTab();

  if (tab) {
    Object.assign(
      connection,
      connect({ to: "content", name: contentName, tabId: tab.id })
    );

    return true; // connected
  }

  console.log("Can't connect to content script", tab);

  return false;
}
