import { WebSocketApp } from "@background/websocket";
import Configuration from "@constants/Configuration";
import { HelperMiddleware } from "./middleware";
import { WebSocketServer } from "@background/websocket/server/typing";
import { MessageAPI } from "@api/message";

export async function PrepareHelper(port: Port) {
  const protocol = port.name.split("/")[1];
  const { name, server } = Configuration.NativeMessage.helper;
  const { send } = MessageAPI;

  try {
    if (await WebSocketApp.server.start(name)) {
      const socket = await WebSocketApp.client(server, protocol);

      port.onMessage.addListener((message) =>
        HelperMiddleware(message, port, socket)
      );

      send<WebSocketServer.Feedback>(port, { status: "online" });
    } else {
      send<WebSocketServer.Feedback>(port, {
        status: "error",
        info: "Error on start server",
      });

      port.disconnect();
    }
  } catch (error) {
    send<WebSocketServer.Feedback>(port, {
      status: "error",
      info: `PrepareHelper - ${error}`,
    });

    port.disconnect();
  }
}
