import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useBookmark } from "@contexts/bookmark";
import { InstagramAPI } from "@api/instagram";
import { MessageAPI } from "@api/message";
import { useDebounce } from "@hooks/useDebounce";
import { UrlUtils } from "@utils/url";
import { InstagramRepository } from "@repository/instagram";
import { X_API } from "@api/x";
import { XRepository } from "@repository/x";

export interface SearchContext {
  available: boolean;
  loaded: boolean;

  breakpoint: string;
  setBreakpoint: (newBreakpoint: string) => void;

  searching: boolean;
  search: () => Promise<void>;
  cancel: () => void;
}

const Context = createContext<SearchContext>({
  available: false,
  loaded: false,

  breakpoint: "",
  setBreakpoint: () => {},

  searching: false,
  search: async () => {},
  cancel: () => {},
});

export const useSearch = () => useContext(Context);

interface ProviderProps {
  children: React.ReactNode;
}

export default function SearchProvider({ children }: ProviderProps) {
  const [loaded, setLoaded] = useState(false);
  const [searching, setSearching] = useState(false);
  const [breakpoint, setBreakpoint] = useState("");
  const [available, setAvailable] = useState(false);
  const debounceBreakpoint = useDebounce(breakpoint);

  const { setBookmark } = useBookmark();

  const url = useRef<string>("");

  const search = useCallback(async () => {
    setSearching(true);

    let bookmark = null;

    if (UrlUtils.match(url.current, "instagram")) {
      bookmark = await InstagramAPI().search(breakpoint);
    } else if (UrlUtils.match(url.current, "x")) {
      bookmark = await X_API().search(breakpoint);
    }

    if (bookmark) setBookmark(bookmark);

    setSearching(false);
  }, [breakpoint, setBookmark]);

  const cancel = useCallback(() => {
    if (searching) setSearching(false);

    if (UrlUtils.match(url.current, "instagram")) {
      InstagramAPI().cancel();
    } else if (UrlUtils.match(url.current, "x")) {
      X_API().cancel();
    }
  }, [searching]);

  const handleSetBreakpoint = useCallback((newValue: string) => {
    setBreakpoint(newValue);
  }, []);

  const checkSearchAvailability = () => {
    if (
      UrlUtils.match(url.current, "instagram") ||
      UrlUtils.match(url.current, "x")
    ) {
      setAvailable(true);
    }
  };

  const getSavedBreakpoint = async () => {
    if (UrlUtils.match(url.current, "instagram")) {
      setBreakpoint(await InstagramRepository().getBreakpoint(url.current));
    } else if (UrlUtils.match(url.current, "x")) {
      setBreakpoint(await XRepository().getBreakpoint());
    }
  };

  const isSearching = useCallback(async () => {
    let bookmark = null;

    if (UrlUtils.match(url.current, "instagram")) {
      const isRunning = await InstagramAPI().isSearchRunning();
      if (isRunning) {
        setSearching(true);
        bookmark = await InstagramAPI().waitForSearchResult();
      }
    } else if (UrlUtils.match(url.current, "x")) {
      const isRunning = await X_API().isSearchRunning();
      if (isRunning) {
        setSearching(true);
        bookmark = await X_API().waitForSearchResult();
      }
    }

    if (bookmark) await setBookmark(bookmark);
  }, [setBookmark]);

  const init = useCallback(async () => {
    const tab = await MessageAPI.findCurrentTab();

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
    if (UrlUtils.match(url.current, "instagram")) {
      InstagramRepository().saveBreakpoint(url.current, debounceBreakpoint);
    } else if (UrlUtils.match(url.current, "x")) {
      XRepository().saveBreakpoint(debounceBreakpoint);
    }
  }, [debounceBreakpoint]);

  const value = useMemo<SearchContext>(
    () => ({
      searching,
      available,
      loaded,
      breakpoint,
      setBreakpoint: handleSetBreakpoint,
      search,
      cancel,
    }),
    [
      searching,
      loaded,
      available,
      breakpoint,
      handleSetBreakpoint,
      search,
      cancel,
    ]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
