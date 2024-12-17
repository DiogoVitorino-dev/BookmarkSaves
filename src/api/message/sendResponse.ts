import { Message } from "./typing";

export function sendResponse<Result>(
  port: Port,
  message: Message.Response<Result>
) {
  port.postMessage(message);
}
