export namespace Message {
  type Payload = Primitive | object | Primitive[] | object[];

  export interface Request<P = undefined> {
    action: string;
    payload?: P extends undefined ? Payload : P;
  }

  export interface Response<R = undefined> {
    action: string;
    result: R extends undefined ? Payload : R;
  }
}

export type Tab = Required<Pick<browser.tabs.Tab, "url" | "id">> & browser.tabs.Tab;
