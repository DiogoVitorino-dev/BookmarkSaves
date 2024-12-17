import { ValidationError } from "yup";
import { MiddlewareErrors } from "@scripts/validation";
import { MessageAPI } from "@api/message";
import { Message } from "@api/message/typing";
import { VideoHelper, VideoHelperActions } from "./video";
import { HelperValidation } from "./validation";
import { WebSocketClient } from "@background/websocket/client/typing";

export enum HelperServerActions {
  close = "helper/server/close",
}

export async function HelperMiddleware(
  message: Partial<Message.Request>,
  port: Port,
  socket: WebSocketClient.Socket
) {
  const { sendResponse } = MessageAPI;

  try {
    const { action, payload } = message;

    switch (action) {
      case VideoHelperActions.download:
        sendResponse(port, {
          action,
          result: await VideoHelper.download(
            socket,
            await HelperValidation.videoDownload.validate(payload)
          ),
        });
        break;

      case VideoHelperActions.setCookies:
        sendResponse(port, {
          action,
          result: await VideoHelper.setCookies(
            socket,
            await HelperValidation.setVideoCookies.validate(payload)
          ),
        });
        break;

      case HelperServerActions.close:
        socket.disconnect({ done: true });
        sendResponse(port, { action, result: true });
        break;

      default:
        sendResponse(port, {
          action: action || "",
          result: MiddlewareErrors.actionDoesNotExist,
        });
        socket.disconnect({ done: true });
        break;
    }
  } catch (error) {
    console.log(error);
    socket.disconnect({ done: true });

    if (error instanceof ValidationError) {
      sendResponse(port, {
        action: message.action || "",
        result: error.errors,
      });
    }
  }
}
