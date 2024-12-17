import type { StorageKey } from "../typing";

export enum StorageRemoveActions {
  sync = "storage/remove/sync",
  session = "storage/remove/session",
  local = "storage/remove/local",
}

export async function remove(
  action: StorageRemoveActions,
  key: StorageKey | StorageKey[]
) {

  switch (action) {
    case StorageRemoveActions.sync:
      await browser.storage.sync.remove(key);
      break;

    case StorageRemoveActions.session:
      await browser.storage.session.remove(key);
      break;

    default:
      await browser.storage.local.remove(key);
      break;
  }

  return true;
}
