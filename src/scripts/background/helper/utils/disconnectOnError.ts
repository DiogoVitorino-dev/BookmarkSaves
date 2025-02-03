import { WebSocketClient } from "@background/websocket/client/typing";

export function disconnectOnError(socket: WebSocketClient.Socket) {
  const disconnecting: Exclude<WebSocket["onerror"], null> = (e) => {
    console.log("Error WS", e);
    socket.disconnect();
    socket.connection.removeEventListener("error", disconnecting);
  };
  
  socket.connection.addEventListener("error", disconnecting);
}
