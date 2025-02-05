import { StorageAPI } from "@api/storage";

enum StorageKeys {
  breakpoint = "X_REPOSITORY-BREAKPOINT",
}

export function XRepository() {
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
    getBreakpoint,
    saveBreakpoint,
  };
}
