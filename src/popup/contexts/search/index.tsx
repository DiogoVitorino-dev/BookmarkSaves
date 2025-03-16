import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { InstagramAPI } from "@api/instagram";
import { useDebounce } from "@hooks/useDebounce";
import { UrlUtils } from "@utils/url";
import { InstagramRepository } from "@repository/instagram";
import { X_API } from "@api/x";
import { XRepository } from "@repository/x";
import { BrowserAPI } from "@api/browser";
import { ToolsAPI } from "@api/tools";

export type SearchState = "unavailable" | "available" | "searching";

export interface SearchContext {
  state: SearchState;
  loaded: boolean;

  breakpoint: string;
  setBreakpoint: (newBreakpoint: string) => void;

  search: () => Promise<void>;
  cancel: () => void;
}

const Context = createContext<SearchContext>({
  state: "unavailable",
  loaded: false,

  breakpoint: "",
  setBreakpoint: () => {},

  search: async () => {},
  cancel: () => {},
});

export const useSearch = () => useContext(Context);

interface ProviderProps {
  children: React.ReactNode;
}

export default function SearchProvider({ children }: ProviderProps) {
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState<SearchState>("unavailable");
  const [breakpoint, setBreakpoint] = useState("");
  const debounceBreakpoint = useDebounce(breakpoint);

  const url = useRef<string>("");

  const search = useCallback(async () => {
    setState("searching");

    switch (UrlUtils.match(url.current)) {
      case "instagram":
        await InstagramAPI().search(breakpoint);
        break;
      case "x":
        await X_API().search(breakpoint);
        break;
    }

    checkSearchAvailability();
  }, [breakpoint]);

  const cancel = useCallback(async () => {
    setState("unavailable");

    await ToolsAPI().cancelSearch().finally(checkSearchAvailability);
  }, []);

  const handleSetBreakpoint = useCallback((newValue: string) => {
    setBreakpoint(newValue);
  }, []);

  const checkSearchAvailability = () => {
    if (UrlUtils.match(url.current)) setState("available");
    else setState("unavailable");
  };

  const getSavedBreakpoint = async () => {
    switch (UrlUtils.match(url.current)) {
      case "instagram":
        setBreakpoint(await InstagramRepository().getBreakpoint(url.current));
        break;

      case "x":
        setBreakpoint(await XRepository().getBreakpoint());
        break;
    }
  };

  const isSearching = useCallback(async () => {
    if (await ToolsAPI().isSearching()) {
      setState("searching");
      ToolsAPI().waitForSearch().finally(checkSearchAvailability);
    }
  }, []);

  const init = useCallback(async () => {
    const tab = await BrowserAPI().findCurrentTab();

    if (tab) {
      url.current = tab.url;
      checkSearchAvailability();
      await getSavedBreakpoint();
    }
  }, []);

  useEffect(() => {
    init().finally(async () => {
      setLoaded(true);
      await isSearching();
    });
  }, [isSearching, init]);

  useEffect(() => {
    switch (UrlUtils.match(url.current)) {
      case "instagram":
        InstagramRepository().saveBreakpoint(url.current, debounceBreakpoint);
        break;

      case "x":
        XRepository().saveBreakpoint(debounceBreakpoint);
        break;
    }
  }, [debounceBreakpoint]);

  const value = useMemo<SearchContext>(
    () => ({
      state,
      loaded,
      breakpoint,
      setBreakpoint: handleSetBreakpoint,
      search,
      cancel,
    }),
    [state, loaded, breakpoint, handleSetBreakpoint, search, cancel]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
