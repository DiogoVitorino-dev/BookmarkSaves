import { blobToDataUrl } from "../toDataUrlFile/blobToDataUrl";
import { typeExtract } from "../typeExtract";
import { dataUrlToBase64 } from "./dataUrlToBase64";
import { encodeBase64File } from "./encodeBase64File";

export async function fromBlob(data: Blob, name = ""): Promise<Base64File> {
  return encodeBase64File(
    dataUrlToBase64(await blobToDataUrl(data)),
    typeExtract.fromBlob(data),
    name
  );
}
