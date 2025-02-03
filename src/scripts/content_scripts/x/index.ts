import { ValidationError } from "yup";
import { MessageAPI } from "@api/message";
import { Message } from "@api/message/typing";
import { XSearchActions, XSearch } from "./search";
import { XValidation } from "./validation";

window.__content__ = { searching: false, videos: [] };

async function XMiddleware(
  { action, payload }: Partial<Message.Request>,
  port: Port
) {
  try {
    const { sendResponse } = MessageAPI;

    switch (action) {
      case XSearchActions.start:
        sendResponse(port, {
          action,
          result: await XSearch.start(
            await XValidation.startSearch.validate(payload)
          ),
        });
        break;
    }
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      MessageAPI.sendResponse(port, {
        action: action || "",
        result: error.errors,
      });
      console.log(error.errors);
    }
  }
}

const handleConnect = (port: Port) => {
  if (port.name === "x") {
    port.onMessage.addListener((message) => XMiddleware(message, port));
  }
};

browser.runtime.onConnect.addListener(handleConnect);
