export const send = <T extends Primitive | object | Blob>(
  port: Port,
  message: T
) => port.postMessage(message);
