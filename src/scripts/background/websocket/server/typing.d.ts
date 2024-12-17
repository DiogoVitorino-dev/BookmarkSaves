export namespace WebSocketServer {
  export type StatusCode = "online" | "offline" | "starting" | "error";

  export interface Feedback {
    status?: Status;
    info?: string ;
  }
}
