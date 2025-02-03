import { dataUrlToBase64 } from "../toBase64File/dataUrlToBase64";
import { typeExtract } from "../typeExtract";
import { base64ToBlob } from "./base64ToBlob";

import { encodeBlobFile } from "./encodeBlobFile";

//Ref "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...";

export function fromDataUrl(data: string, name = ""): BlobFile {
  const type = typeExtract.fromDataUrl(data);
  data = dataUrlToBase64(data);

  return encodeBlobFile(base64ToBlob(data, type), type, name);
}
