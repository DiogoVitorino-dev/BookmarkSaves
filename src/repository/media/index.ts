import { StorageAPI } from "@api/storage";
import { Media } from "@content/typing";
import { ConversionUtils } from "@utils/conversion";

export function MediaRepository() {
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

  const saveMedia = async (url: string, value: Media) => {
    if (!value.file.data) return;
    const { set, disconnect } = StorageAPI("local");
    const { toDataUrlFile, toBase64File } = ConversionUtils;

    const storageFile = await toDataUrlFile.fromBlob(
      value.file.data,
      value.file.name
    );

    await set(toBase64File.fromString(url), {
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

  return {
    saveMedia,
    getSavedMedia,
    deleteMedia,
  };
}
