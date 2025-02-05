import { StorageAPI } from "@api/storage";
import { ConversionUtils } from "@utils/conversion";

export function CollectionRepository() {
  const get = async (source: string): Promise<Collection | null> => {
    const storage = StorageAPI("local");
    const { toBlobFile, toBase64File } = ConversionUtils;

    const saved = await storage.get<Media<DataUrlFile>[]>(
      toBase64File.fromString(source)
    );

    if (saved && saved.length) {
      return {
        source,
        medias: saved.map(({ file, ...item }) => ({
          ...item,
          file: toBlobFile.fromDataUrl(file.data, file.name),
        })),
      };
    }

    storage.disconnect();
    return null;
  };

  const save = async ({ medias, source }: Collection) => {
    if (!source || !medias.length) return;
    const { set, disconnect } = StorageAPI("local");
    const { toDataUrlFile, toBase64File } = ConversionUtils;

    const storageFiles: Media<DataUrlFile>[] = [];

    for await (const { file, ...media } of medias) {
      storageFiles.push({
        ...media,
        file: await toDataUrlFile.fromBlob(file.data, file.name),
      });
    }

    await set(toBase64File.fromString(source), storageFiles);

    disconnect();
  };

  const remove = async (source: string) => {
    const storage = StorageAPI("local");
    await storage.remove(ConversionUtils.toBase64File.fromString(source));
    storage.disconnect();
  };

  return {
    get,
    save,
    remove,
  };
}
