import { ValidationError } from "yup";
import { MiddlewareErrors } from "@scripts/validation";
import { MessageAPI } from "@api/message";
import { Message } from "@api/message/typing";
import { CookiesGetter, CookiesGetterActions } from "./get";
import { CookiesValidation } from "./validation";

export async function CookiesMiddleware(
  message: Partial<Message.Request>,
  port: Port
) {
  const { sendResponse } = MessageAPI;

  try {
    const { action, payload } = message;

    switch (action) {
      case CookiesGetterActions.getAll:
        sendResponse(port, {
          action,
          result: await CookiesGetter.getAll(
            await  CookiesValidation.getAll.validate(payload)
          ),
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
