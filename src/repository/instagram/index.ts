import { StorageAPI } from "@api/storage";
import { InstagramApiResponse } from "@content/instagram/service/response";
import { Bookmark } from "@content/typing";

enum StorageKeys {
  bookmark = "INSTAGRAM_REPOSITORY-BOOKMARK_",
  breakpoint = "INSTAGRAM_REPOSITORY-BREAKPOINT_",
  mediaId = "INSTAGRAM_REPOSITORY-MEDIA_ID_",
  response = "INSTAGRAM_REPOSITORY-RESPONSE_",
}

export function InstagramRepository() {
  const getSavedBookmark = async (url: string) => {
    if (!url) return null;
    const { get, disconnect } = StorageAPI("local");
    const saved = await get<Bookmark>(StorageKeys.bookmark + url);
    disconnect();
    return saved;
  };

  const saveBookmark = async (url: string, value: Bookmark) => {
    if (!url || !value.source) return;
    const { set, disconnect } = StorageAPI("local");
    await set(StorageKeys.bookmark + url, value);
    disconnect();
  };

  const deleteBookmark = async (url: string) => {
    if (!url) return;
    const { remove, disconnect } = StorageAPI("local");
    await remove(StorageKeys.bookmark + url);
    disconnect();
  };

  const getBreakpoint = async (url: string) => {
    if (!url) return "";
    const { get, disconnect } = StorageAPI("local");
    const saved = await get<string>(StorageKeys.breakpoint + url);
    disconnect();
    return saved || "";
  };

  const saveBreakpoint = async (url: string, value: string) => {
    if (!url || !value) return;
    const { set, disconnect } = StorageAPI("local");
    await set(StorageKeys.breakpoint + url, value);
    disconnect();
  };

  const getCachedMediaId = async (postId: string) => {
    if (!postId) return "";
    const { get, disconnect } = StorageAPI("session");
    const saved = await get<string>(StorageKeys.mediaId + postId);
    disconnect();
    return saved || "";
  };

  const cacheMediaId = async (postId: string, value: string) => {
    if (!postId || !value) return;
    const { set, disconnect } = StorageAPI("session");
    await set(StorageKeys.mediaId + postId, value);
    disconnect();
  };

  const getCachedResponse = async (mediaId: string) => {
    if (!mediaId) return null;
    const { get, disconnect } = StorageAPI("session");
    const saved = await get<InstagramApiResponse.root>(
      StorageKeys.response + mediaId
    );
    disconnect();
    return saved;
  };

  const cacheResponse = async (
    mediaId: string,
    value: InstagramApiResponse.root
  ) => {
    if (!mediaId || !value) return;
    const { set, disconnect } = StorageAPI("session");
    await set(StorageKeys.response + mediaId, value);
    disconnect();
  };

  return {
    saveBookmark,
    getSavedBookmark,
    deleteBookmark,

    getBreakpoint,
    saveBreakpoint,

    getCachedMediaId,
    cacheMediaId,

    getCachedResponse,
    cacheResponse,
  };
}
