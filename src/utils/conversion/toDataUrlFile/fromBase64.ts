import { typeExtract } from "../typeExtract";
import { encodeDataUrlFile } from "./encodeDataUrlFile";

export function fromBase64(
  data: string,
  mimeType: string,
  name = ""
): DataUrlFile {
  return encodeDataUrlFile(
    `data:${mimeType};base64,${data}`,
    typeExtract.fromBlob(mimeType),
    name
  );
}
