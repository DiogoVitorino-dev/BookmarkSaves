import { Message } from "./typing";

export function onResponse<Response = undefined>(
  port: Port,
  fromAction: string
) {
  return new Promise<Message.Response<Response>>((resolve) => {
    const listenResponse = (response: Partial<Message.Response<Response>>) => {
      if (response.action && response.action === fromAction) {
        port.onMessage.removeListener(listenResponse);
        resolve(response as Message.Response<Response>);
      }
    };

    port.onMessage.addListener(listenResponse);
  });
}
