import { BrowserMiddleware } from "./browser";
import { PrepareHelper } from "./helper";
import { StorageMiddleware } from "./storage";

async function handleConnect(port: Port) {
  switch (port.name) {
    case "storage":
      port.onMessage.addListener((message) => StorageMiddleware(message, port));
      break;

    case "browser":
      port.onMessage.addListener((message) => BrowserMiddleware(message, port));
      break;

    case "helper/video": {
      PrepareHelper(port);
      break;
    }
  }
}

browser.runtime.onConnect.addListener(handleConnect);
