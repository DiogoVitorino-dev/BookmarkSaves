import { blobToDataUrl } from "./blobToDataUrl";
import { encodeDataUrlFile } from "./encodeDataUrlFile";

export async function fromBlob(data: Blob, name = ""): Promise<DataUrlFile> {
  return encodeDataUrlFile(await blobToDataUrl(data), name);
}
