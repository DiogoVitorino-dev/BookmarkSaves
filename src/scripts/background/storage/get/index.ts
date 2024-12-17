import type { NativeStorageItem, StorageItem, StorageKey } from "../typing";

export enum StorageGetterActions {
  local = "storage/get/local",
  sync = "storage/get/sync",
  session = "storage/get/session",
}

export async function get(
  action: StorageGetterActions,
  key: StorageKey | StorageKey[]
) {
  let items: NativeStorageItem;

  switch (action) {
    case StorageGetterActions.sync:
      items = await browser.storage.sync.get(key);
      break;

    case StorageGetterActions.session:
      items = await browser.storage.session.get(key);
      break;

    default:
      items = await browser.storage.local.get(key);
      break;
  }

  const storageItems = Object.entries(items).map<StorageItem>(
    ([key, value]) => ({ key, value })
  );

  return storageItems;
}
