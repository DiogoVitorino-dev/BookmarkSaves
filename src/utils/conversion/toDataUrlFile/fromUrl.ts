import { generateNameFromUrl } from "../generateName";
import { blobToDataUrl } from "./blobToDataUrl";
import { encodeDataUrlFile } from "./encodeDataUrlFile";

export async function fromUrl(url: string, name = ""): Promise<DataUrlFile> {
  const blob = await fetch(url).then((res) => res.blob());
  
  return encodeDataUrlFile(
    await blobToDataUrl(blob),
    name || generateNameFromUrl(url)
  );
}
