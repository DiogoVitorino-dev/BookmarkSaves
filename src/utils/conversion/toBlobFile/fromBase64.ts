import { base64ToBlob } from "./base64ToBlob";
import { encodeBlobFile } from "./encodeBlobFile";

export function fromBase64(data: string, type: string, name = ""): BlobFile {
  return encodeBlobFile(base64ToBlob(data, type), type, name);
}
