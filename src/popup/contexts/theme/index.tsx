import { ThemeOptions, ThemeRepository } from "@repository/theme";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface ThemeContext {
  theme: ThemeOptions;
  loaded: boolean;
  switchTheme: (theme: ThemeOptions) => void;
}

const Context = createContext<ThemeContext>({
  theme: ThemeOptions.light,
  loaded: false,
  switchTheme: () => {},
});

export const useTheme = () => useContext(Context);

interface ProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ProviderProps) {
  const [theme, setTheme] = useState<ThemeOptions>(ThemeOptions.light);
  const [loaded, setLoaded] = useState(false);
  const repository = ThemeRepository();

  const switchTheme: ThemeContext["switchTheme"] = useCallback(
    (newTheme) => {
      setTheme(newTheme);
      repository.saveTheme(newTheme);
    },
    [repository]
  );

  const getStoredTheme = useCallback(async () => {
    setTheme(await repository.getTheme());
  }, [repository]);

  useEffect(() => {
    getStoredTheme().finally(() => setLoaded(true));
  }, [getStoredTheme]);

  const value = useMemo<ThemeContext>(
    () => ({
      theme,
      loaded,
      switchTheme,
    }),
    [theme, loaded, switchTheme]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
