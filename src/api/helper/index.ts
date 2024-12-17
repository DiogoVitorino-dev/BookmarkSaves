import { HelperApiContexts, HelperApiProtocols } from "./typing";
import { MessageAPI } from "@api/message";
import { WebSocketServer } from "@background/websocket/server/typing";
import { VideoHelperAPI } from "./video";
import { HelperServerActions } from "@background/helper/middleware";

export const HelperAPI = (protocols: HelperApiProtocols) =>
  new Promise<HelperApiContexts[typeof protocols]>((resolve, reject) => {
    const { connect, sendRequest } = MessageAPI;

    const connection = connect({
      to: "background",
      name: `helper/${protocols}`,
    });

    connection.onMessage.addListener(waitForServer);

    function contexts(): HelperApiContexts[typeof protocols] {
      switch (protocols) {
        case "video":
          return { ...VideoHelperAPI(connection), disconnect };
      }
    }

    function disconnect() {
      sendRequest(connection, { action: HelperServerActions.close });
      MessageAPI.disconnect(connection);
    }

    function waitForServer(server?: Partial<WebSocketServer.Feedback>) {
      connection.onMessage.removeListener(waitForServer);

      if (server?.status === "online") resolve(contexts());
      else reject(server?.info);
    }

    return {
      disconnect,
    };
  });
