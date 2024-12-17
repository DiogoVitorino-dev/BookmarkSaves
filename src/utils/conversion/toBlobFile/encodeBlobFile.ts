import { generateName } from "../generateName";

export function encodeBlobFile(data: Blob, name = ""): BlobFile {
  return { name: name || generateName(), data };
}
