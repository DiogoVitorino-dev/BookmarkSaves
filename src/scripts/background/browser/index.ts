import { ValidationError } from "yup";
import { MiddlewareErrors } from "@scripts/validation";
import { MessageAPI } from "@api/message";
import { Message } from "@api/message/typing";
import { BrowserCookies, BrowserCookiesActions } from "./cookies";
import { BrowserValidation } from "./validation";
import { BrowserTabs, BrowserTabsActions } from "./tabs";

export async function BrowserMiddleware(
  message: Partial<Message.Request>,
  port: Port
) {
  const { sendResponse } = MessageAPI;

  try {
    const { action, payload } = message;

    switch (action) {
      case BrowserCookiesActions.getAll:
        sendResponse(port, {
          action,
          result: await BrowserCookies.getAll(
            await BrowserValidation.getAllCookies.validate(payload)
          ),
        });
        break;

      case BrowserTabsActions.findCurrentTab:
        sendResponse(port, {
          action,
          result: await BrowserTabs.findCurrentTab(),
        });
        break;

      default:
        sendResponse(port, {
          action: action || "",
          result: MiddlewareErrors.actionDoesNotExist,
        });
        break;
    }
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      sendResponse(port, {
        action: message.action || "",
        result: error.errors,
      });
    }
  }
}
