import { onResponse } from "./onResponse";
import { Message } from "./typing";

export function sendRequest<Payload = _, Response = undefined>(
  port: Port,
  message: Message.Request<Payload>
) {
  port.postMessage(message);

  return onResponse<Response>(port, message.action);
}
