import { connect } from "./connect";
import { sendRequest } from "./sendRequest";
import { disconnect } from "./disconnect";
import { sendResponse } from "./sendResponse";
import { onResponse } from "./onResponse";
import { send } from "./send";

export const MessageAPI = {
  connect,
  sendRequest,
  send,
  sendResponse,
  onResponse,
  disconnect,
};
