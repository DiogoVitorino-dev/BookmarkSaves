type NativeBackgroundConnectInfo = Parameters<
  typeof browser.runtime.connect
>[0];

type NativeContentConnectInfo = Exclude<
  Parameters<typeof browser.tabs.connect>[1],
  undefined
>;

export interface BackgroundConnectInfo
  extends Omit<NativeBackgroundConnectInfo, "name"> {
  to: "background";
  name: string;
}

export interface ContentConnectInfo
  extends Omit<NativeContentConnectInfo, "name"> {
  to: "content";
  name: string;
  tabId: number;
}

export type ConnectionInfo = ContentConnectInfo | BackgroundConnectInfo;

export function connect(info: ConnectionInfo): Port {
  if (info.to === "content") {
    const { tabId, name, frameId } = info;
    return browser.tabs.connect(tabId, { name, frameId });
  }
  const { name, includeTlsChannelId } = info;
  return browser.runtime.connect({ name, includeTlsChannelId });
}
