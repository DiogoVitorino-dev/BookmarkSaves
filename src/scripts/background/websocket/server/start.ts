import { WebSocketServer } from "./typing";

export const start = (nativeApplication: string) =>
  new Promise<boolean>((resolve, reject) => {
    const port = browser.runtime.connectNative(nativeApplication);

    function checkingStatus({
      status,
      info = "",
    }: WebSocketServer.Feedback) {
      if (status) {
        switch (status) {
          case "online":
            port.disconnect();
            resolve(true);
            break;

          default:
            reject(info);
            break;
        }
      }
    }

    port.onMessage.addListener(checkingStatus);
  });
