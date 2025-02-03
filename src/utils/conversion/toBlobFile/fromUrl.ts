import { generateNameFromUrl } from "../generateName";
import { typeExtract } from "../typeExtract";
import { encodeBlobFile } from "./encodeBlobFile";

export async function fromUrl(
  url: string,
  name: string = ""
): Promise<BlobFile> {
  const blob = await fetch(url).then((res) => res.blob());
  return encodeBlobFile(
    blob,
    typeExtract.fromBlob(blob),
    name || generateNameFromUrl(url)
  );
}
