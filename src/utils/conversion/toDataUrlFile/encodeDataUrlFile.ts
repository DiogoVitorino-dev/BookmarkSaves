import { generateName } from "../generateName";

export function encodeDataUrlFile(data: string,type: string, name = ""): DataUrlFile {
  return {
    name: name || generateName(),
    type,
    data,
  };
}
