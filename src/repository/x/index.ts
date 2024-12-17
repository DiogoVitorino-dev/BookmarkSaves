import { StorageAPI } from "@api/storage";
import { Bookmark } from "@content/typing";

enum StorageKeys {
  bookmark = "X_REPOSITORY-BOOKMARK",
  breakpoint = "X_REPOSITORY-BREAKPOINT",
}

export function XRepository() {
  const getSavedBookmark = async () => {
    const { get, disconnect } = StorageAPI("local");
    const saved = await get<Bookmark>(StorageKeys.bookmark);
    disconnect();
    return saved;
  };

  const saveBookmark = async (value: Bookmark) => {
    if (!value.source) return;
    const { set, disconnect } = StorageAPI("local");
    await set(StorageKeys.bookmark, value);
    disconnect();
  };

  const deleteBookmark = async () => {
    const { remove, disconnect } = StorageAPI("local");
    await remove(StorageKeys.bookmark);
    disconnect();
  };

  const getBreakpoint = async () => {
    const { get, disconnect } = StorageAPI("local");
    const saved = await get<string>(StorageKeys.breakpoint);
    disconnect();
    return saved || "";
  };

  const saveBreakpoint = async (value: string) => {
    if (!value) return;
    const { set, disconnect } = StorageAPI("local");
    await set(StorageKeys.breakpoint, value);
    disconnect();
  };

  return {
    saveBookmark,
    getSavedBookmark,
    deleteBookmark,

    getBreakpoint,
    saveBreakpoint,
  };
}
