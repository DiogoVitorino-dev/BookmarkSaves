import { encodeDataUrlFile } from "./encodeDataUrlFile";

export function fromString(value: string, name = ""): DataUrlFile {
  return encodeDataUrlFile(btoa(value), name);
}
