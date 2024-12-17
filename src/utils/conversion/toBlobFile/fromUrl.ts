import { generateNameFromUrl } from "../generateName";
import { encodeBlobFile } from "./encodeBlobFile";

export async function fromUrl(
  url: string,
  name: string = ""
): Promise<BlobFile> {
  const blob = await fetch(url).then((res) => res.blob());
  return encodeBlobFile(blob, name || generateNameFromUrl(url));
}
