import {
  StorageValue,
  StorageKey,
  StorageItem,
} from "@background/storage/typing";
import { StorageContext } from "./typing";
import { MessageAPI } from "@api/message";
import { StorageGetterActions } from "@background/storage/get";
import { StorageSetterActions } from "@background/storage/set";
import { StorageRemoveActions } from "@background/storage/remove";

export const StorageAPI = (context: StorageContext) => {
  const { connect, sendRequest } = MessageAPI;

  const connection = connect({ to: "background", name: "storage" });

  async function get<T = StorageValue>(key: StorageKey) {
    const action = StorageGetterActions[context];

    const { result } = await sendRequest<string, StorageItem<T>[]>(connection, {
      action,
      payload: key,
    });

    if (result.length > 0) return result[0].value;

    return null;
  }

  async function set(key: StorageKey, value: StorageValue) {
    const action = StorageSetterActions[context];

    await sendRequest<StorageItem<typeof value>>(connection, {
      action,
      payload: { key, value },
    });
  }

  async function remove(key: StorageKey) {
    const action = StorageRemoveActions[context];

    await sendRequest<string>(connection, {
      action,
      payload: key,
    });
  }

  function disconnect() {
    MessageAPI.disconnect(connection);
  }

  return {
    get,
    set,
    remove,
    disconnect,
  };
};
