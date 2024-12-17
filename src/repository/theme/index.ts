import { StorageAPI } from "@api/storage";

export enum ThemeOptions {
  light = "light",
  dark = "dark",
}

enum StorageKeys {
  theme = "THEME_REPOSITORY-THEME",
}

export function ThemeRepository() {
  const getTheme = async () => {
    const { get, disconnect } = StorageAPI("local");
    let saved = await get<ThemeOptions>(StorageKeys.theme);

    if (!saved) {
      saved = ThemeOptions.light;
    }

    disconnect();
    return saved;
  };

  const saveTheme = async (newValue: ThemeOptions) => {
    const { disconnect, set } = StorageAPI("local");
    await set(StorageKeys.theme, newValue);
    disconnect();
  };

  return {
    getTheme,
    saveTheme,
  };
}
