import { ValidationError } from "yup";
import { MessageAPI } from "@api/message";
import { InstagramValidation } from "./validation";
import { InstagramSearch, InstagramSearchActions } from "./search";
import { Message } from "@api/message/typing";

window.__content = { searching: new Set(""), searchResult: null };

async function InstagramMiddleware(
  { action, payload }: Partial<Message.Request>,
  port: Port
) {
  try {
    const { sendResponse } = MessageAPI;

    switch (action) {
      case InstagramSearchActions.start:
        sendResponse(port, {
          action,
          result: await InstagramSearch.start(
            port,
            await InstagramValidation.startSearch.validate(payload)
          ),
        });
        break;

      case InstagramSearchActions.cancel:
        sendResponse(port, {
          action,
          result: InstagramSearch.cancel(),
        });
        break;

      case InstagramSearchActions.isRunning:
        sendResponse(port, {
          action,
          result: InstagramSearch.IsRunning(),
        });
        break;

      case InstagramSearchActions.waitForResult:
        sendResponse(port, {
          action,
          result: await InstagramSearch.waitForResult(),
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
  if (port.name === "instagram") {
    port.onMessage.addListener((message) => InstagramMiddleware(message, port));
  }
};

browser.runtime.onConnect.addListener(handleConnect);
