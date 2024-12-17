import { CompressTools } from "@content/tools/compress";
import type {
  ToolsDataOptions,
  ToolsStartDownloadParams,
} from "@content/tools/validation";

import { save } from "./save";
import { ConversionUtils } from "@utils/conversion";

export async function start({
  urls,
  dataUrlFiles,
  blobFiles,
  compress,
  compressOptions,
}: ToolsStartDownloadParams) {
  let blobs: BlobFile[] = [];

  if (compress) {
    const { generate } = CompressTools;

    const compressed = await generate({
      urls,
      dataUrlFiles,
      blobFiles,
      compressOptions,
    });

    if (compressed) {
      blobs = [compressed];
    }
  } else {
    blobs = await convertingToBlob({ urls, dataUrlFiles, blobFiles });
  }

  save(blobs);
}

async function convertingToBlob({
  dataUrlFiles = [],
  blobFiles = [],
  base64Files = [],
  urls = [],
}: ToolsDataOptions) {
  return Promise.all([
    ...urls.map((url) => ConversionUtils.toBlobFile.fromUrl(url)),
    ...dataUrlFiles.map(({ data, name }) =>
      ConversionUtils.toBlobFile.fromDataUrl(data, name)
    ),
    ...base64Files.map(({ data, name }) =>
      ConversionUtils.toBlobFile.fromBase64(data, name)
    ),
  ]).then((result) => result.concat(blobFiles));
}
