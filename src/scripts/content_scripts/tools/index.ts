import { ValidationError } from "yup";
import { MessageAPI } from "@api/message";
import { DownloadTools, DownloadToolsActions } from "./download";
import { CompressTools, CompressToolsActions } from "./compress";
import { ToolsValidation } from "./validation";
import { Message } from "@api/message/typing";

async function ToolsMiddleware(
  { action, payload }: Partial<Message.Request>,
  port: Port
) {
  try {
    const { sendResponse } = MessageAPI;

    switch (action) {
      case DownloadToolsActions.start:
        sendResponse(port, {
          action,
          result: await DownloadTools.start(
            await ToolsValidation.startDownload.validate(payload)
          ),
        });
        break;

      case CompressToolsActions.generate:
        sendResponse(port, {
          action,
          result: await CompressTools.generate(
            await ToolsValidation.generateCompress.validate(payload)
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
  if (port.name === "tools") {
    port.onMessage.addListener((message) => ToolsMiddleware(message, port));
  }
};

browser.runtime.onConnect.addListener(handleConnect);
