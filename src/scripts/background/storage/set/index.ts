import type { NativeStorageItem, StorageItem } from "../typing";

export enum StorageSetterActions {
  sync = "storage/set/sync",
  session = "storage/set/session",
  local = "storage/set/local",
}

export async function set(
  action: StorageSetterActions,
  items: StorageItem | StorageItem[]
) {
  items = Array.isArray(items) ? items : [items];

  const nativeStorageItems = items.reduce<NativeStorageItem>(
    (prev, { key, value }) => {
      prev[key] = value;
      return prev;
    },
    {}
  );

  switch (action) {
    case StorageSetterActions.sync:
      await browser.storage.sync.set(nativeStorageItems);
      break;

    case StorageSetterActions.session:
      await browser.storage.session.set(nativeStorageItems);
      break;

    default:
      await browser.storage.local.set(nativeStorageItems);
      break;
  }

  return true;
}
