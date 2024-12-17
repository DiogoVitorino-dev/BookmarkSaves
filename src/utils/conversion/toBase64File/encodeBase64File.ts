import { generateName } from "../generateName";

export function encodeBase64File(data: string, name = ""): Base64File {
  return {
    name: name || generateName(),
    data,
  };
}
