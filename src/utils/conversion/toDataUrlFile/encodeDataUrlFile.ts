import { generateName } from "../generateName";

export function encodeDataUrlFile(data: string, name = ""): DataUrlFile {
  return {
    name: name || generateName(),
    data,
  };
}
