import { dataUrlToBase64 } from "../toBase64File/dataUrlToBase64";
import { base64ToBlob } from "./base64ToBlob";

import { encodeBlobFile } from "./encodeBlobFile";

//Ref "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...";

export function fromDataUrl(data: string, name = ""): BlobFile {  
  data = dataUrlToBase64(data)
  const type = data[0].slice(data[0].indexOf(":") + 1, data[0].indexOf(";"));

  return encodeBlobFile(base64ToBlob(data, type), name);
}
