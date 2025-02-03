import { typeExtract } from "../typeExtract";
import { dataUrlToBase64 } from "./dataUrlToBase64";
import { encodeBase64File } from "./encodeBase64File";

export function fromDataUrl(data: string, name = ""): Base64File {
  return encodeBase64File(
    dataUrlToBase64(data),
    typeExtract.fromDataUrl(data),
    name
  );
}
