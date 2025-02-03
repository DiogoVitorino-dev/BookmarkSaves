import { generateNameFromUrl } from "../generateName";
import { blobToDataUrl } from "../toDataUrlFile/blobToDataUrl";
import { typeExtract } from "../typeExtract";
import { dataUrlToBase64 } from "./dataUrlToBase64";
import { encodeBase64File } from "./encodeBase64File";

export async function fromUrl(url: string, name = ""): Promise<Base64File> {
  const blob = await fetch(url).then((res) => res.blob());
  return encodeBase64File(
    dataUrlToBase64(await blobToDataUrl(blob)),
    typeExtract.fromBlob(blob),
    name || generateNameFromUrl(url)
  );
}
