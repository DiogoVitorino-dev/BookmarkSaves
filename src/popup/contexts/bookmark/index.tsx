import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MediaType } from "@content/common";
import { Bookmark, Gallery, Item, Media } from "@content/typing";
import { ToolsAPI } from "@api/tools";
import { DateUtils } from "@utils/date";
import { InstagramRepository } from "@repository/instagram";
import { MessageAPI } from "@api/message";
import { UrlUtils } from "@utils/url";
import Loading from "@components/shared/loading";
import { XRepository } from "@repository/x";

export interface BookmarkContext extends Bookmark {
  loaded: boolean;
  downloading: boolean;
  selectedGalleries: Gallery[];
  setBookmark: (newValue: Bookmark) => void;
  download: () => void;
  cleanBookmark: () => Promise<void>;
  toggleItemSelection: (sourceItem: Item["source"]) => Promise<void>;
  toggleGallerySelection: (sourceGallery: Gallery["source"]) => Promise<void>;
}

const initialPreview: Media = {
  height: 0,
  type: MediaType.Unknown,
  url: "",
  width: 0,
};

const Context = createContext<BookmarkContext>({
  name: "",
  domain: "",
  preview: initialPreview,
  gallery: [],
  source: "",

  loaded: false,
  downloading: false,
  selectedGalleries: [],
  download: () => {},
  toggleItemSelection: async () => {},
  toggleGallerySelection: async () => {},
  setBookmark: async () => {},
  cleanBookmark: async () => {},
});

export const useBookmark = () => useContext(Context);

interface ProviderProps {
  children: React.ReactNode;
}

export default function BookmarkProvider({ children }: ProviderProps) {
  const [name, setName] = useState<Bookmark["name"]>("");
  const [domain, setDomain] = useState<Bookmark["domain"]>("");
  const [preview, setPreview] = useState<Bookmark["preview"]>(initialPreview);
  const [gallery, setGallery] = useState<Bookmark["gallery"]>([]);
  const [source, setSource] = useState<Bookmark["source"]>("");
  const [loaded, setLoaded] = useState<BookmarkContext["loaded"]>(false);
  const [downloading, setDownloading] =
    useState<BookmarkContext["downloading"]>(false);

  const url = useRef<string>("");

  const [selectedGalleries, setSelectedGalleries] = useState<Gallery[]>([]);

  const setBookmark: BookmarkContext["setBookmark"] = useCallback((value) => {
    setName(value.name);
    setDomain(value.domain);
    setPreview(value.preview);
    setGallery(value.gallery);
    setSelectedGalleries(value.gallery);
    setSource(value.source);
  }, []);

  const deleteCachedBookmark = useCallback(async () => {
    if (UrlUtils.match(source, "instagram"))
      return InstagramRepository().deleteBookmark(source);
    if (UrlUtils.match(source, "x")) return XRepository().deleteBookmark();
  }, [source]);

  const cleanBookmark = useCallback(async () => {
    await deleteCachedBookmark();
    setName("");
    setDomain("");
    setPreview(initialPreview);
    setGallery([]);
    setSelectedGalleries([]);
    setSource("");
  }, [deleteCachedBookmark]);

  const updateSelectedGalleries = (newGallery: Gallery[]) => {
    setSelectedGalleries(
      newGallery.filter(({ items }) => items.some(({ download }) => download))
    );
  };

  const toggleItemSelection: BookmarkContext["toggleItemSelection"] =
    useCallback(
      (source) =>
        new Promise(() => {
          let found = false;

          const newGallery: Gallery[] = gallery.map((itemGallery) => ({
            ...itemGallery,
            items: itemGallery.items.map((item) => {
              if (item.source === source) {
                item = { ...item, download: !item.download };
                found = true;
              }
              return item;
            }),
          }));

          if (found) {
            setGallery(newGallery);
            updateSelectedGalleries(newGallery);
            cacheBookmark({ domain, gallery, name, preview, source });
          }
        }),
      [domain, gallery, name, preview]
    );

  const toggleGallerySelection: BookmarkContext["toggleGallerySelection"] =
    useCallback(
      (source) =>
        new Promise<void>(() => {
          let found = false;

          const newGallery: Gallery[] = gallery.map((itemGallery) => {
            if (itemGallery.source === source) {
              found = true;
              return {
                ...itemGallery,
                items: itemGallery.items.map((item) => ({
                  ...item,
                  download: !item.download,
                })),
              };
            }
            return { ...itemGallery };
          });

          if (found) {
            setGallery(newGallery);
            updateSelectedGalleries(newGallery);
            cacheBookmark({ domain, gallery, name, preview, source });
          }
        }),
      [domain, gallery, name, preview]
    );

  const cacheBookmark = async (bookmark: Bookmark) => {
    if (UrlUtils.match(bookmark.source, "instagram"))
      return InstagramRepository().saveBookmark(bookmark.source, bookmark);
    if (UrlUtils.match(bookmark.source, "x"))
      return XRepository().saveBookmark(bookmark);
  };

  const getCachedBookmark = useCallback(async () => {
    let saved: Bookmark | null = null;
    if (UrlUtils.match(url.current, "instagram")) {
      saved = await InstagramRepository().getSavedBookmark(url.current);
    } else if (UrlUtils.match(url.current, "x")) {
      saved = await XRepository().getSavedBookmark();
    }

    if (saved) setBookmark(saved);
  }, [setBookmark]);

  const download = useCallback(() => {
    setDownloading(true);

    const urls: string[] = [];
    selectedGalleries.forEach((gallery) => {
      gallery.items.forEach((item) => {
        if (item.download) urls.push(item.media.url);
      });
    });

    ToolsAPI()
      .download({
        urls,
        compress: urls.length > 3,
        compressOptions: { filename: `${name}_${DateUtils.getSafeISO()}` },
      })
      .finally(() => {
        setDownloading(false);
      });
  }, [name, selectedGalleries]);

  const init = useCallback(async () => {
    const tab = await MessageAPI.findCurrentTab();
    if (tab) {
      url.current = tab.url;
      await getCachedBookmark();
    }
  }, [getCachedBookmark]);

  useEffect(() => {
    init().finally(() => setLoaded(true));
  }, [init]);

  const ContextValue = useMemo<BookmarkContext>(
    () => ({
      name,
      domain,
      preview,
      gallery,
      source,
      downloading,
      download,
      toggleGallerySelection,
      toggleItemSelection,
      selectedGalleries,
      loaded,
      setBookmark,
      cleanBookmark,
    }),
    [
      name,
      domain,
      preview,
      gallery,
      source,
      downloading,
      selectedGalleries,
      loaded,
      download,
      toggleGallerySelection,
      toggleItemSelection,
      setBookmark,
      cleanBookmark,
    ]
  );

  return (
    <Context.Provider value={ContextValue}>
      {children}
      {downloading ? <Loading.PulsatingDots /> : null}
    </Context.Provider>
  );
}
