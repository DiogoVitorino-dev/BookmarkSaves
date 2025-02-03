export namespace WebSocketClient {
  export type Message =
    | Primitive
    | object
    | Primitive[]
    | object[]
    | Parameters<WebSocket["send"]>[0];

  export type Payload = Primitive | object | Primitive[] | object[];

  export interface Request<P = undefined> {
    action: string;
    payload?: P extends undefined ? Payload : P;
  }

  export type ServerInfo = ConstructorParameters<typeof WebSocket>;

  export interface Socket {
    connection: WebSocket;

    sendRequest: sendRequest;
    send: send;
    reconnect: reconnect;
    disconnect: disconnect;
    ensureConnection: ensureConnection;

    onOpen: onOpen;
    onMessage: onMessage;
    onError: onError;
    onClose: onClose;
  }

  export type sendRequest = (request: Request) => Promise<void>;

  export type send = (message: Message) => Promise<void>;

  export type reconnect = (
    ...newServer: Partial<ServerInfo>
  ) => Promise<WebSocketClient.Socket>;

  export type ensureConnection = () => Promise<void>;

  export interface disconnectInfo {
    code?: number;
    reason?: string;
  }

  export type disconnect = (info?: disconnectInfo) => void;

  export type onOpen = (callback: WebSocket["onopen"]) => void;

  export type onMessage = (callback: WebSocket["onmessage"]) => void;

  export type onError = (callback: WebSocket["onerror"]) => void;

  export type onClose = (callback: WebSocket["onclose"]) => void;
}
