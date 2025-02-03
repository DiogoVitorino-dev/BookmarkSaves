import { StorageAPI } from "@api/storage";
import { Media } from "@content/typing";
import { ConversionUtils } from "@utils/conversion";

enum StorageKeys {
  breakpoint = "X_REPOSITORY-BREAKPOINT",
}

export function XRepository() {
  const getSavedMedia = async (url: string): Promise<Media | null> => {
    const { get, disconnect } = StorageAPI("local");
    const { toBlobFile, toBase64File } = ConversionUtils;

    const saved = await get<Media<DataUrlFile>>(toBase64File.fromString(url));

    if (saved) {
      return {
        ...saved,
        file: toBlobFile.fromDataUrl(saved.file.data, saved.file.name),
      };
    }

    disconnect();
    return null;
  };

  const saveMedia = async (value: Media) => {
    if (!value.file.data) return;
    const { set, disconnect } = StorageAPI("local");
    const { toDataUrlFile, toBase64File } = ConversionUtils;

    const storageFile = await toDataUrlFile.fromBlob(
      value.file.data,
      value.file.name
    );

    await set(toBase64File.fromString(value.url), {
      ...value,
      file: storageFile,
    } as Media<DataUrlFile>);

    disconnect();
  };

  const deleteMedia = async (url: string) => {
    const { remove, disconnect } = StorageAPI("local");
    await remove(ConversionUtils.toBase64File.fromString(url));
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
    saveMedia,
    getSavedMedia,
    deleteMedia,

    getBreakpoint,
    saveBreakpoint,
  };
}
