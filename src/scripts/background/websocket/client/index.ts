import { WebSocketClient } from "./typing";

type Client = (
  ...params: WebSocketClient.ServerInfo
) => Promise<WebSocketClient.Socket>;

type ClientConnected = Parameters<
  ConstructorParameters<typeof Promise<WebSocketClient.Socket>>[0]
>[0];

type ClientClosed = Parameters<
  ConstructorParameters<typeof Promise<WebSocketClient.Socket>>[0]
>[1];

export const client: Client = (url, protocols) =>
  new Promise<WebSocketClient.Socket>((resolve, reject) => {
    /**
     * Não deve atribuir números altos evitar o `Stack Overflow` e problemas com `alto uso de memória` (usado como `condição de parada` para uma função `recursiva`).
     */
    let retries = 3;
    let connection: WebSocket;

    connect(resolve, reject, url, protocols);

    const send: WebSocketClient.send = async (message) => {
      await ensureConnection();

      if (
        message instanceof Blob === false ||
        message instanceof ArrayBuffer === false
      ) {
        message = JSON.stringify(message);
      }
      connection.send(message);
    };

    const sendRequest: WebSocketClient.sendRequest = async (message) => {
      await ensureConnection();
      connection.send(JSON.stringify(message));
    };

    const reconnect: WebSocketClient.reconnect = (newUrl, newProtocols) =>
      new Promise<WebSocketClient.Socket>((reconnectResolve, reconnectReject) =>
        connect(
          reconnectResolve,
          reconnectReject,
          newUrl || url,
          newProtocols || protocols
        )
      );

    const ensureConnection: WebSocketClient.ensureConnection = async () => {
      if (connection.readyState !== connection.OPEN) await reconnect();
    };

    const disconnect: WebSocketClient.disconnect = (info) => {
      if (info?.done) connection.close(1000, "done");
      else connection.close(info?.code, info?.reason);
    };

    const onOpen: WebSocketClient.onOpen = (callback) => {
      connection.onopen = callback;
    };

    const onMessage: WebSocketClient.onMessage = (callback) => {
      connection.onmessage = callback;
    };

    const onError: WebSocketClient.onError = (callback) => {
      connection.onerror = callback;
    };

    const onClose: WebSocketClient.onClose = (callback) => {
      connection.onclose = callback;
    };

    /**
     * Tentar estabelecer uma conexão com servidor.
     *
     * @param connected `Promise.resolve` que será chamado ao `WebSocket` estabelece conexão.
     * @param closed `Promise.reject` que será chamado quando `WebSocket` falhar ao fazer tentativas de estabelecer conexão com o servidor.
     * @param server `Url` e `protocols` do servidor
     */
    function connect(
      connected: ClientConnected,
      closed: ClientClosed,
      ...[serverURL, serverProtocols]: WebSocketClient.ServerInfo
    ) {
      // Será chamado ao estabelecer conexão.
      function onOpenCallback() {
        connection.removeEventListener("open", onOpenCallback);
        onConnectSuccess(connected);
      }

      // Será chamado ao falhar a conexão.
      function onCloseCallback(event: CloseEvent) {
        connection.removeEventListener("close", onCloseCallback);
        onConnectionClosed(event, connected, closed);
      }

      // Tenta conexão.
      connection = new WebSocket(serverURL, serverProtocols);
      connection.addEventListener("open", onOpenCallback);
      connection.addEventListener("close", onCloseCallback);
    }

    /**
     * Realiza tentativas de reconectar o `WebSocket` com o servidor.
     *
     * Deve chamar o `reconnect` com `delay`, passando adiante o `Promise.resolve` e `Promise.reject` que foram passados por parâmetros;
     *
     * Deve ser chamada enquanto o `WebSocket` está falhando em estabelecer conexão;
     *
     * Deve rejeitar até o numero de `retries` seja menor ou igual a `0`;
     */
    function onConnectionClosed(
      event: CloseEvent,
      resolved: typeof resolve,
      rejected: typeof reject
    ) {
      // Desconectado com erros
      if (!event.wasClean) {
        if (retries >= 0) {
          retries -= 1;

          // Tentar reconectar com servidor após um delay
          setTimeout(
            () =>
              reconnect()
                .then((success) => resolved(success))
                .catch((failed) => rejected(failed)),
            2000
          );
        } else {
          // Rejeita ao números de retries acabar
          rejected("WebSocket Server Connection Timeout");
        }
      }
    }

    /**
     * Retornar um `Client` quando o `WebSocket` estabelecer conexão.
     *
     * Deve ser chamada quando o `WebSocket` estabelecer conexão.
     */
    function onConnectSuccess(resolved: typeof resolve) {
      // Reinicia o contador de tentativas.
      retries = 3;

      // Envia um Socket para Promise.resolve que foi passada por parâmetro.
      resolved({
        connection,

        send,
        sendRequest,
        reconnect,
        ensureConnection,
        disconnect,

        onOpen,
        onMessage,
        onError,
        onClose,
      });
    }
  });
