import { generateName } from "../generateName";

export function encodeBlobFile(data: Blob, type: string, name = ""): BlobFile {
  return { name: name || generateName(), type, data };
}
