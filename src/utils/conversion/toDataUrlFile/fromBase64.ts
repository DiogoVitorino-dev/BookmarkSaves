import { encodeDataUrlFile } from "./encodeDataUrlFile";

export function fromBase64(
  data: string,
  mimeType = "application/octet-stream",
  name = ""
): DataUrlFile {
  return encodeDataUrlFile(`data:${mimeType};base64,${data}`, name);
}
