import { generateName } from "../generateName";

export function encodeBase64File(
  data: string,
  type: string,
  name = ""
): Base64File {
  return {
    name: name || generateName(),
    type,
    data,
  };
}
