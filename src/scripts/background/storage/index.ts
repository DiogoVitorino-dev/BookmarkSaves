import { ValidationError } from "yup";
import { StorageValidation } from "./validation";
import { MiddlewareErrors } from "@scripts/validation";
import { MessageAPI } from "@api/message";
import { get, StorageGetterActions } from "./get";
import { set, StorageSetterActions } from "./set";
import { remove, StorageRemoveActions } from "./remove";
import { Message } from "@api/message/typing";

export async function StorageMiddleware(
  message: Partial<Message.Request>,
  port: Port
) {
  const { sendResponse } = MessageAPI;

  try {
    const { action, payload } = message;

    switch (action) {
      case StorageGetterActions.local:
      case StorageGetterActions.sync:
      case StorageGetterActions.session:
        sendResponse(port, {
          action,
          result: await get(
            action,
            await StorageValidation.key.validate(payload)
          ),
        });
        break;

      case StorageSetterActions.local:
      case StorageSetterActions.sync:
      case StorageSetterActions.session:
        sendResponse(port, {
          action,
          result: await set(
            action,
            await StorageValidation.item.validate(payload)
          ),
        });
        break;

      case StorageRemoveActions.local:
      case StorageRemoveActions.sync:
      case StorageRemoveActions.session:
        sendResponse(port, {
          action,
          result: await remove(
            action,
            await StorageValidation.key.validate(payload)
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

